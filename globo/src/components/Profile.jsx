<<<<<<< HEAD
import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));  //retrieve user info from localStorage
  
  if (!user) {
    return null;  //returns nothing if the user is not logged in
  }

  return (
    <div className="profile-tab">
      <span>Welcome, {user.name}</span>
=======
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api'; // Fixed import name to match your API.js

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(); // Changed to match API.js export
        setProfile(data.user);
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Failed to load profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-orange-100 p-4 rounded-full">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile?.username || 'Anonymous User'}
            </h2>
            <p className="text-gray-600">{profile?.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Order History */}
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border-b border-orange-100 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  {order.timestamp ? 
                    new Date(order.timestamp).toLocaleDateString() : 
                    'Date not available'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {order.status || 'Unknown status'}
                </span>
              </div>
              <p className="text-gray-800">
                Total: Ksh {order.total_price?.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        )}
      </div>
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
    </div>
  );
};

<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
