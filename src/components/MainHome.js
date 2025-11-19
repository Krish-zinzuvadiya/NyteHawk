import React from 'react';
import Home from './Home';
import '../styles/MainHome.css';

const MainHome = () => {
  const scrollToMap = () => {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="hero-section">
        
        {/* Animated gradient background */}
        <div className="animated-bg"></div>

        <div className="hero-content">
          <h1>🌃 Welcome to NyteHawk</h1>
          <p>Find nearby services open at night.</p>
          <button className="explore-btn" onClick={scrollToMap}>
            Explore Now
          </button>
        </div>
      </div>

      <div id="map-section">
        <Home />
      </div>
    </>
  );
};

export default MainHome;
