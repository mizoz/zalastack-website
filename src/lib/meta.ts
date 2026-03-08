import { createClient } from '@/lib/supabase/server'

export interface MetaAccount {
  id: string
  provider_account_id: string
  access_token: string
  account_name: string
  account_email: string | null
  account_picture: string | null
  expires_at: string
}

/**
 * Get user's connected Meta account
 */
export async function getMetaAccount(userId: string): Promise<MetaAccount | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('user_id', userId)
    .eq('provider', 'meta')
    .single()

  if (error || !data) {
    return null
  }

  return data as MetaAccount
}

/**
 * Check if Meta token is expired or expiring soon
 */
export function isTokenExpiring(expiresAt: string, thresholdDays: number = 7): boolean {
  const expiryDate = new Date(expiresAt)
  const thresholdDate = new Date(Date.now() + thresholdDays * 24 * 60 * 60 * 1000)
  return expiryDate <= thresholdDate
}

/**
 * Refresh Meta long-lived token
 * Meta tokens last 60 days, should be refreshed before expiry
 */
export async function refreshMetaToken(account: MetaAccount): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: process.env.META_APP_ID!,
      client_secret: process.env.META_APP_SECRET!,
      fb_exchange_token: account.access_token,
    })

    const response = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?${params}`
    )
    const data = await response.json()

    if (!data.access_token) {
      console.error('Failed to refresh Meta token:', data)
      return null
    }

    // Update token in database
    const supabase = await createClient()
    const { error } = await supabase
      .from('connected_accounts')
      .update({
        access_token: data.access_token,
        expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .eq('provider_account_id', account.provider_account_id)

    if (error) {
      console.error('Failed to update refreshed token:', error)
      return null
    }

    return data.access_token
  } catch (error) {
    console.error('Error refreshing Meta token:', error)
    return null
  }
}

/**
 * Make authenticated request to Meta Graph API
 */
export async function metaApiCall(
  endpoint: string,
  accessToken: string,
  params: Record<string, string> = {}
): Promise<any> {
  const url = new URL(`https://graph.facebook.com/v18.0/${endpoint}`)
  url.searchParams.set('access_token', accessToken)
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url.toString())
  const data = await response.json()

  if (data.error) {
    console.error('Meta API error:', data.error)
    throw new Error(`Meta API: ${data.error.message}`)
  }

  return data
}

/**
 * Get user's Meta pages
 */
export async function getMetaPages(accessToken: string) {
  return metaApiCall('me/accounts', accessToken)
}

/**
 * Get Instagram accounts connected to Meta
 */
export async function getInstagramAccounts(accessToken: string, pageId: string) {
  return metaApiCall(`${pageId}/instagram_business_accounts`, accessToken)
}

/**
 * Publish content to Instagram
 */
export async function publishToInstagram(
  accessToken: string,
  igUserId: string,
  mediaUrl: string,
  caption: string,
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL' = 'IMAGE'
) {
  // Step 1: Create media container
  const containerParams = {
    image_url: mediaType === 'IMAGE' ? mediaUrl : undefined,
    video_url: mediaType === 'VIDEO' ? mediaUrl : undefined,
    caption,
    media_type: mediaType,
  }

  const containerResponse = await metaApiCall(
    `${igUserId}/media`,
    accessToken,
    Object.fromEntries(Object.entries(containerParams).filter(([_, v]) => v !== undefined))
  )

  // Step 2: Publish the container
  const publishResponse = await metaApiCall(
    `${igUserId}/media_publish`,
    accessToken,
    { creation_id: containerResponse.id }
  )

  return publishResponse
}
