import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import RestaurantPage from './Restaurantpage';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Add this import
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authToken');
    if (userData && token) {
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  return (
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUp setUser={setUser} />} />
      
      {/* Protected Routes */}
      {user && (
        <>
          <Route path="/home" element={<Homepage user={user} handleLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout user={user} />} /> {/* Add Checkout route */}
        </>
      )}

      {/* Redirects */}
      <Route path="/" element={
        user ? <Navigate to="/home" /> : <Navigate to="/login" />
      } />
      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
    </Routes>
  );
};

export default App;