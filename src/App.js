import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { HashLink as Link } from 'react-router-hash-link';
import Homepage from './components/Homepage/Homepage';
import Login from './components/LoginForm/Login';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
//import BusEstimationModule from './components/BusEstimationModule/BusEstimationModule';
import SampleBusEstimationData from './components/BusEstimationModule/SampleBusEstimationData';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';
//import Footer from './components/Footer/Footer';
//import FleetEstimationModule from './components/FleetHealth/FleetEstimationModule';
import SampleFleetEstimationData from './components/FleetHealth/SampleFleetEstimationData';
import StationStatus from './components/StationStatus/StationStatus';
import TicketGeneration from './components/TicketGeneration/TicketGeneration';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Simulate loading delay (remove this in your actual implementation)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1300); // Example: 3 seconds loading time

    // Clean up timer
    return () => clearTimeout(timeout);
  }, []);
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername('');
  };
  

  return (
    <Router style={{ height: '100%' }}>
    
      
      <Navbar isLoggedIn={isLoggedIn} username={username} handleSignOut={handleSignOut}/>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<SignUp  />} />
          <Route path="/bus-estimation" element={<SampleBusEstimationData />} />
          <Route path="/fleet" element={<SampleFleetEstimationData isLoggedIn={isLoggedIn}/>}  />
          <Route path="/station" element={<StationStatus/>} />
          <Route path="/ticketgen" element={<TicketGeneration/>} />
        </Routes>
      )}
      
    </Router>
  );
}

export default App;