// AdminPanel.js
import React, { useState, useEffect } from 'react';
import { 
  adminCreateRestaurant, 
  adminDeleteRestaurant,
  fetchRestaurants
} from '../api';

const AdminPanel = ({ user }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New restaurant form state
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    location: '',
    image: ''
  });

  // Fetch all restaurants on load
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    try {
      const createdRestaurant = await adminCreateRestaurant(newRestaurant);
      setRestaurants([...restaurants, createdRestaurant]);
      setNewRestaurant({ name: '', location: '', image: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await adminDeleteRestaurant(id);
        setRestaurants(restaurants.filter(r => r.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Admin Access Required
          </h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Add Restaurant Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Restaurant</h2>
        <form onSubmit={handleAddRestaurant} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Restaurant Name
            </label>
            <input
              id="name"
              type="text"
              value={newRestaurant.name}
              onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={newRestaurant.location}
              onChange={(e) => setNewRestaurant({...newRestaurant, location: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              type="url"
              value={newRestaurant.image}
              onChange={(e) => setNewRestaurant({...newRestaurant, image: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Add Restaurant
          </button>
        </form>
      </div>

      {/* Restaurant Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Restaurants</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading restaurants...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No restaurants found</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.location}</p>
                </div>
                <button
                  onClick={() => handleDeleteRestaurant(restaurant.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete Restaurant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;