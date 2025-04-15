import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import Cart from './components/Cart'; // Import Cart component
import Checkout from './components/Checkout'; // Import Checkout component


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CartProvider> 
    <Router> 
      <Routes>
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  </CartProvider>
);
