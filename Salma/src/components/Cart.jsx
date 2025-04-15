import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="border p-2 mb-2 rounded shadow-sm flex justify-between">
          <span>{item.name}</span>
          <span>Ksh {item.price}</span>
          <button onClick={() => removeFromCart(item)} className="text-red-500">Remove</button>
        </div>
      ))}
      <p className="mt-4 font-semibold">Total: Ksh {total}</p>
      <button
        onClick={() => navigate('/checkout')}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;
