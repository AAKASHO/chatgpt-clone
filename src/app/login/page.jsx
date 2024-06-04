"use client"
import { useEffect, useState } from 'react';
import { login, signup } from './actions'
import { createClient } from '@/utils/supabase/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {

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

  const handleEmailLogin = (event) => {
    event.preventDefault();
    // Handle email login logic here
  };

  return (

<div className='flex justify-center items-center bg-white font-sans h-screen w-screen m-0'>
<div className="login-container">
  <img src="./chatgptlogo.png" alt="" />
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
          <button type="submit" className="login-button" formAction={login}>Login with Email</button>
        </form>
        <div>
          <br />
        Dont have an account? <a href="/signup" className='text-green-700'>signup</a>
        </div>
        <div className="divider">
          <span>or</span>
        </div>
        <button className="google-login-button" onClick={handleGoogleLogin}>
        <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
          Login with Google
        </button>
      </div>
    </div>
</div>
    
  )
}