// CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Create a custom hook to use the cart
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null); // Store order information for checkout

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Clear the cart after successful checkout
  const clearCart = () => {
    setCart([]);
  };

  // Process the checkout (could include payment processing, order confirmation, etc.)
  const processCheckout = (orderDetails) => {
    // For now, just simulate an order being placed
    setOrder({ ...orderDetails, status: 'Pending', date: new Date() });
    clearCart(); // Clear cart after checkout
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        processCheckout,
        order, // Provide order info to components that need it (e.g., OrderStatus)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
