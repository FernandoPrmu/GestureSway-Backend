import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import './LoginPage.css';

export const LoginSignup = () => {
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = () => {
        // Clear form data when switching to "Login"
        setFormData({
            username: '',
            email: '',
            password: ''
        });
        setAction("Login");
    };

    return (
        <div>
            <Navbar />
            <div className='login-body'>
                <div className='containerL' style={{ marginTop: '100px' }}>
                    <div className='header'>
                        <div className='text'>{action}</div>
                        <div className='underline'></div>
                    </div>
                    <div className='inputs'>
                        {action === "Login" ? null :
                            <div className='input'>
                                <img src={user_icon} alt="" />
                                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Name' />
                            </div>
                        }

                        <div className='input'>
                            <img src={email_icon} alt="" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
                        </div>

                        <div className='input'>
                            <img src={password_icon} alt="" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' />
                        </div>
                    </div>

                    <div className='submit-container' style={{ marginTop: '60px' }}>
                      <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginSignup;
