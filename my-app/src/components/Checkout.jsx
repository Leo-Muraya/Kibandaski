import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Checkout() {
  const { cartItems } = useContext(CartContext);

  const handleOrderConfirm = () => {
    // You’d send a POST request to Flask backend here
    alert('Order Confirmed!');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="border p-2 mb-2 rounded">
          {item.name} - Ksh {item.price}
        </div>
      ))}
      <button
        onClick={handleOrderConfirm}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
