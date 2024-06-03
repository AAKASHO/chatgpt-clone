"use client"
import { useEffect, useState } from 'react';
import { login, signup } from './actions'

export default function LoginPage() {

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleGoogleLogin = () => {
    window.location.href = '/login-google';
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
        <div className="divider">
          <span>or</span>
        </div>
        <button className="google-login-button">
          {/* <img src="./chatgptlogows" alt="Google Logo" /> */}
          Login with Google
        </button>
      </div>
    </div>
</div>
    
  )
}