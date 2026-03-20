import { NextResponse } from 'next/server'

export async function GET() {
  const url = `https://www.linkedin.com/oauth/v2/authorization` +
    `?response_type=code` +
    `&client_id=${process.env.LINKEDIN_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI!)}` +
    `&scope=r_liteprofile%20r_emailaddress` +
    `&state=linkedin_state`;

  return NextResponse.redirect(url);
}
