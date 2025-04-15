import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart items and remove function from context
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRemove = (itemId) => {
    removeFromCart(itemId); // Call remove from cart when an item is removed
  };

  const handleCheckout = () => {
    // Redirect to the checkout page
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return <h2>Your cart is empty!</h2>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Cart</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={item.image} // Food item image
              alt={item.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h3>{item.name}</h3>
            <p>KES {item.price}</p>
            <button
              onClick={() => handleRemove(item.id)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#e74c3c',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Remove from Cart
            </button>
          </div>
        ))}
      </div>

      {/* Display total price */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3>
          Total: KES{' '}
          {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </h3>
      </div>

      {/* Checkout Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={handleCheckout}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
