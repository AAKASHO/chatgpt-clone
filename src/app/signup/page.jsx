"use client"
import { useEffect, useState } from 'react';
import { signup } from './actions'

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

  const handleEmailSignup = (event) => {
    // event.preventDefault();
    // alert("Please check your email")
    console.log("evenr");
    console.log(event);
    signup(event);
    // window.location.href="/email"
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
          <button type="submit" className="login-button" formAction={handleEmailSignup}>signup with Email</button>
        </form>
        <div className="divider">
          <span>or</span>
        </div>
        <button className="google-login-button">
          {/* <img src="./chatgptlogows" alt="Google Logo" /> */}
        sign up with Google
        </button>
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