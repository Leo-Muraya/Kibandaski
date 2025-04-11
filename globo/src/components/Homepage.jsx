import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || { name: "Developer" };
    setUser(userData);
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/restaurants"); 
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        const data = await response.json();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#000",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#111",
          padding: "1rem 2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ color: "#ffd700", fontSize: "1.8rem", fontWeight: "bold" }}>
          Kimbandaski
        </h1>
        <img
          src="https://img.icons8.com/ios/452/fast-food.png"
          alt="Fast food icon"
          style={{ width: "30px", height: "30px", marginLeft: "10px" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {user ? (
            <>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  backgroundColor: "#ffd700",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <span style={{ color: "#ccc" }}>Loading...</span>
          )}
        </div>
      </header>

      {/* Loading */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>Loading restaurants...</p>
      ) : (
        // Restaurant Cards
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(255,255,255,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  position: "relative",
                  height: "180px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "5px",
                    fontSize: "0.8rem",
                  }}
                >
                  {restaurant.status}
                </span>
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", color: "#fff" }}>
                  {restaurant.name}
                </h3>
                <p style={{ margin: "0.3rem 0", color: "#ccc" }}>
                  {restaurant.location}
                </p>
                <p style={{ margin: "0.3rem 0", color: "#ccc" }}>
                  ⭐ {restaurant.rating.toFixed(1)}
                </p>
                <Link
                  to={`/restaurant/${restaurant.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    backgroundColor: "#ffd700",
                    color: "#000",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          padding: "2rem 0",
          color: "#777",
          fontSize: "0.9rem",
        }}
      >
        <p>© 2025 Kibandaski App</p>
      </footer>
    </div>
  );
};

export default Homepage;
