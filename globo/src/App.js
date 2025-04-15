<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import RestaurantPage from './Restaurantpage'; 
import  RestaurantDetail  from './components/RestaurantDetails';
import DriverTracker from './components/DriverTracker';
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} /> 
      <Route path="/restaurant/:id/menu" element={<RestaurantDetail/>} />
      <Route path="/driver-tracker" element={<DriverTracker />} />  
    </Routes>
=======
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from './CartContext'; // Import CartProvider
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart'; // Import Cart component
import Checkout from './components/Checkout'; // Import Checkout component
import OrderStatus from './components/OrderStatus'; // Import OrderStatus component
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authToken'); // Check for token
    if (userData && token) {
      setUser(userData);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authToken', userData.token); // Store token
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken'); // Remove token
  };

  return (
    <CartProvider> {/* Wrap your routes with CartProvider */}
      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        
        {/* Protected Routes */}
        {user && (
          <>
            <Route path="/home" element={<Homepage user={user} handleLogout={handleLogout} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/restaurants/:restaurant_id/menu" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} /> {/* Cart Route */}
            <Route path="/checkout" element={<Checkout />} /> {/* Checkout Route */}
            <Route path="/order-status" element={<OrderStatus />} /> {/* Order Status Route */}
          </>
        )}

        {/* Redirects */}
        <Route path="/" element={
          user ? <Navigate to="/home" /> : <Navigate to="/login" />
        } />
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </CartProvider>
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
  );
};

export default App;
