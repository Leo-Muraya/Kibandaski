import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import RestaurantPage from './Restaurantpage'; 
import { RestaurantDetail } from './components/RestrauntDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/restaurant/:id" element={<RestaurantPage />} /> 
      <Route path="/restaurant/:id/menu" element={<RestaurantDetail/>} />
    </Routes>
  );
};

export default App;
