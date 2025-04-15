import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from '../CartContext';  

const RestaurantMenu = () => {
  const { restaurant_id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();  

  useEffect(() => {
    fetch(`http://localhost:5000/restaurants/${restaurant_id}/menu`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch menu");
        }
        return res.json();
      })
      .then((data) => {
        setRestaurant(data);
        setMenuItems(data.menu_items || []);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, [restaurant_id]);

  if (!restaurant) {
    return <h2 style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</h2>;
  }

  const handleAddToCart = (item) => {
    const itemInCart = menuItems.find(menuItem => menuItem.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
      addToCart(itemInCart);
    } else {
      addToCart({...item, quantity: 1});
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Restaurant Banner */}
      <div
        style={{
          backgroundImage: `url(${restaurant.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          borderRadius: "10px",
          marginBottom: "2rem",
          position: "relative",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "1rem 2rem", borderRadius: "10px" }}>
          {restaurant.name}
        </h1>
      </div>

      {/* Restaurant Info */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left", paddingLeft: "2rem" }}>
        <p style={{ fontSize: "1rem", margin: "0.5rem 0", color: "#7f8c8d" }}><strong>Location:</strong> <span style={{ fontSize: "0.95rem", color: "#bdc3c7" }}>{restaurant.location}</span></p>
        <p style={{ fontSize: "1rem", margin: "0.5rem 0", color: "#7f8c8d" }}>
          <strong>Rating:</strong> <span style={{ fontSize: "0.95rem", color: "#bdc3c7" }}>{restaurant.rating} ⭐</span>
        </p>
      </div>

      {/* Menu Items */}
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Menu</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            {/* Food Item Image */}
            <img
              src={item.image} 
              alt={item.name}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
            <h3 style={{ marginBottom: "0.5rem" }}>{item.name}</h3>
            <p style={{ fontWeight: "bold", color: "#2c3e50" }}>KES {item.price}</p>
            <button
              onClick={() => handleAddToCart(item)}  
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#f39c12",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + {/* For adding quantity */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
