import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const TrackDelivery = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user's geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          setError('Failed to get your location.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation not supported by your browser.');
    }
  }, []);

  const fetchDeliveryLocation = async () => {
    try {
      const response = await fetch('http://localhost:3000/deliveries/3001');
      const data = await response.json();

      if (data.currentLocation) {
        const { lat, lng } = data.currentLocation;
        setDeliveryLocation([lat, lng]);
        setError(null);
      } else {
        setError('Delivery location not available.');
      }
    } catch (err) {
      setError('Failed to fetch delivery location.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoute = async (start, end) => {
    const apiKey = 'b707cfd62b5a46d095806ae39ada73b8'; 
    const waypoints = `${start[0]}%2C${start[1]}%7C${end[0]}%2C${end[1]}`;
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (result.features && result.features.length > 0) {
        const coords = result.features[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);
        setRouteCoords(coords);
      } else {
        setError('No route data found.');
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      setError('Failed to fetch route information.');
    }
  };

  // Periodically update delivery location
  useEffect(() => {
    fetchDeliveryLocation();
    const interval = setInterval(fetchDeliveryLocation, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userLocation && deliveryLocation) {
      fetchRoute(userLocation, deliveryLocation);
    }
  }, [userLocation, deliveryLocation]);

  return (
    <div>
      <h1>Track Your Delivery</h1>
      {isLoading && <p>Loading delivery location...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userLocation && deliveryLocation ? (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=b707cfd62b5a46d095806ae39ada73b8`}
            attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors & OpenStreetMap'
          />

          {/* User Location Marker */}
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>

          {/* Delivery Location Marker */}
          <Marker position={deliveryLocation}>
            <Popup>Delivery Location</Popup>
          </Marker>

          {/* Route between locations */}
          {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
        </MapContainer>
      ) : (
        <p>Waiting for location data...</p>
      )}
    </div>
  );
};

export default TrackDelivery;
