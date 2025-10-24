import React, { useEffect } from 'react';
import '../styles/EmergencyModal.css';

const services = [
  { key: 'police', label: 'Police Station (100)', icon: '🚓', call: 'tel:100' },
  { key: 'fire', label: 'Fire Station (101)', icon: '🔥', call: 'tel:101' },
  { key: 'ambulance', label: 'Ambulance (108)', icon: '🚑', call: 'tel:108' },
  { key: 'women', label: 'Women’s Helpline (181)', icon: '♀️', call: 'tel:181' },
];

const EmergencyModal = ({ onClose }) => {
  useEffect(() => {
    const audio = new Audio('/sounds/sirene.mp3');
    audio.volume = 0.6;
    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
    });
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <button className="close-btn" onClick={onClose}>✖</button> */}
        <h2>Emergency Services</h2>

        {services.map(service => (
          <button
            key={service.key}
            className={`item-btn ${service.key === 'women' ? 'women-btn' : ''}`}
            onClick={() => window.location.href = service.call}
          >
            <span className="icon">{service.icon}</span>
            <div>
              <strong>{service.label}</strong>
              <p>Tap to call</p>
            </div>
          </button>
        ))}

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyModal;
