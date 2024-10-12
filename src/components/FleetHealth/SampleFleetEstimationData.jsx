
// import React, { useState } from 'react';
// import './FleetEstimationModule.css';
// import FleetGallery from './FleetEstimationGalary';
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import authService from '../../services/LoginService';

// const SampleFleetEstimationData = () => {
//   const [error, setError] = useState(null);
//   const [showEstimation, setShowEstimation] = useState(false);
//   const [fleetS, setFleetS] = useState([]);

//   const handleFindBus = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const data = await authService.fleetS();
//       if (data) {
//         setFleetS(data);
//         setShowEstimation(true);
//       } else {
//         setError('Failed to fetch fleet health data.');
//       }
//     } catch (error) {
//       setError('Failed to fetch fleet health data. Please try again.');
//     }
//   };

//   return (
//     <div className="bus-estimation-containerr">
//       <div className="source-destination" style={{ textAlign: 'center', fontSize: '26px', fontWeight: '500' }}>
//         <button onClick={handleFindBus} style={{ display: 'inline-block', marginLeft: '10px', marginTop: '10px', fontWeight: '500', background: '#23548c' }}>
//           Get Fleet Health
//         </button>
//       </div>

//       {showEstimation && <FleetGallery busDataList={fleetS} />} {/* Render the fleet estimation cards if showEstimation is true */}
//     </div>
//   );
// };

// export default SampleFleetEstimationData;


import React,{ useState, useEffect } from 'react';
import './FleetEstimationModule.css';
import FleetGallery from './FleetEstimationGalary';
import authService from '../../services/LoginService';
import { Link, useNavigate } from 'react-router-dom';


const SampleFleetEstimationData = ({isLoggedIn}) => {
  const [error, setError] = useState(null);
  const [showEstimation, setShowEstimation] = useState(false);
  const [fleetS, setFleetS] = useState([]);
  const [licensePlateFilter, setLicensePlateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredFleetS, setFilteredFleetS] = useState([]);

  // Dropdown options for status filter
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'running', label: 'Running' },
    { value: 'out of order', label: 'Out of Order' },
    { value: 'under maintenance', label: 'Under Maintenance' },
  ];
  const navigate = useNavigate();


  const handleFindBus = async () => {
    setError(null);
    try {
      const data = await authService.fleetS();
      if (data) {
        setFleetS(data);
        setShowEstimation(true); // Show fleet estimation after successful fetch
      } else {
        setError('No fleet health data available.');
      }
    } catch (error) {
      setError('Failed to fetch fleet health data. Please try again.');
    }
  };

  useEffect(() => {
    // Filter fleetS based on licensePlateFilter and statusFilter
    const filteredData = fleetS.filter((item) => {
      const licensePlate = item.licensePlate || '';
      const status = item.status || ''; // Handle null or undefined case
      console.log("fff:",fleetS)
      const matchesLicensePlate = new RegExp(licensePlateFilter.toString(), 'i').test(licensePlate.toString());
      console.log("Entered:",licensePlateFilter);
      console.log("ori:",item);
      const matchesStatus = status.toLowerCase().includes(statusFilter.toLowerCase());
      console.log("MAtch:",matchesLicensePlate);
      return matchesLicensePlate && matchesStatus;
    });

    setFilteredFleetS(filteredData);
  }, [fleetS, licensePlateFilter, statusFilter]);

  return (isLoggedIn ? (<>
       
  
    <div className="bus-estimation-containerr">
      <div className="source-destination" style={{ textAlign: 'center', fontSize: '26px', fontWeight: '500' }}>
        <button onClick={handleFindBus} style={{ display: 'inline-block', marginLeft: '10px', marginTop: '10px', fontWeight: '500', background: '#23548c' }}>
          Get Fleet Health
        </button>
      </div>

      {showEstimation && (
        <>
          <div className="source-destination" style={{ textAlign: 'center', fontSize: '20px', fontWeight: '500', marginTop: '20px' }}>
            <div style={{ display: 'inline-block', fontWeight: '500' }}>Enter License Plate:</div>
            <input
              
              placeholder="License Plate"
              value={licensePlateFilter}
              onChange={(e) => setLicensePlateFilter(e.target.value)}
              style={{
                marginLeft: '5px',
                marginRight: '5px',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <div style={{ display: 'inline-block', marginLeft: '20px', fontWeight: '500' }}>Filter by Status:</div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                marginLeft: '5px',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <FleetGallery busDataList={filteredFleetS} />
        </>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  </>):(
     <a
     href="/login"
     className="nav-link"
     onClick={(e) => {
       e.preventDefault();
       navigate('/login');
     }}
     style={{
       backgroundColor: '#23548c',
       color: 'white',
       padding: '10px 20px',
       marginTop:'10%',
       marginLeft:'44%',
       border: 'none',
       borderRadius: '5px',
       textDecoration: 'none',
       display: 'inline-block',
       textAlign: 'center',
       justifyContent:'center'
     }}
   >
     Login first
   </a>
  ));
};

export default SampleFleetEstimationData;



