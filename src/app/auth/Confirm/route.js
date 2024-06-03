import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  const redirectTo = new URL(request.nextUrl)
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    // Verify the OTP
    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      const user = data.user
      
      // Check if the user exists in the `users` table
      const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (userCheckError && userCheckError.code !== 'PGRST116') { // 'PGRST116' means no rows found
        console.error('Error checking user existence:', userCheckError.message)
        redirectTo.pathname = '/error'
        return NextResponse.redirect(redirectTo)
      }

      // If the user does not exist, insert them into the `users` table
      if (!existingUser) {
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: user.id,
            email: user.email,
          },
        ])

        if (insertError) {
          console.error('Error inserting new user:', insertError.message)
          redirectTo.pathname = '/error'
          return NextResponse.redirect(redirectTo)
        }
      }

      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }

    console.error('Error verifying OTP:', error.message)
  }

  // Redirect to an error page if OTP verification fails
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
