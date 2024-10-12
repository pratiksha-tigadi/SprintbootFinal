import React, { useState } from 'react';
import './TicketGeneration.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import QRCode from 'qrcode.react';
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

const TicketGeneration = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState(null);

  const handleFindBus = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await authService.ticketG(source, destination);
      console.log('Ticket generated:', data);
      if (data) {
        setTicketData(data);
      } else {
        setError('Ticket generation failed. Please check your inputs.');
      }
    } catch (error) {
      setError('Ticket generation failed. Please check your inputs.');
    }
  };

  return (
    <div className="bus-estimation-container">
      <div className="source-destination" style={{ textAlign: 'center', fontSize: '26px', fontWeight: '500' }}>
        <div style={{ display: 'inline-block', fontWeight: '500',color:'#ffffff'}}>Source: </div>
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

        <div style={{ display: 'inline-block', marginLeft: '62px', fontWeight: '500', marginTop: '15px',color:'#ffffff' }}>Destination: </div>
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

        <button onClick={handleFindBus} style={{ display: 'inline-block', marginLeft: '100px', marginTop: '10px', fontWeight: '500',color:'#ffffff',background:'#23548c'}}>Generate Ticket</button>
      </div>

      {error && <div className="error">{error}</div>}

      {ticketData && (
        <div className="ticket-info">
          <h2>Ticket Information</h2>
          <p><strong>Source:</strong> {busStations[ticketData.sourceCode]}</p>
          <p><strong>Destination:</strong> {busStations[ticketData.destinationCode]}</p>
          <p><strong>Generation Time:</strong> {ticketData.generationTime}</p>
          <p><strong>Price:</strong> {ticketData.price}</p>
          <div className="qr-code">
            <QRCode value={ticketData.uniqueKey} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketGeneration;
