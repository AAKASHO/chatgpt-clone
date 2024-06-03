import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request) {
  const url = new URL(request.url);
  const { searchParams, origin } = url;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    // Exchange the authorization code for a session
    const { error: authError, data: authData } = await supabase.auth.exchangeCodeForSession(code);
    if (authError) {
      console.error('Error exchanging code for session:', authError.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const user = authData.user;

    // Check if the user exists in the `users` table
    const { data: existingUser, error: userCheckError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userCheckError && userCheckError.code !== 'PGRST116') { // Code 'PGRST116' means no rows found
      console.error('Error checking user existence:', userCheckError.message);
      return NextResponse.redirect(`${origin}/error`);
    }

    // If the user does not exist, insert them into the `users` table
    if (!existingUser) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: user.id,
          email: user.email,
        },
      ]);

      if (insertError) {
        console.error('Error inserting new user:', insertError.message);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }
    }

    // Redirect to the next URL
    return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
