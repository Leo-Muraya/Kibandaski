import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import KFC from './components/KFC';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <nav className="bg-white shadow p-4 flex justify-between">
            <Link to="/" className="font-bold text-xl">🍗 KFC</Link>
            <Link to="/cart" className="text-blue-500">View Cart</Link>
          </nav>
          <Routes>
            <Route path="/" element={<KFC />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
