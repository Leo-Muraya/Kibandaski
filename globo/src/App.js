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

  return (
    <Routes>
      {/* Login route */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      
      {/* Signup route */}
      <Route path="/signup" element={<SignUp setUser={setUser} />} />
      
      {/* Homepage route */}
      <Route
        path="/home"
        element={user ? <Homepage user={user} /> : <Navigate to="/login" />}
      />
      
      {/* Profile route */}
      <Route
        path="/profile"
        element={user ? <Profile user={user} /> : <Navigate to="/login" />}
      />
      
      {/* Default route - redirect to login if not logged in */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
