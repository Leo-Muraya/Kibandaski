import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on initial render
  useEffect(() => {
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount));
    }
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem('cartCount', count.toString());
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};