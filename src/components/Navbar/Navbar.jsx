
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaUserCircle } from "react-icons/fa";
import Logo from '../assets/logo.png';

const Navbar = ({ isLoggedIn, username, handleSignOut }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu-r">
          <li className="nav-item dropdown">
            <a href="#" className="service-btn">
              Services
              <i className="fa fa-caret-down"></i>
            </a>
            <div className="dropdown-content">
              <a href="/bus-estimation" className="nav-link" onClick={() => navigate('/bus-estimation')}>
                Bus Capacity Estimation
              </a>
              <a href="/fleet" className="nav-link" onClick={() => navigate('/fleet')}>
                Fleet Health Checkup
              </a>
              <a href="/ticketgen" className="nav-link" onClick={() => navigate('/ticketgen')}>
                Generate your ticket
              </a>
            </div>
          </li>
        </ul>
        <div className="navbar-logo" onClick={() => handleNavigation('/homepage')}>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <ul className="nav-menu">
          {isLoggedIn ? (
            <>
              <li className='nav-item'>
                  <FaUserCircle/> 
              </li>
              <li className="nav-item">
              
              <div style={{fontSize: "14px", fontWeight: "bold", padding: "10px", color: "#ffffff"}}>
                {username}
              </div>
              </li>
              <li className="nav-item">
                <button className="sign-out-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="login-signup">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="login-signup">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
