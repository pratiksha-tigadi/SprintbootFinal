import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 
import { FaUser, FaLock } from "react-icons/fa";
import { IoMail, IoCall } from "react-icons/io5";
import authService from '../../services/LoginService';
import maps from '../assets/map.png';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mno, setMno] = useState('');
    const [error, setError] = useState('');
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is not valid';
        }
        return errors;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});

        try {
            const data = await authService.signupS(username, password, mno, email);
            console.log('Sign up successful:', data);
            if (data) {  // Adjust this condition based on your API's response
                navigate('/login');
            } else {
                setError('Sign up failed. Please check your details and try again.');
            }
        } catch (error) {
            setError('Sign up failed. Please check your details and try again.');
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className='signup-background'>
            <div className='wrapper'>
                <form onSubmit={handleSignUp}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <FaUser className='icon'/>
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
                        <FaLock className='icon'/>
                        {validationErrors.password && <p className="validation-error">{validationErrors.password}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <IoMail className='icon'/>
                        {validationErrors.email && <p className="validation-error">{validationErrors.email}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Mobile-No'
                            value={mno}
                            onChange={(e) => setMno(e.target.value)}
                            required
                        />
                        <IoCall className='icon'/>
                       
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Sign Up</button>

                    <div className="login-link">
                        <p>Already have an account? <span onClick={handleLoginClick}>Login</span></p>
                    </div>
                </form>
            </div>
      <div className="left">
          {/* <MapComponent /> */}
         <img src={maps} alt="icon1" style={{height:'500px',width:'740px',borderRadius:'10px',boxShadow:'inherit',marginLeft:'20px',marginTop:'20px',fontColor:'#fff'}}/>
      </div>
        </div>
    );
};

export default SignUp;
