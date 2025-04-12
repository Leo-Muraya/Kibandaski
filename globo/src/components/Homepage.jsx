import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
        </div>
      </nav>

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
    </div>
  );
};

export default Homepage;