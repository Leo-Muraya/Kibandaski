import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, processCheckout } = useCart(); // Get cart context and processCheckout function
  const navigate = useNavigate(); // Initialize navigate
  const [orderDetails, setOrderDetails] = useState({
    deliveryAddress: '',
    paymentMethod: 'Credit Card', // Default payment method
  });

  // If cart is empty or undefined, show an appropriate message
  if (!cart || cart.length === 0) {
    return (
      <div>
        <h2>Your cart is empty. Please add items to your cart before proceeding to checkout.</h2>
        <button
          onClick={() => navigate('/home')}
          style={{
            padding: '1rem',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Go Back to Homepage
        </button>
      </div>
    );
  }

  // Handle form submission and checkout processing
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Process checkout with order details
    processCheckout(orderDetails);

    // Redirect to order status page (you can replace this with actual navigation logic)
    navigate('/order-status');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <label>
          Delivery Address:
          <input
            type="text"
            value={orderDetails.deliveryAddress}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, deliveryAddress: e.target.value })
            }
            required
            placeholder="Enter your delivery address"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '5px',
              marginTop: '0.5rem',
              border: '1px solid #ddd',
            }}
          />
        </label>
        <br />
        <label>
          Payment Method:
          <select
            value={orderDetails.paymentMethod}
            onChange={(e) =>
              setOrderDetails({ ...orderDetails, paymentMethod: e.target.value })
            }
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '5px',
              marginTop: '0.5rem',
              border: '1px solid #ddd',
            }}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </label>
        <br />
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#2ecc71',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginTop: '1rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Proceed to Payment
        </button>
      </form>

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
    </div>
  );
};

export default Checkout;
