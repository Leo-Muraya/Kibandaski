import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KFC from './components/KFC';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/kfc" element={<KFC />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
