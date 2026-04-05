// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* -------------------------
   Prime areas (your list)
   ------------------------- */
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

/* -------------------------
   Icons
   ------------------------- */
// default blue marker (user / searched location)
const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// green marker for live location using an inline SVG via DivIcon (keeps it crisp)
const greenSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42">
    <path d="M14 0C8 0 3 5 3 11c0 9.1 11 31 11 31s11-21.9 11-31C25 5 20 0 14 0z" fill="#10b981"/>
    <circle cx="14" cy="11" r="4.5" fill="white"/>
  </svg>
`);
const liveIcon = L.divIcon({
  html: `<img src="data:image/svg+xml;utf8,${greenSvg}" style="display:block" />`,
  className: '',
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
});

/* -------------------------
   Place groups (your list)
   ------------------------- */
const placeGroups = [
  {
    groupLabel: '🏧 Financial Services',
    items: [
      { id: 'atm', label: 'ATM', keyType: 'amenity', value: 'atm', iconUrl: '/images/Icons/atm-machine.png' },
      { id: 'bank', label: 'Bank', keyType: 'amenity', value: 'bank', iconUrl: '/images/Icons/bank.png' },
    ],
  },
  {
    groupLabel: '🏥 Medical Services',
    items: [
      { id: 'hospital', label: 'Hospital', keyType: 'amenity', value: 'hospital', iconUrl: '/images/Icons/hospital.png' },
      { id: 'clinic', label: 'Clinic', keyType: 'amenity', value: 'clinic', iconUrl: '/images/Icons/clinic.png' },
      { id: 'pharmacy', label: 'Pharmacy', keyType: 'amenity', value: 'pharmacy', iconUrl: '/images/Icons/drugstore.png' },
      { id: 'doctor', label: 'Doctor', keyType: 'amenity', value: 'doctors', iconUrl: '/images/Icons/doctor.png' },
      { id: 'dentist', label: 'Dentist', keyType: 'amenity', value: 'dentist', iconUrl: '/images/Icons/dental-checkup.png' },
    ],
  },
  {
    groupLabel: '🍽 Food & Drinks',
    items: [
      { id: 'restaurant', label: 'Restaurant', keyType: 'amenity', value: 'restaurant', iconUrl: '/images/Icons/restaurant-building.png' },
      { id: 'fast_food', label: 'Fast Food', keyType: 'amenity', value: 'fast_food', iconUrl: '/images/Icons/fast-food.png' },
      { id: 'cafe', label: 'Café', keyType: 'amenity', value: 'cafe', iconUrl: '/images/Icons/cafe.png' },
      { id: 'ice_cream', label: 'Ice Cream', keyType: 'amenity', value: 'ice_cream', iconUrl: '/images/Icons/ice-cream.png' },
    ],
  },
  {
    groupLabel: '🛒 Shopping',
    items: [
      { id: 'supermarket', label: 'Supermarket', keyType: 'shop', value: 'supermarket', iconUrl: '/images/Icons/big-market.png' },
      { id: 'grocery', label: 'Grocery (Convenience)', keyType: 'shop', value: 'convenience', iconUrl: '/images/Icons/grocery.png' },
      { id: 'bakery', label: 'Bakery', keyType: 'shop', value: 'bakery', iconUrl: '/images/Icons/bakery-shop.png' },
    ],
  },
  {
    groupLabel: '⛽ Transport & Fuel',
    items: [
      { id: 'fuel', label: 'Fuel Station', keyType: 'amenity', value: 'fuel', iconUrl: '/images/Icons/gas-pump.png' },
      { id: 'bus_station', label: 'Bus Station', keyType: 'amenity', value: 'bus_station', iconUrl: '/images/Icons/bus-stop.png' },
      { id: 'taxi', label: 'Taxi Stand', keyType: 'amenity', value: 'taxi', iconUrl: '/images/Icons/taxi-stand.png' },
      { id: 'parking', label: 'Parking', keyType: 'amenity', value: 'parking', iconUrl: '/images/Icons/parking-area.png' },
    ],
  },
  {
    groupLabel: '🏢 Public & Government',
    items: [
      { id: 'police', label: 'Police Station', keyType: 'amenity', value: 'police', iconUrl: '/images/Icons/police-station.png' },
      { id: 'fire_station', label: 'Fire Station', keyType: 'amenity', value: 'fire_station', iconUrl: '/images/Icons/fire-station.png' },
      { id: 'post_office', label: 'Post Office', keyType: 'amenity', value: 'post_office', iconUrl: '/images/Icons/post-office.png' },
    ],
  },
  {
    groupLabel: '🌳 Recreation',
    items: [
      { id: 'park', label: 'Park', keyType: 'leisure', value: 'park', iconUrl: '/images/Icons/park.png' },
      { id: 'stadium', label: 'Stadium', keyType: 'leisure', value: 'stadium', iconUrl: '/images/Icons/stadium.png' },
      { id: 'garden', label: 'Garden', keyType: 'leisure', value: 'garden', iconUrl: '/images/Icons/street-lamp.png' },
    ],
  },
];

/* fallback icon */
const fallbackIconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';

/* helper to build category icon */
const getCategoryIcon = (iconUrl) =>
  new L.Icon({
    iconUrl: iconUrl || fallbackIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });

/* Map updater (keeps map centering reactively) */
const MapUpdater = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 15);
    }
  }, [lat, lon, map]);
  return null;
};

/* Helper to determine place name */
const getPlaceName = (tags = {}, fallbackType = '') => {
  const name =
    tags?.name ||
    tags?.['name:en'] ||
    tags?.brand ||
    tags?.operator ||
    tags?.official_name;

  if (name) return name;
  if (fallbackType === 'parking' || tags?.amenity === 'parking') return 'Parking Area';
  return 'Unnamed';
};

/* -------------------------
   Component
   ------------------------- */
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [coords, setCoords] = useState({ lat: 23.0225, lon: 72.5714 }); // default Ahmedabad center
  const [selectedType, setSelectedType] = useState(null); // object from placeGroups
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [range, setRange] = useState(5000);
  const [showMap, setShowMap] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Live location state
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  /* Auto-suggest using primeAreas keys */
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const matchedAreas = Object.keys(primeAreas).filter((area) =>
      area.toLowerCase().includes(q)
    );
    setSuggestions(matchedAreas);
  }, [searchQuery]);

  /* Search handler (prime area exact match or pincode) */
  const handleSearch = async () => {
    const areaMatch = Object.keys(primeAreas).find(
      (a) => a.toLowerCase() === searchQuery.toLowerCase()
    );

    if (areaMatch) {
      setCoords(primeAreas[areaMatch]);
      setNearbyPlaces([]);
      setSelectedType(null);
      setShowMap(true);
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
          setSelectedType(null);
          setShowMap(true);
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

  /* Toggle collapsible groups */
  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  /* Build Overpass query for selected type */
  const buildOverpassQuery = (keyType, value, lat, lon, aroundMeters) => {
    const tag = `${keyType}="${value}"`;
    return `
      [out:json][timeout:25];
      (
        node[${tag}](around:${aroundMeters},${lat},${lon});
        way[${tag}](around:${aroundMeters},${lat},${lon});
        relation[${tag}](around:${aroundMeters},${lat},${lon});
      );
      out center;
    `;
  };

  /* Fetch places when selectedType or coords or range changes */
  useEffect(() => {
    if (!selectedType || !coords.lat || !coords.lon) return;

    const { keyType, value } = selectedType;
    const query = buildOverpassQuery(keyType, value, coords.lat, coords.lon, range);

    const fetchData = async () => {
      setLoadingPlaces(true);
      try {
        const res = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        const points = (data.elements || [])
          .map((el) => {
            const lat = el.lat || el.center?.lat;
            const lon = el.lon || el.center?.lon;
            const fallbackType = el.tags?.amenity || el.tags?.shop || el.tags?.leisure || '';
            return {
              id: `${el.type}-${el.id}`,
              lat,
              lon,
              name: getPlaceName(el.tags, fallbackType),
              tags: el.tags || {},
            };
          })
          .filter((el) => el.lat && el.lon);

        setNearbyPlaces(points);
        setLastFetchTime(new Date());
      } catch (err) {
        console.error('Error fetching Overpass data:', err);
        setNearbyPlaces([]);
        setLastFetchTime(new Date());
      } finally {
        setLoadingPlaces(false);
      }
    };

    fetchData();
  }, [selectedType, coords, range]);

  /* Select a category item */
  const handleSelectItem = (item) => {
    setSelectedType(item);
    setShowMap(true);
    setNearbyPlaces([]); // clear while loading
  };

  /* Live location function */
  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
        setCoords({ lat: latitude, lon: longitude }); // center on live location
        setShowMap(true);

        setLocationError('⚠ Live location accuracy may vary on Laptop/Desktop devices.');
        setTimeout(() => setLocationError(''), 5000);
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Unable to fetch your location. Please enable GPS and allow permission.');
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );
  };

  /* Helper to display a small overlay on the map when live location exists */
  const LiveLocationOverlay = ({ message }) => {
    if (!message) return null;
    return (
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 9999,
          background: '#f59e0b',
          color: '#111827',
          padding: '6px 10px',
          borderRadius: 8,
          fontSize: 13,
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
        }}
      >
        {message}
      </div>
    );
  };

  /* -------------------------
     Render
     ------------------------- */
  return (
    <div className="home-grid">
      {/* LEFT PANEL */}
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
              className="search-input"
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
                    setSelectedType(null);
                    setNearbyPlaces([]);
                    setShowMap(true);
                  }}
                >
                  {s.replace(/([A-Z])/g, ' $1').trim()}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Live location button */}
        <button
          className="search-btn"
          onClick={getLiveLocation}
          style={{ background: '#10b981', marginTop: 8 }}
        >
          📍 Use Live Location
        </button>

        {locationError && (
          <p style={{ color: '#fbbf24', fontSize: '0.85rem', marginTop: '6px' }}>
            {locationError}
          </p>
        )}

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

          {placeGroups.map((group) => (
            <div key={group.groupLabel} className="place-group">
              <div
                className={`group-header ${openGroups[group.groupLabel] ? 'open' : ''}`}
                onClick={() => toggleGroup(group.groupLabel)}
              >
                <strong>{group.groupLabel}</strong>
                <span className="toggle-icon">{openGroups[group.groupLabel] ? '−' : '+'}</span>
              </div>

              <div className={`group-items ${openGroups[group.groupLabel] ? 'open' : ''}`}>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className={`place-btn ${selectedType?.id === item.id ? 'active' : ''}`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <img src={item.iconUrl} alt="" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
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
          <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            {/* optional warning overlay if live location message exists */}
            <LiveLocationOverlay message={locationError} />

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

              {/* Keep MapUpdater inside MapContainer (safe use of useMap) */}
              <MapUpdater lat={coords.lat} lon={coords.lon} />

              {/* Searched / selected location (blue marker) */}
              <Marker position={[coords.lat, coords.lon]} icon={userIcon}>
                <Popup>Selected Location</Popup>
              </Marker>

              {/* Live GPS marker (green) - only inside the MapContainer */}
              {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lon]} icon={liveIcon}>
                  <Popup>Your Live Location</Popup>
                </Marker>
              )}

              {/* Nearby places returned from Overpass (category icons) */}
              {nearbyPlaces.map((place) => {
                const iconToUse = selectedType?.iconUrl || fallbackIconUrl;
                const categoryIcon = getCategoryIcon(iconToUse);

                return (
                  <Marker key={place.id} position={[place.lat, place.lon]} icon={categoryIcon}>
                    <Popup>
                      <div style={{ minWidth: 160 }}>
                        <strong>{place.name}</strong>
                        {place.tags && Object.keys(place.tags).length > 0 && (
                          <div style={{ marginTop: 6, fontSize: 12 }}>
                            {place.tags['amenity'] && <div>Amenity: {place.tags['amenity']}</div>}
                            {place.tags['shop'] && <div>Shop: {place.tags['shop']}</div>}
                            {place.tags['operator'] && <div>Operator: {place.tags['operator']}</div>}
                            {place.tags['brand'] && <div>Brand: {place.tags['brand']}</div>}
                            {place.tags['addr:street'] && <div>Street: {place.tags['addr:street']}</div>}
                          </div>
                        )}
                        <div style={{ marginTop: 8 }}>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Directions
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
