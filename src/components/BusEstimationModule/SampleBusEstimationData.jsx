import BusGallery from './BusEstimationGalary'; 
import React, { useState } from 'react';
import './BusEstimationModule.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import authService from '../../services/LoginService';

// Mapping of codes to station names
const busStations = {
  A: 'New Busstand',
  B: 'Jublie Circle',
  C: 'Dharwad Bus Terminal',
  D: 'Court circle',
  E: 'NTTF',
  F: 'Hosayalapur cross',
  G: 'Tollnaka',
  H: 'Vidyagiri',
  I: 'Gandhinagar',
  J: 'Lakhamanhalli',
  K: 'Satturu',
  L: 'SDM Medical',
  M: 'Navalur Railway Station',
  N: 'Rayapur',
  O: 'Isckon',
  P: 'RTO',
  Q: 'KIMS',
  R: 'APMC',
  S: 'Navanagar',
  T: 'BV Bommaraddi College'
};

const SampleBusEstimationData = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState('');
  const [error, setError] = useState(null);
  const [showEstimation, setShowEstimation] = useState(false); // State to toggle showing bus estimation cards
  const [busDataList, setBusDataList] = useState([]);


  const handleFindBus = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Finding buses from', source, 'to', destination, 'with', passengers, 'passengers');
      const data = await authService.busListS(source, destination, passengers)
      console.log('Login successful:', data);
      if (data) {  // Adjust this condition based on your API's response
        setBusDataList(data);
        
        setShowEstimation(true);
      } else {
        setError('Bus search failed. Please check your inputs.');
      }
    } catch (error) {
      setError('Bus search failed. Please check your inputs.');
    }
  };

  return (<>
    <div className="bus-estimation-container ">
      <div className="source-destination" style={{ textAlign: 'center', fontSize: '26px', fontWeight: '500' }}>
        <div style={{ display: 'inline-block', fontWeight: '500' }}>Source : </div>
        <FaMapMarkerAlt className="icon" />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{
            marginLeft: '5px',
            marginRight: '5px',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
        >
          {Object.keys(busStations).map((code) => (
            <option key={code} value={code}>
              {busStations[code]}
            </option>
          ))}
        </select>

        <div style={{ display: 'inline-block', marginLeft: '62px', fontWeight: '500', marginTop: '15px' }}>Destination : </div>
        <FaMapMarkerAlt className="icon" />
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            marginLeft: '10px',
            marginRight: '5px',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
        >
          {Object.keys(busStations).map((code) => (
            <option key={code} value={code}>
              {busStations[code]}
            </option>
          ))}
        </select>

        {/* <div style={{ display: 'inline-block', fontWeight: '500', marginLeft: '62px' }}>No of Passengers : </div> */}
        {/* <div className="passengers-input" style={{ display: 'inline-block', marginLeft: '5px', marginTop: '5px' }}>
          <input
            type="number"
            placeholder="Number of passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            style={{
              justifyContent: 'center',
              marginTop: '10px',
              marginLeft: '10px',
              marginRight: '5px',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #ccc',
            }}
          />
        </div> */}
        <button onClick={handleFindBus} style={{ display: 'inline-block', marginLeft: '30px', marginTop: '10px', fontWeight: '500' }}>Find Bus</button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
      {showEstimation && <BusGallery busDataList={busDataList} />} {/* Render the bus estimation cards if showEstimation is true */}
      </>  
  );
};

export default SampleBusEstimationData;