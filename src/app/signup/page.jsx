"use client"
import { useEffect, useState } from 'react';
import { signInWithGoogle, signup } from './actions.js'

import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function SignUpPage() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }


  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const baseUrl = window.location.origin; // Get the base URL dynamically
    console.log("googlelog");
    console.log("google");
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${baseUrl}/auth/v1/callback`, // Use the dynamic base URL
        },
    });

    if (error) {
        console.error('Error during Google login:', error.message);
    }
};

  const handleEmailSignup = (event) => {
    // event.preventDefault();
    // alert("Please check your email")
    console.log("evenr");
    console.log(event);
    signup(event);
    window.location.href="/email"
    // Handle email login logic here
  };

  return (

<div className="login-container">
  <Image
            src="/chatgptlogo.png"
            alt="Landscape picture"
            width={57}
            height={60}
          />
  {/* <img src="./chatgptlogo.png" alt="" /> */}
      <div className="login-box">
        <h1>Welcome back</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button" formAction={signup}>signup with Email</button>
        </form>
        <div>
          <br />
        Already have an account? <a href="/login" className='text-green-700'>login</a>
        </div>
        <div className="divider">
          <span>or</span>
        </div>

        {/* <form > */}
        <button className="google-login-button" onClick={handleGoogleLogin}>
        {/* <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" /> */}
        <Image
          src="/googlelogo.gif"
          alt="Landscape picture"
          width={20}
          height={20}
        />
          {/* <img src="./googlelogo.gif" alt="Google Logo" /> */}
        sign up with Google
        </button>
        {/* </form> */}
      </div>
    </div>

      // <label htmlFor="email">Email:</label>
      // <input id="email" name="email" type="email" required />
      // <label htmlFor="password">Password:</label>
      // <input id="password" name="password" type="password" required />
      // <button formAction={login}>Log in</button>
      // <button formAction={signup}>Sign up</button>
    
  )
}