import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const RestaurantMenu = () => {
  const { restaurant_id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
    const itemInCart = menuItems.find((menuItem) => menuItem.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
      addToCart(itemInCart);
    } else {
      addToCart({ ...item, quantity: 1 });
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Restaurant Menu Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#f39c9c",
          borderBottom: "1px solid #ddd",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #fff",
            backgroundColor: "#fff",
            color: "#333",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </button>
  
        {/* Centered Brand with Logo */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/ffffff/restaurant.png"
              alt="Restaurant Icon"
              style={{ width: "25px", height: "25px" }}
            />
            <h1
              style={{
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Kibandaski
            </h1>
          </div>
          <p style={{ fontSize: "0.9rem", color: "#fff", marginTop: "4px" }}>
            Eat Fresh, Eat Fast!
          </p>
        </div>
  
        {/* Cart Button */}
        <div>
          <button
            onClick={() => navigate("/cart")}
            style={{
              border: "2px solid #fff",
              background: "#fff",
              color: "#f39c9c",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.borderColor = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.color = "#f39c9c";
              e.currentTarget.style.borderColor = "#fff";
            }}
          >
            🛒 Cart
          </button>
        </div>
      </div>
  
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
        <h1
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "1rem 2rem",
            borderRadius: "10px",
          }}
        >
          {restaurant.name}
        </h1>
      </div>
  
      {/* Restaurant Info */}
      <div style={{ marginBottom: "1.5rem", paddingLeft: "2rem" }}>
        <p style={{ fontSize: "1rem", margin: "0.5rem 0", color: "#7f8c8d" }}>
          <strong>Location:</strong>{" "}
          <span style={{ color: "#bdc3c7" }}>{restaurant.location}</span>
        </p>
        <p style={{ fontSize: "1rem", margin: "0.5rem 0", color: "#7f8c8d" }}>
          <strong>Rating:</strong>{" "}
          <span style={{ color: "#bdc3c7" }}>{restaurant.rating} ⭐</span>
        </p>
      </div>
  
      {/* Sort bar and Featured Label */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "0 2rem",
        }}
      >
        {/* Sort by Price Button */}
        <button
          onClick={() => console.log("Sort by price clicked!")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#eee";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#f9f9f9";
          }}
        >
          🔽 Sort by Price
        </button>
  
        {/* Featured Tag */}
        <div style={{ color: "#27ae60", fontWeight: "bold" }}>
          🌟 Featured on Kibandaski
        </div>
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            {item.price > 800 && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#e67e22",
                  color: "#fff",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "5px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                Top Pick ⭐
              </div>
            )}
  
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ marginBottom: "0.5rem", marginTop: "1rem" }}>{item.name}</h3>
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
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#e67e22")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f39c12")}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default RestaurantMenu;
