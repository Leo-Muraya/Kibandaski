import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkoutOrder, fetchActiveCart } from '../api'; 

const Checkout = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    paymentMethod: 'credit_card'
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetchActiveCart();
        setCartItems(response.items);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
    loadCart();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        delivery_address: `${formData.address}, ${formData.city}`,
        payment_method: formData.paymentMethod,
        items: cartItems.map(item => ({
          food_item_id: item.id,
          quantity: item.quantity
        })
      )};

      const response = await checkoutOrder(orderData);
      
      if (response.success) {
        navigate('/order-confirmation', {
          state: {
            orderId: response.order.id,
            total: response.order.total,
            estimatedDelivery: response.order.estimated_delivery
          }
        });
      }
    } catch (err) {
      setError(err.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component remains the same...
};

export default Checkout;