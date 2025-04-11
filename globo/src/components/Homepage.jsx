import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = { name: "Developer" };
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const restaurants = [
    {
      id: 1,
      name: "Dau Swahili Restaurant",
      location: "Nairobi, Kingari Rd",
      image: "https://tb-static.uber.com/prod/image-proc/processed_images/6019d977e4bb79ccbf79ada572a36d83/16bb0a3ab8ea98cfe8906135767f7bf4.webp",
      rating: 4.6,
      status: "Closed",
    },
    {
      id: 2,
      name: "Exodus Restaurant",
      location: "Nairobi, Plaza Jay",
      image: "https://multiculturalcookingnetwork.wordpress.com/wp-content/uploads/2011/11/p1020869.jpg",
      rating: 4.5,
      status: "Closed",
    },
    {
      id: 3,
      name: "Khum Indian Cuisine",
      location: "Nairobi, Waiyaki Way",
      image: "https://www.holidify.com/images/cmsuploads/compressed/pexels-chan-walrus-958546_20220913211343.jpg",
      rating: 4.7,
      status: "Closed",
    },
    {
      id: 4,
      name: "Java Restaurant",
      location: "Nairobi, Westlands",
      image: "https://simpauldesign.com/wp-content/uploads/2013/08/ark-java-rebrand-sign-1024x576.jpg",
      rating: 4.8,
      status: "Closed",
    },
    {
      id: 5,
      name: "KFC",
      location: "Nairobi, Ngong Road",
      image: "https://www.kbc.co.ke/wp-content/uploads/2025/02/c06e8d80-ee5b-11ef-b6fa-754ab8d47afb.jpg.webp",
      rating: 4.2,
      status: "Closed",
    },
  ];

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

      {/* Restaurant Cards */}
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
