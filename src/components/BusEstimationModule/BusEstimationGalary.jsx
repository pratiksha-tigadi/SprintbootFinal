
import React, { useRef, useState } from 'react';
import BusEstimationModule from './BusEstimationModule';
import './BusEstimationModule.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";


const BusGallery = ({ busDataList }) => {
  const galleryRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
 
  function generateRandomSeats() {
    return Math.floor(Math.random() * 50) + 10; // Generates a random number between 10 and 59
  }

  busDataList = busDataList.map(item => ({
    ...item,
    seats: generateRandomSeats()
  }));
  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const scrollRight = () => {
    if (startIndex < busDataList.length - 3) {
      setStartIndex(startIndex + 3);
    }
  };

  return (
    <div className="bus-gallery-container">
      <button className="scrol-button left-findd" onClick={scrollLeft}>
        <FaArrowAltCircleLeft /> {/* Left arrow */}
      </button>
      <div className="bus-gallery" ref={galleryRef}>
        {busDataList.slice(startIndex, startIndex + 3).map((busData, index) => (
          <div className="bus-item" key={index}>
            <BusEstimationModule
              timestamp={busData.estimatedTime}
              busNumber={busData.bus.licensePlate}
              capacity_filled={busData.capacity_filled}
            />
          </div>
        ))}
      </div>
      <button className="scrol-button right-findd" onClick={scrollRight}>
        <FaArrowAltCircleRight /> {/* Right arrow */}
      </button>
    </div>
  );
};

export default BusGallery;

