import React, { useState, useEffect } from 'react';

const OrderStatus = () => {
  const [status, setStatus] = useState('Processing');
  
  useEffect(() => {
    // Here, you could integrate with an API that updates the status based on the order ID
    const timer = setInterval(() => {
      // Simulate status updates (this should be replaced with actual API logic)
      if (status === 'Processing') setStatus('Out for Delivery');
      else if (status === 'Out for Delivery') setStatus('Delivered');
    }, 5000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [status]);

  return (
    <div>
      <h2>Order Status</h2>
      <p>Your order is: {status}</p>
    </div>
  );
};

export default OrderStatus;
