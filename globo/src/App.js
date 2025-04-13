import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Profile from './components/Profile';  // New Profile Component

const App = () => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in on app load
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Handle user login and store the data in localStorage
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
  };

  // Handle user logout and remove from localStorage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      
      {/* Signup route */}
      <Route path="/signup" element={<SignUp setUser={setUser} />} /> {/* Pass setUser here */}
      
      {/* Homepage route, redirect to login if no user */}
      <Route
        path="/home"
        element={user ? <Homepage user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />}
      />
      
      {/* Profile route, redirect to login if no user */}
      <Route
        path="/profile"
        element={user ? <Profile user={user} /> : <Navigate to="/login" />}
      />
      
      {/* Default route - redirect to home if logged in, or login if not logged in */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
