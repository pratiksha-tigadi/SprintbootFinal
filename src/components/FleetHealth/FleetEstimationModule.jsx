import './fleet.css';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
//import Lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData from '../assets/engine.json';




const FleetEstimationModule = ({ fuelLevel, licensePlate, status,lastMaintenanceDate }) => {
  const [busData, setBusData] = useState({
    fuelLevel,
    licensePlate,
    status,
    lastMaintenanceDate
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
      setBusData({ fuelLevel, licensePlate, status,lastMaintenanceDate});
      setAnimationClass('fade-in');
    }, 500); // This should match the duration of your fade-out animation

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [fuelLevel, licensePlate, status,lastMaintenanceDate]);

  return (
    <div className={`bus-estimation-containerr ${animationClass}`}>
      <div className="bus-details">
        <div className="cardd" style={{display :"flex", margin:"0px"}}>
          
          
            <Lottie options={defaultOptions} height={100} width={100} isClickToPauseDisabled={true} />
          
          
            <h4 style={{textAlign: "center", margin:"20px"}}>Bus Fuel <br></br>{busData.fuelLevel}</h4>
          
         
            <h4 style={{textAlign: "center", margin:"20px"}}>     License Plate No<br></br>{busData.licensePlate}</h4>
          
          
            <h4 style={{textAlign: "center", margin:"20px"}}>     Engine Status<br></br>{busData.status}</h4>

            <h4 style={{textAlign: "center", margin:"20px"}}>     Last Maintance<br></br>{busData.lastMaintenanceDate}</h4>
          
        </div>
      </div>
    </div>
  );
};

export default FleetEstimationModule;