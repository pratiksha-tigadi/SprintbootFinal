import React, { useRef, useState } from 'react';
import FleetEstimationModule from './FleetEstimationModule';
import './fleet.css';
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

// const FleetGallery = ({ busDataList }) => {
//   const galleryRef = useRef(null);
//   const [startIndex, setStartIndex] = useState(0);

//   const scrollLeft = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 3);
//     }
//   };

//   const scrollRight = () => {
//     if (startIndex < busDataList.length - 3) {
//       setStartIndex(startIndex + 3);
//     }
//   };

//   return (
//     <div className="bus-gallery-container">
//       <button className="scroll-button left-find" onClick={scrollLeft}>
//         <FaArrowAltCircleLeft /> {/* Left arrow */}
//       </button>
//       <div className="bus-gallery" ref={galleryRef}>
//         {busDataList.slice(startIndex, startIndex + 3).map((busData, index) => (
//           <div className="bus-item" key={index}>
//             <FleetEstimationModule
//               fuelLevel={busData.fuelLevel}
//               licensePlate={busData.licensePlate}
//               status={busData.status}
//             />
//           </div>
//         ))}
//       </div>
//       <button className="scroll-button right-find" onClick={scrollRight}>
//         <FaArrowAltCircleRight /> {/* Right arrow */}
//       </button>
//     </div>
//   );
// };

// export default FleetGallery;

const FleetGallery = ({ busDataList }) => {
  const galleryRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollDown = () => {
    if (startIndex < busDataList.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="bus-galleryy-container">
      <div className="bus-galleryy" ref={galleryRef}>
        {busDataList.slice(startIndex, busDataList.length ).map((busData, index) => (
          <div className="bus-item" key={index}>
            <FleetEstimationModule
              fuelLevel={busData.fuelLevel}
              licensePlate={busData.licensePlate}
              lastMaintenanceDate={busData.lastMaintenanceDate}
              status={busData.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FleetGallery;