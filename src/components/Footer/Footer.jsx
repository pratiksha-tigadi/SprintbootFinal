import React from 'react';
import './Footer.css';
import { FaPhone, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="helpline">
            <FaPhone className="icon" />
            <span>Helpline: +1-123-456-7890</span>
          </div>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://www.instagram.com">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
