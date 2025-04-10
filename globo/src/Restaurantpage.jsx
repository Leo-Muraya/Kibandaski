import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantPage = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Simulate fetching the restaurant's menu based on the id
    const getMenu = () => {
      // Hardcoded menu items based on restaurant id for now (this should be fetched from the backend)
      const restaurantMenu = {
        1: [
          { id: 1, name: 'Swahili Rice', price: 5.0 },
          { id: 2, name: 'Nyama Choma', price: 7.5 },
        ],
        2: [
          { id: 1, name: 'Exodus Special Pizza', price: 10.0 },
          { id: 2, name: 'Fried Chicken', price: 8.5 },
        ],
        3: [
          { id: 1, name: 'Butter Chicken', price: 9.0 },
          { id: 2, name: 'Paneer Tikka', price: 7.5 },
        ],
        4: [
          { id: 1, name: 'Java Coffee', price: 4.0 },
          { id: 2, name: 'Java Burger', price: 5.5 },
        ],
        5: [
          { id: 1, name: 'Chicken Bucket', price: 12.0 },
          { id: 2, name: 'French Fries', price: 3.0 },
        ],
      };

      setMenu(restaurantMenu[id] || []); // Set the menu for the current restaurant
    };

    getMenu();
  }, [id]); // Re-fetch the menu when the restaurant id changes

  return (
    <div className="restaurant-page">
      <h1>Restaurant Menu</h1>
      <ul>
        {menu.length > 0 ? (
          menu.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button>Add to Cart</button> {/* For now just a button, you can implement cart functionality later */}
            </li>
          ))
        ) : (
          <p>Loading menu...</p>
        )}
      </ul>
    </div>
  );
};

export default RestaurantPage;
