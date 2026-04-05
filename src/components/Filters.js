import React, { useState } from 'react';
import '../styles/Services.css';
import { FaList, FaMoneyCheckAlt, FaHamburger, FaPills, FaHospital, FaGasPump, FaAmbulance } from 'react-icons/fa';

const categories = [
  { name: 'All', icon: <FaList /> },
  { name: 'ATMs', icon: <FaMoneyCheckAlt /> },
  { name: 'Food', icon: <FaHamburger /> },
  { name: 'Medical', icon: <FaPills /> },
  { name: 'Hospitals', icon: <FaHospital /> },
  { name: 'Transport', icon: <FaAmbulance /> },
  { name: 'Fuel', icon: <FaGasPump /> },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="services-page">
      <div className="location-heading">
        <h3>Services in: <span className="highlight">Maninagar (Prime Location)</span></h3>
      </div>

      <div className="category-navbar">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${activeCategory === cat.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            <span className="icon">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      <div className="service-results">
        <p>Showing results for: <strong>{activeCategory}</strong></p>
        {/* Add result cards/grid below later */}
      </div>
    </div>
  );
};

export default Services;