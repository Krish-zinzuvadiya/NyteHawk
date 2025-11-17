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

/**
 * placeGroups structure:
 * - groupLabel: displayed heading
 * - items: array of { id, label, keyType, value, iconUrl }
 * keyType -> 'amenity' | 'shop' | 'leisure' etc (this will be used in Overpass query)
 */
const placeGroups = [
  {
    groupLabel: '🏧 Financial Services',
    items: [
      { id: 'atm', label: 'ATM', keyType: 'amenity', value: 'atm', iconUrl: '/Images/Icons/atm-machine.png' },
      { id: 'bank', label: 'Bank', keyType: 'amenity', value: 'bank', iconUrl: '/Images/Icons/bank.png' },
    ],
  },
  {
    groupLabel: '🏥 Medical Services',
    items: [
      { id: 'hospital', label: 'Hospital', keyType: 'amenity', value: 'hospital', iconUrl: '/Images/Icons/hospital.png' },
      { id: 'clinic', label: 'Clinic', keyType: 'amenity', value: 'clinic', iconUrl: '/Images/Icons/clinic.png' },
      { id: 'pharmacy', label: 'Pharmacy', keyType: 'amenity', value: 'pharmacy', iconUrl: '/Images/Icons/drugstore.png' },
      { id: 'doctor', label: 'Doctor', keyType: 'amenity', value: 'doctors', iconUrl: '/Images/Icons/doctor.png' },
      { id: 'dentist', label: 'Dentist', keyType: 'amenity', value: 'dentist', iconUrl: '/Images/Icons/dental-checkup.png' },
    ],
  },
  {
    groupLabel: '🍽 Food & Drinks',
    items: [
      { id: 'restaurant', label: 'Restaurant', keyType: 'amenity', value: 'restaurant', iconUrl: '/Images/Icons/restaurant-building.png' },
      { id: 'fast_food', label: 'Fast Food', keyType: 'amenity', value: 'fast_food', iconUrl: '/Images/Icons/fast-food.png' },
      { id: 'cafe', label: 'Café', keyType: 'amenity', value: 'cafe', iconUrl: '/Images/Icons/cafe.png' },
      { id: 'ice_cream', label: 'Ice Cream', keyType: 'amenity', value: 'ice_cream', iconUrl: '/Images/Icons/ice-cream.png' },
    ],
  },
  {
    groupLabel: '🛒 Shopping',
    items: [
      { id: 'supermarket', label: 'Supermarket', keyType: 'shop', value: 'supermarket', iconUrl: '/Images/Icons/big-market.png' },
      { id: 'grocery', label: 'Grocery (Convenience)', keyType: 'shop', value: 'convenience', iconUrl: '/Images/Icons/grocery.png' },
      { id: 'bakery', label: 'Bakery', keyType: 'shop', value: 'bakery', iconUrl: '/Images/Icons/bakery-shop.png' },
    ],
  },
  {
    groupLabel: '⛽ Transport & Fuel',
    items: [
      { id: 'fuel', label: 'Fuel Station', keyType: 'amenity', value: 'fuel', iconUrl: '/Images/Icons/gas-pump.png' },
      { id: 'bus_station', label: 'Bus Station', keyType: 'amenity', value: 'bus_station', iconUrl: '/Images/Icons/bus-stop.png' },
      { id: 'taxi', label: 'Taxi Stand', keyType: 'amenity', value: 'taxi', iconUrl: '/Images/Icons/taxi-stand.png' },
      { id: 'parking', label: 'Parking', keyType: 'amenity', value: 'parking', iconUrl: '/Images/Icons/parking-area.png' },
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
      { id: 'park', label: 'Park', keyType: 'leisure', value: 'park', iconUrl: '/Images/Icons/park.png' },
      { id: 'stadium', label: 'Stadium', keyType: 'leisure', value: 'stadium', iconUrl: '/Images/Icons/stadium.png' },
      { id: 'garden', label: 'Garden', keyType: 'leisure', value: 'garden', iconUrl: '/Images/Icons/street-lamp.png' },
    ],
  },
];

// fallback icon if none defined
const fallbackIconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';

// helper to build Leaflet icon for category
const getCategoryIcon = (iconUrl) =>
  new L.Icon({
    iconUrl: iconUrl || fallbackIconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
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
  // selectedType will be an object: { keyType, value, label, iconUrl, id }
  const [selectedType, setSelectedType] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [range, setRange] = useState(5000);
  const [showMap, setShowMap] = useState(false);
  const [openGroups, setOpenGroups] = useState({}); // track collapsible groups
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Auto-suggest handler (primeAreas)
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

  // Handle search button
  const handleSearch = async () => {
    const areaMatch = Object.keys(primeAreas).find(
      (a) => a.toLowerCase() === searchQuery.toLowerCase()
    );

    if (areaMatch) {
      setCoords(primeAreas[areaMatch]);
      setNearbyPlaces([]);
      setSelectedType(null);
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

  // Toggle group collapse
  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Build Overpass query depending on keyType (amenity/shop/leisure)
  const buildOverpassQuery = (keyType, value, lat, lon, aroundMeters) => {
    // If keyType is amenity/shop/leisure, query those tags
    // Also attempt to include both node and way and relation and request center
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

 const getPlaceName = (tags, type) => {
  // Check for any available name
  const name =
    tags?.name ||
    tags?.['name:en'] ||
    tags?.brand ||
    tags?.operator ||
    tags?.official_name;

  if (name) return name; // Use actual name if exists

  // Special fallback for parking only
  if (type === 'parking' || tags?.amenity === 'parking') return 'Parking Area';

  // Default fallback
  return 'Unnamed';
};



  // Fetch nearby places when selectedType changes
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
          .map((el) => ({
            id: `${el.type}-${el.id}`,
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            name: getPlaceName(el.tags,selectedType),
            tags: el.tags || {},
          }))
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

  // Helper for selecting an item
  const handleSelectItem = (item) => {
    setSelectedType(item);
    // open map automatically so user sees results
    setShowMap(true);
    // clear previous markers while loading
    setNearbyPlaces([]);
  };

  // Render - left panel placements: grouped collapsible list
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

          {placeGroups.map((group) => (
  <div key={group.groupLabel} className="place-group">
    <div
      className={`group-header ${openGroups[group.groupLabel] ? 'open' : ''}`}
      onClick={() => toggleGroup(group.groupLabel)}
    >
      <strong>{group.groupLabel}</strong>
      <span className="toggle-icon">{openGroups[group.groupLabel] ? '−' : '+'}</span>
    </div>

    <div
      className={`group-items ${openGroups[group.groupLabel] ? 'open' : ''}`}
    >
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
            {/* Small status overlay on map */}
            

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
