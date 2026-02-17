import React from 'react'
import './login.css'
import '../../assets/assets.js'
import assets from '../../assets/assets.js'
const Login = () => {
  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form className="login-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="username"
          className="form-input"
          required
        />
        <input
          type="email"
          placeholder="email address"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">Sign Up</button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot">
          <p className="login-toggle">
            Already have an account?<span>click here</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login