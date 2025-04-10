import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import RestaurantPage from './components/RestaurantPage'; // Import the RestaurantPage

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} /> {/* Dynamic route for restaurant */}
    </Routes>
  );
};

export default App;
