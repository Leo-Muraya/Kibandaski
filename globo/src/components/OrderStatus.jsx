import React, { useState, useEffect } from 'react';

const OrderStatus = () => {
  const [status, setStatus] = useState('Processing');
  
  useEffect(() => {
    const timer = setInterval(() => {
      //status simulation
      if (status === 'Processing') setStatus('Out for Delivery');
      else if (status === 'Out for Delivery') setStatus('Delivered');
    }, 5000);

    return () => clearInterval(timer); 
  }, [status]);

  return (
    <div>
      <h2>Order Status</h2>
      <p>Your order is: {status}</p>
    </div>
  );
};

export default OrderStatus;
