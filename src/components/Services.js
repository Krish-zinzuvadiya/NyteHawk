import React, { useState } from 'react';
import '../styles/Services.css';
import { useLocation } from 'react-router-dom';
import {
  FaMoneyCheckAlt, FaHamburger,
  FaPills, FaHospital, FaGasPump
} from 'react-icons/fa';

import atmData from './pages/Atm';
import medicalData from './pages/Medical';
import hospitalData from './pages/Hospital';
import fuelStations from './pages/Fuel';
import foodData from './pages/Food';

const categories = [
  { name: 'ATMs', icon: <FaMoneyCheckAlt /> },
  { name: 'Food', icon: <FaHamburger /> },
  { name: 'Medical', icon: <FaPills /> },
  { name: 'Hospitals', icon: <FaHospital /> },
  { name: 'Fuel', icon: <FaGasPump /> },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('ATMs');
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const location = useLocation();
  const { selectedLocation, isPrime } = location.state || {};

  const displayLocation = selectedLocation
    ? `${selectedLocation} (${isPrime ? "Prime Location" : "Pincode"})`
    : "You Are Not Select Any Location";

  return (
    <div className="services-page">

      {/* Category Navbar */}
      <div className="category-navbar">
        {categories.map((cat) => (
          <button
  key={cat.name}
  className={`category-btn ${activeCategory === cat.name ? 'active' : ''}`}
  onClick={() => setActiveCategory(cat.name)}
>
  <span className="icon">{cat.icon}</span>
  <span className="label">{cat.name}</span>
</button>

        ))}
      </div>

      {/* ATMs */}
      {activeCategory === 'ATMs' && (
        <div className="results-grid">
          {atmData.map((atm, index) => (
            <div className="result-card" key={index}>
              <div className="fuel-image">
                <img src={atm.image} alt={atm.name} />
              </div>
              <h3>{atm.name}</h3>
              <p>{atm.address}</p>
              <div className="actions">
                <a href={atm.directionLink} target="_blank" rel="noopener noreferrer" className="btn blue">
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Hospitals */}
      {activeCategory === 'Hospitals' && (
        <div className="hospital-list">
          {hospitalData.map((h, index) => (
            <div className="hospital-card" key={index}>
              <div className="hospital-image">
                <img src={h.image} alt={h.name} />
              </div>
              <h3>{h.name}</h3>
              <p>{h.address}</p>
              <div className="actions">
                <a href={`tel:${h.phone}`} className="btn dark">Contact</a>
                <a href={h.directionLink} target="_blank" rel="noopener noreferrer" className="btn blue">
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fuel */}
      {activeCategory === 'Fuel' && (
      <div className="results-grid">
        {fuelStations.map((station, index) => (
          <div className="fuel-card" key={index}>
            <div className="fuel-logo">
              <img src={station.image} alt={station.name} />
            </div>
            <div className="fuel-details">
              <h3>{station.name}</h3>
              <p>{station.address}</p>
              <div className="actions">
                <a href={`tel:${station.phone}`} className="btn dark">Contact</a>
                <a href={station.directionLink} target="_blank" rel="noopener noreferrer" className="btn blue">Directions</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

      {/* Food */}
      {activeCategory === 'Food' && (
        <div className="food-list">
          {foodData.map((food, index) => (
            <div className="food-card" key={index}>
              <div className="food-image">
                <img src={food.image} alt={food.name} />
              </div>
              <div className="food-details">
                <h3>{food.name}</h3>
                <p>{food.address}</p>
                <p>
                  Contact: <a href={`tel:${food.phone}`}>{food.phone}</a>
                </p>

                {/* Ratings Section */}
                  <div class="ratings">
                    <p class="swiggy">
                      Swiggy: <span class="rating-pill swiggy-pill">{food.swiggyRating} ★</span>
                    </p> |
                    <p class="zomato">
                      Zomato: <span class="rating-pill zomato-pill">{food.zomatoRating} ★</span>
                    </p>
                  </div>

                <div className="actions">
                  <a
                    href={food.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn blue"
                  >
                    Order Food
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Medicine */}
      {activeCategory === 'Medical' && (
        <div className="medical-list">
          {medicalData.map((m, index) => (
            <div className="medical-card" key={index}>
              <div className="medical-image">
                <img src={m.image} alt={m.name} />
              </div>
              <div className="medical-info">
                <h3>{m.name}</h3>
                <p>{m.address}</p>
                <div className="actions">
                  <a href={`tel:${m.phone}`} className="btn dark">Contact</a>
                  <a href={m.orderPage} target="_blank" rel="noopener noreferrer" className="btn blue">
                    Order Medicine
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
