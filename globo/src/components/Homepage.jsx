import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94

const Homepage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const restaurants = [
    { 
      id: 1, 
      name: "Dau Swahili Restaurant", 
      location: "Nairobi, Kingari Rd",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "/images/restaurant1.jpg"
    },
    // Add similar objects for other restaurants
  ];

  return (
    <div className="homepage-container">
      {/* Floating Navigation Bar */}
      <nav className="navbar">
        <Link to="/" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="nav-text">Home</span>
        </Link>
        
        <Link to="/search" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="nav-text">Search</span>
        </Link>

        <Link to="/orders" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="nav-text">Orders</span>
        </Link>

        <div className="nav-item" onClick={handleLogout}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="nav-text">Logout</span>
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
        </div>
      </nav>

<<<<<<< HEAD
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
=======
      {/* Main Content */}
      <div className="main-content">
        {/* User Profile Header */}
        <div className="profile-header">
          <h1 className="welcome-message">
            Good morning, {user?.name}
            <span role="img" aria-label="hand-wave">👋</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search restaurants or dishes..."
          />
          <svg className="search-icon" viewBox="0 0 24 24">
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
          </svg>
        </div>

        {/* Restaurant List */}
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img 
                src={restaurant.image} 
                className="restaurant-image" 
                alt={restaurant.name} 
              />
              <div className="restaurant-info">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <div className="restaurant-meta">
                  <span className="rating">⭐ {restaurant.rating}</span>
                  <span className="delivery-time">{restaurant.deliveryTime}</span>
                </div>
                <p className="restaurant-location">{restaurant.location}</p>
                <Link 
                  to={`/restaurant/${restaurant.id}`} 
                  className="view-menu-btn"
                >
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
    </div>
  );
};

export default Homepage;