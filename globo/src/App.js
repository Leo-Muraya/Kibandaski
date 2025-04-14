import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from './components/Profile';  // New Profile Component
=======
import RestaurantPage from './Restaurantpage'; 
import { RestaurantDetail } from './components/RestrauntDetails';
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
import Profile from './components/Profile';
import RestaurantPage from './Restaurantpage'; // Add this
import Cart from './components/Cart'; // Add this
import './App.css'; // Add this at the top
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

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
    <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
      {/* Login route */}
=======
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/signup" element={<SignUp setUser={setUser} />} />
      
<<<<<<< HEAD
      {/* Signup route */}
      <Route path="/signup" element={<SignUp setUser={setUser} />} /> {/* Pass setUser here */}
      
      {/* Homepage route */}
      <Route
        path="/home"
        element={user ? <Homepage user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />}
      />
      
      {/* Profile route */}
      <Route
        path="/profile"
        element={user ? <Profile user={user} /> : <Navigate to="/login" />}
      />
      
      {/* Default route - redirect to home if logged in, or login if not logged in */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
=======
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} /> 
      <Route path="/restaurant/:id/menu" element={<RestaurantDetail/>} />
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
      {/* Protected Routes */}
      {user && (
        <>
          <Route path="/home" element={<Homepage user={user} handleLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/restaurants/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<Cart />} />
        </>
      )}

      {/* Redirects */}
      <Route path="/" element={
        user ? <Navigate to="/home" /> : <Navigate to="/login" />
      } />
      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
    </Routes>
  );
};

export default App;