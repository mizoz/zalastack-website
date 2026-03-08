import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const code = cookieStore.get('auth_code')?.value
  const state = cookieStore.get('auth_state')?.value

  if (!code || !state) {
    return new Response('Missing auth code or state', { status: 400 })
  }

  return new Response('Meta callback received', { status: 200 })
}
