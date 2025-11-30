import React, { useState } from 'react';
import '../styles/Navbar.css';
import { FiAlertTriangle, FiMenu, FiX } from 'react-icons/fi';
import EmergencyModal from './EmergencyModal';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showEmergency, setShowEmergency] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [menuOpen, setMenuOpen] = useState(false);

  const openEmergency = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lon: coords.longitude });
        setShowEmergency(true);
      },
      (err) => {
        alert('Geolocation permission denied or unavailable.');
        console.error(err);
      }
    );
  };

  return (
    <>
      <div className="navbar">
        <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <div className="left-section">
          <a href="/home" className="logo-link">
            <img src="/images/logo1.png" alt="NyteHawk Logo" className="logo" />
          </a>
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/home" className="nav-item" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" className="nav-item" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/about" className="nav-item" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="nav-item" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/help" className="nav-item" onClick={() => setMenuOpen(false)}>Help</Link>
        </div>

        <button className="emergency-btn" onClick={openEmergency}>
  <FiAlertTriangle className="alert-icon" />
  <span>Emergency</span>
</button>


         <Link to="/profile" className="profile-btn">
    <ion-icon name="person-circle-outline" class="icon-hover"></ion-icon>
  </Link>
      </div>



      {showEmergency && coords.lat && (
        <EmergencyModal
          lat={coords.lat}
          lon={coords.lon}
          onClose={() => setShowEmergency(false)}
        />
      )}
    </>
  );
};

export default Navbar;
