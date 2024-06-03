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
    <form>

<div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <button type="submit" className="login-button">Login with Email</button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <button className="google-login-button" >
          {/* <img src="./chatgptlogows" alt="Google Logo" /> */}
          Login with Google
        </button>
      </div>
    </div>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}