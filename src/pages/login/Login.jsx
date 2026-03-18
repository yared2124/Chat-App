import React from 'react'
import './Login.css'
import { useState } from 'react'
import '../../assets/assets.js'
import assets from '../../assets/assets.js'
import { signup,login,resetPass } from '../../config/firebase.js'


const Login = () => {

const [currState, setCurrState] = useState('Sign Up');
const [username,setUsername] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const onSubmitHandler = (event)=>{
  event.preventDefault();
  if(currState === "Sign Up"){
    signup(username,email,password)
  }
  else{
    login(email,password)
  }
}

  return (
    <div className="login">
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ?
          <input onChange={(e)=>setUsername(e.target.value)} value={username}
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
         : null}

        <input onChange={(e)=>setEmail(e.target.value)} value={email}
          type="email"
          placeholder="email address"
          className="form-input"
          required
        />
        <input onChange={(e)=>setPassword(e.target.value)} value={password}
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login Now"}
        </button>
        <div className="login-term">
          
          <input type="checkbox"  />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account?
              <span onClick={() => setCurrState("Sign Up")}> click here</span>
            </p>
          )}
          {currState === "Login" ?  <p className="login-toggle">
              Forgot password ?
              <span onClick={() =>resetPass(email) }> reset here</span>
            </p>: null }
        </div>
      </form>
    </div>
  );
}

export default Login