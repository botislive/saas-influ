import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { saveAccount } from '@/lib/accounts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  const tokenRes = await fetch(
    `https://graph.facebook.com/v19.0/oauth/access_token` +
    `?client_id=${process.env.META_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.META_REDIRECT_URI!)}` +
    `&client_secret=${process.env.META_CLIENT_SECRET}` +
    `&code=${code}`
  );

  const data = await tokenRes.json();

  if (data.error) {
    return NextResponse.json(data, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  await saveAccount(supabase, user.id, "meta", data);

  return NextResponse.redirect(new URL('/connect-accounts', request.url))
}
