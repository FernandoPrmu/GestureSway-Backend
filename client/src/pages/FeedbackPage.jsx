/* eslint-disable no-unused-vars */
// import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


import React, { useState } from 'react'
import './LoginPage.css'

import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'


  export const LoginSignup = () => {

      const [action,setAction] = useState("Login");

    return (
      <div>
        <Navbar/>
      
      <div className='login-body'>
          <div className='containerL'>
          <div className='header'>
              <div className='text'>{action}</div>
              <div className='underline'></div>
          </div>
          <div className='inputs'>
              {action==="Login"?<div></div>:<div className='input'>
                  <img src={user_icon} alt="" />
                  <input type="text" placeholder='Name'/>
              </div>}
              

              <div className='input'>
              <img src={email_icon} alt="" />
              <input type="email" placeholder='Email Id'/>
              </div> 

              <div className='input'>
              <img src={password_icon} alt="" />
              <input type="password" placeholder='Password'/>
              </div> 
          </div>

          {action==="Sign Up"?<div></div>:<div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>}
          <div className='submit-container'>
              <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
          </div>
      </div>
      </div>
    <Footer/>
    </div>
    );
  };

  export default LoginSignup;
