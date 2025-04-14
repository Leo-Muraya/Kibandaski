import React from 'react';
import { addToCart } from '../api';

const CardButton = ({ foodItemId, restaurantId }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(foodItemId);
      alert('Item added to cart!');
    } catch (error) {
      alert(error.message);
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      Add
    </button>
  );
};

export default CardButton;