"use client"
import { useEffect, useState } from 'react';
import { signInWithGoogle, signup } from './actions.js'
import { createClient } from '@/utils/supabase/client';

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
    console.log("googlelog")
    console.log("google");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/auth/v1/callback`,
      },
    });
  
    if (error) {
      console.error('Error during sign-in:', error);
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
          <button type="submit" className="login-button" formAction={signup}>signup with Email</button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        {/* <form > */}
        <button className="google-login-button" onClick={handleGoogleLogin}>
        sign up with Google
        </button>
        {/* </form> */}
          {/* <img src="./chatgptlogows" alt="Google Logo" /> */}
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