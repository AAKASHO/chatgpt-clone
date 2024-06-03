import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  console.log(token_hash);
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = new URL(request.nextUrl)
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    // const currentDate = new Date().toISOString();
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  console.log("error");
  console.log(error);
  // redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
