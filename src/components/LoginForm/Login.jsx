import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import authService from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';
import maps from '../assets/map.png';
import './Login.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 3) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      const data = await authService.loginS(username, password);
      console.log('Login successful:', data);
      if (data.success) {  // Adjust this condition based on your API's response
        onLogin(username);  // Set login state to true and pass the username
        navigate('/homepage');
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setError('Login failed. Please check your username and password.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (<div style={{display:'flex'}}>
    
    <div className="login-background">
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
            {validationErrors.username && <p className="validation-error">{validationErrors.username}</p>}
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
            {validationErrors.password && <p className="validation-error">{validationErrors.password}</p>}
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember me
            </label>
            <a href="/">Forgot password?</a>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>

          <div className="register-link">
            <p>Don't have an account?<span onClick={handleSignUpClick}> Register</span></p>
          </div>
        </form>
      </div>
    </div>
    <div className="left">
       {/* <MapComponent /> */}
      <img src={maps} alt="icon1" style={{height:'425px',width:'780px',borderRadius:'10px',boxShadow:'inherit',margin:'20px',fontColor:'#fff'}}/>
    </div>
    </div>
  );
};

export default LoginForm;
