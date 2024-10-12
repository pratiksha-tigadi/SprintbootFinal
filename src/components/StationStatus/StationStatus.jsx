import React, { useState } from 'react';
import './BusStationStatus.css';
import animationData from '../assets/ticket.json';
import Lottie from 'react-lottie';
import passanger from '../assets/passanger.json'

const StationStatus = () => {
    const [station, setStation] = useState('');
    const [counterStatus, setCounterStatus] = useState('');
    const [passengerCount, setPassengerCount] = useState(0);

    const stations = [
        { name: 'Station 1', counterStatus: 'Crowded', passengerCount: 120 },
        { name: 'Station 2', counterStatus: 'Empty', passengerCount: 10 },
        { name: 'Station 3', counterStatus: 'Moderate', passengerCount: 50 },
    ];

    const handleStationChange = (event) => {
        const selectedStation = stations.find(station => station.name === event.target.value);
        setStation(selectedStation.name);
        setCounterStatus(selectedStation.counterStatus);
        setPassengerCount(selectedStation.passengerCount);
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

      const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: passanger,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className="container">
            <div className="content">
                <h2>Figure out the best bus for your route in no time!</h2>
                <select value={station} onChange={handleStationChange}>
                    <option value="" disabled>Select Station</option>
                    {stations.map((station, index) => (
                        <option key={index} value={station.name}>{station.name}</option>
                    ))}
                </select>
                {station && (
                    <div className="status-info" style={{display:"flex"}}>
                        <div className="ani1" style={{display:"block", margin:"100px"}} >
                          <Lottie options={defaultOptions} height={150} width={200} isClickToPauseDisabled={true} />
                          <br></br><h4 style={{color:"white"}}>Ticket Counter Status <br></br>{counterStatus}</h4>
                        </div>
                        

                        <div className="ani1" style={{display:"block", margin:"100px"}}>
                          <Lottie options={defaultOptions2} height={150} width={200} isClickToPauseDisabled={true} />
                          <br></br><h4 style={{color:"white"}}>Passenger Count<br></br>{passengerCount}</h4>
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default StationStatus;
