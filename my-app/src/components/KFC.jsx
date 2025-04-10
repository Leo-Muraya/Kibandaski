import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KFC() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const menu = [
    { name: 'Zinger Burger', price: 450 },
    { name: 'Bucket Chicken', price: 1200 },
    { name: 'Fries', price: 200 },
  ];

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const goToCart = () => {
    navigate('/cart', {
      state: {
        cartItems,
        restaurant: 'KFC'
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🍗 KFC Menu</h1>
      <ul className="space-y-4">
        {menu.map((item, index) => (
          <li key={index} className="border p-4 rounded flex justify-between">
            <span>{item.name} - Ksh {item.price}</span>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>

      <button 
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={goToCart}
      >
        View Cart
      </button>
    </div>
  );
}

export default KFC;
