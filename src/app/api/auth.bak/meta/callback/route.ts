import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Meta OAuth Flow - Step 2: Handle Callback
 * Exchanges authorization code for access token
 */
export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth errors
  if (error) {
    console.error('Meta OAuth error:', error)
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=oauth_denied', request.url)
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=invalid_callback', request.url)
    )
  }

  // Verify state parameter
  const { data: stateData, error: stateError } = await supabase
    .from('oauth_states')
    .select('user_id')
    .eq('state', state)
    .eq('provider', 'meta')
    .gt('expires_at', new Date().toISOString())
    .single()

  if (stateError || !stateData) {
    console.error('Invalid or expired OAuth state')
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=invalid_state', request.url)
    )
  }

  // Exchange code for token
  const tokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token'
  const tokenParams = new URLSearchParams({
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    redirect_uri: process.env.META_REDIRECT_URI!,
    code,
  })

  const tokenResponse = await fetch(`${tokenUrl}?${tokenParams}`)
  const tokenData = await tokenResponse.json()

  if (!tokenData.access_token) {
    console.error('Failed to get access token:', tokenData)
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=token_exchange_failed', request.url)
    )
  }

  // Get long-lived token
  const longLivedTokenUrl = 'https://graph.facebook.com/v18.0/oauth/access_token'
  const longLivedParams = new URLSearchParams({
    grant_type: 'fb_exchange_token',
    client_id: process.env.META_APP_ID!,
    client_secret: process.env.META_APP_SECRET!,
    fb_exchange_token: tokenData.access_token,
  })

  const longLivedResponse = await fetch(`${longLivedTokenUrl}?${longLivedParams}`)
  const longLivedData = await longLivedResponse.json()

  if (!longLivedData.access_token) {
    console.error('Failed to get long-lived token:', longLivedData)
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=long_lived_token_failed', request.url)
    )
  }

  // Get user info from Meta
  const userInfoUrl = 'https://graph.facebook.com/v18.0/me'
  const userInfoParams = new URLSearchParams({
    fields: 'id,name,email,picture',
    access_token: longLivedData.access_token,
  })

  const userInfoResponse = await fetch(`${userInfoUrl}?${userInfoParams}`)
  const userInfo = await userInfoResponse.json()

  // Store connected account in Supabase
  const { error: insertError } = await supabase
    .from('connected_accounts')
    .upsert({
      user_id: stateData.user_id,
      provider: 'meta',
      provider_account_id: userInfo.id,
      access_token: longLivedData.access_token,
      token_type: 'Bearer',
      expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
      scope: tokenData.scope,
      account_name: userInfo.name,
      account_email: userInfo.email,
      account_picture: userInfo.picture?.data?.url,
    }, {
      onConflict: 'user_id,provider',
    })

  if (insertError) {
    console.error('Failed to store connected account:', insertError)
    return NextResponse.redirect(
      new URL('/dashboard/settings?error=storage_failed', request.url)
    )
  }

  // Clean up OAuth state
  await supabase
    .from('oauth_states')
    .delete()
    .eq('state', state)

  // Redirect to dashboard with success
  return NextResponse.redirect(
    new URL('/dashboard/settings?success=meta_connected', request.url)
  )
}
