// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const primeAreas = {
  Navrangpura: { lat: 23.0419, lon: 72.5601 },
  Maninagar: { lat: 23.0155, lon: 72.6296 },
  Satellite: { lat: 23.0263, lon: 72.5084 },
  CGRoad: { lat: 23.031, lon: 72.5682 },
  Ghatlodia: { lat: 23.0664, lon: 72.5453 },
  PrahladNagar: { lat: 23.0108, lon: 72.5087 },
  Ambli: { lat: 23.0303, lon: 72.4917 },
  Thaltej: { lat: 23.0582, lon: 72.5067 },
  SindhuBhavanMarg: { lat: 23.0481, lon: 72.4957 },
  SGHighway: { lat: 23.0466, lon: 72.5244 },
  Bodakdev: { lat: 23.053, lon: 72.5167 },
  Vastrapur: { lat: 23.038, lon: 72.5263 },
  Bopal: { lat: 22.9933, lon: 72.5006 },
  SouthBopal: { lat: 22.9757, lon: 72.4875 },
  Chandkheda: { lat: 23.1103, lon: 72.6033 },
  ScienceCityRoad: { lat: 23.0701, lon: 72.5011 },
  Jagatpur: { lat: 23.1122, lon: 72.5342 },
  Gota: { lat: 23.106, lon: 72.5251 },
  GIFTCity: { lat: 23.1645, lon: 72.683 },
};

const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapUpdater = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 15);
    }
  }, [lat, lon, map]);
  return null;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({ lat: 23.0225, lon: 72.5714 });
  const [selectedType, setSelectedType] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [range, setRange] = useState(5000);
  const [showMap, setShowMap] = useState(false); // 👈 New state for "Tap to Open Map"

  // 🔍 Auto-suggest handler
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matchedAreas = Object.keys(primeAreas).filter(area =>
      area.toLowerCase().includes(q)
    );
    setSuggestions(matchedAreas);
  }, [searchQuery]);

  // Handle search button
  const handleSearch = async () => {
    const areaMatch = Object.keys(primeAreas).find(
      (a) => a.toLowerCase() === searchQuery.toLowerCase()
    );

    if (areaMatch) {
      setCoords(primeAreas[areaMatch]);
      setNearbyPlaces([]);
      return;
    }

    if (/^\d{6}$/.test(searchQuery)) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${searchQuery}&country=India&format=json&addressdetails=1`
        );
        const data = await res.json();
        if (data.length > 0) {
          const location = data[0];
          setCoords({ lat: parseFloat(location.lat), lon: parseFloat(location.lon) });
          setNearbyPlaces([]);
        } else {
          alert('Invalid or unsupported pincode.');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to fetch location.');
      }
    } else {
      alert('Enter valid Prime Location or Pincode');
    }
  };

  const categories = [
    { key: 'atm', label: 'ATM 🏧' },
    { key: 'pharmacy', label: 'Pharmacy 💊' },
    { key: 'restaurant', label: 'Restaurant 🍴' },
  ];

  const iconUrlMap = {
    atm: 'https://cdn-icons-png.flaticon.com/512/483/483947.png',
    pharmacy: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
    restaurant: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  };

  useEffect(() => {
    if (!selectedType || !coords.lat || !coords.lon) return;

    const query = `
      [out:json];
      (
        node["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
        way["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
        relation["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
      );
      out center;
    `;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        const points = data.elements
          .map((el) => ({
            id: el.id,
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            name: el.tags?.name || 'Unnamed',
          }))
          .filter((el) => el.lat && el.lon);

        setNearbyPlaces(points);
      } catch (err) {
        console.error('Error fetching Overpass data:', err);
        setNearbyPlaces([]);
      }
    };

    fetchData();
  }, [selectedType, coords, range]);

  return (
    <div className="home-grid">
      <div className="left-panel">
        <h3 className="panel-title">Search Location</h3>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search Location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setSearchQuery(s);
                    setCoords(primeAreas[s]);
                    setSuggestions([]);
                  }}
                >
                  {s.replace(/([A-Z])/g, ' $1').trim()}
                </li>
              ))}
            </ul>
          )}
        </div>


        {coords.lat && (
          <p className="location-output">
            📍 Lat: {coords.lat.toFixed(4)} | Lon: {coords.lon.toFixed(4)}
          </p>
        )}

        <div className="range-slider">
          <label>
            Search Range: {range / 1000} km
            <input
              type="range"
              min="1000"
              max="10000"
              step="1000"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="category-filters">
          <h4 className="panel-title">Show Nearby:</h4>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`category-btn ${selectedType === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedType(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="right-panel">
        {!showMap ? (
          <div
            onClick={() => setShowMap(true)}
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1f2937, #111827)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: '500',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            👉 Tap to Open Map
          </div>
        ) : (
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={14}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{ height: '100%', width: '100%', borderRadius: '12px' }}
          >
            <ZoomControl position="bottomright" />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <MapUpdater lat={coords.lat} lon={coords.lon} />

            <Marker position={[coords.lat, coords.lon]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>

            {nearbyPlaces.map((place) => {
              const categoryIcon = new L.Icon({
                iconUrl: iconUrlMap[selectedType] || userIcon.options.iconUrl,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
              });

              return (
                <Marker key={place.id} position={[place.lat, place.lon]} icon={categoryIcon}>
                  <Popup><strong>{place.name}</strong></Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Home;
