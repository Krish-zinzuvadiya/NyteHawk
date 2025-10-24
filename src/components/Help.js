import React from 'react';
import '../styles/Help.css';

const Help = () => {
  return (
    <div className="help-container">
      <h2>Need Help?</h2>
      <p>
        NyteHawk helps you find essential services like ATMs, pharmacies, and food outlets during late-night hours.
      </p>

      <h3>📍 Why aren’t we using your current location?</h3>
      <p>
        Many laptops and desktop browsers don’t support GPS-based geolocation. Since accurate location access is limited on such devices, we’ve designed NyteHawk to work using:
      </p>
      <ul>
        <li>✅ Prime Localities (handpicked zones in Ahmedabad)</li>
        <li>✅ Pincode search (for more specific targeting)</li>
      </ul>

      <h3>🗺️ Where is NyteHawk currently available?</h3>
      <p>
        NyteHawk currently works only in Ahmedabad. We're planning to expand to other cities soon. Stay tuned!
      </p>

      <h3>💡 Need more support?</h3>
      <p>
        You can reach out via our <a href="/contact">Contact</a> page or email us at <strong>support@nytehawk.com</strong>.
      </p>
    </div>
  );
};

export default Help;
