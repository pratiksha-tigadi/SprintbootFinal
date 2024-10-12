// LoadingAnimation.jsx

import React from 'react';
import Lottie from 'react-lottie';
import './LoadingAnimation.css';
import loadingAnimation from '../assets/loading.json';


const LoadingAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
    };
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Adjust height as needed
        }}
      >
        <Lottie
          options={defaultOptions}
          height={500} // Adjust height as needed
          width={400} // Adjust width as needed
        />
      </div>
    );
  };

export default LoadingAnimation;
