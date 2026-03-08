import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Meta OAuth Flow - Step 1: Initiate OAuth
 * Redirects user to Meta/Facebook authorization page
 */
export async function GET() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }

  // Generate OAuth state parameter for CSRF protection
  const state = crypto.randomUUID()
  
  // Store state in Supabase for validation on callback
  const { error: stateError } = await supabase
    .from('oauth_states')
    .insert({
      user_id: user.id,
      provider: 'meta',
      state,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min
    })

  if (stateError) {
    console.error('Failed to store OAuth state:', stateError)
    return NextResponse.json(
      { error: 'Failed to initiate OAuth' },
      { status: 500 }
    )
  }

  // Build Meta OAuth URL
  const metaOAuthUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth')
  metaOAuthUrl.searchParams.set('client_id', process.env.META_APP_ID!)
  metaOAuthUrl.searchParams.set('redirect_uri', process.env.META_REDIRECT_URI!)
  metaOAuthUrl.searchParams.set('state', state)
  metaOAuthUrl.searchParams.set('scope', [
    'pages_manage_posts',
    'pages_read_engagement',
    'pages_read_user_content',
    'instagram_basic',
    'instagram_content_publish',
  ].join(','))
  metaOAuthUrl.searchParams.set('response_type', 'code')

  return NextResponse.redirect(metaOAuthUrl)
}
