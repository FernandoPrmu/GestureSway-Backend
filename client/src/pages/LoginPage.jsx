/* eslint-disable no-undef */
import './LoginPage.css';
import Navbar from '../components/Navbar';

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

export const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleActionChange = (newAction) => {
    setAction(newAction);
    // Clear input fields when switching action
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setEmailError('');
  };

  const validateEmail = (email) => {
    // Email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

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
        {action === 'Login' ? null : (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email Id'
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className='error'>{emailError}</p>}
        </div>

        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {action === 'Sign Up' && (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className='submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => handleActionChange('Sign Up')}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => handleActionChange('Login')}
        >
          Login
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default LoginSignup;
