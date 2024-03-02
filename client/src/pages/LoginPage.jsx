/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import userIcon from '../assets/person.png';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: '' 
    });
    const [message, setMessage] = useState('');
    const [action, setAction] = useState('Sign In');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation checks
        if (action === 'Sign Up' && !formData.username) {
            setMessage('Please enter a username.');
            return;
        }
        if (!formData.email) {
            setMessage('Please enter an email address.');
            return;
        }
        if (!formData.password) {
            setMessage('Please enter a password.');
            return;
        }
        if (action === 'Sign Up' && !formData.age) {
            setMessage('Please enter your age.');
            return;
        }

        const { email, password, age } = formData;
        if (action === 'Sign In') {
            axios.post('http://localhost:3001/login', { email, password })
                .then(response => {
                    alert(response.data);
                })
                .catch(err => {
                    console.log(err);
                    alert('An error occurred while signing in.');
                });
        } else {
            const { username } = formData;
            axios.post('http://localhost:3001/register', { username, email, password, age }) 
                .then(response => {
                    alert(response.data);
                })
                .catch(err => {
                    console.log(err);
                    alert('An error occurred while signing up.');
                });
        }
    };

    return (
        <div className="login-body">
            <div className="containerL">
                <div className="header">
                    <div className="text">{action === 'Sign In' ? 'Sign In' : 'Sign Up'}</div>
                    <div className="underline"></div>
                </div>
                {message && <p>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        {action === 'Sign Up' && (
                            <div className="input">
                                <img src={userIcon} alt="Username" />
                                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                            </div>
                        )}
                        <div className="input">
                            <img src={emailIcon} alt="Email" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                        </div>
                        <div className="input">
                            <img src={passwordIcon} alt="Password" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </div>
                        {action === 'Sign Up' && (
                            <div className="input">
                                <img src={userIcon} alt="Age" />
                                <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                            </div>
                        )}
                        <div className="submit-container">
                            <button className="submit" type="submit">{action}</button>
                        </div>
                    </div>
                </form>
                <div className="submit-container">
                    <button className={action === 'Sign In' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign In')}>
                        <img src={userIcon} alt="Sign In" /> Sign In
                    </button>
                    <button className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign Up')}>
                        <img src={userIcon} alt="Sign Up" /> Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
