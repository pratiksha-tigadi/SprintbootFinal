import './BusEstimationModule.css';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
//import Lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData from '../assets/ani1.json';



const BusEstimationModule = ({ source, destination, timestamp, busNumber, capacity_filled}) => {
  const [busData, setBusData] = useState({
    timestamp,
    busNumber,
    capacity_filled
  });
  const [animationClass, setAnimationClass] = useState('fade-in');

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    // Trigger fade-out animation
    setAnimationClass('fade-out');

    // Set a timeout to update the data and trigger fade-in animation
    const timeoutId = setTimeout(() => {
      setBusData({ timestamp, busNumber, capacity_filled});
      setAnimationClass('fade-in');
    }, 500); // This should match the duration of your fade-out animation

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [timestamp, busNumber, capacity_filled ]);
  
  function convertFloatToTime(floatHours) {
    // Split float into hours and minutes
    const hours = Math.floor(floatHours); // Get the whole hours
    const minutes = Math.round((floatHours % 1) * 60); // Convert remaining float to minutes
  
    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
    return `${hours} Hr :${formattedMinutes} Min`;
  }

  return (
    <div className={`bus-estimation-containerr ${animationClass}`}>
      <div className="bus-details">
        <div className="cardd">
          <div className="timestamp">
            <h3><IoTimeOutline className='icon' />{convertFloatToTime(busData.timestamp)}</h3>
          </div>
          <div className="ani1">
            <Lottie options={defaultOptions} height={150} width={150} isClickToPauseDisabled={true} />
          </div>
          <div className="bus-number">
            <h3>Bus No <br></br> {busData.busNumber}</h3>
          </div>
          <div className="bus-number">
            <h3>Available Seats <br></br> {busData.capacity_filled}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BusEstimationModule;