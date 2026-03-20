import { NextResponse } from 'next/server'

export async function GET() {
  const url = `https://www.facebook.com/v19.0/dialog/oauth` +
    `?client_id=${process.env.META_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.META_REDIRECT_URI!)}` +
    `&scope=pages_show_list,instagram_basic` +
    `&state=meta_state`;

  return NextResponse.redirect(url);
}
