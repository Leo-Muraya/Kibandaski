import React, { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
import { Link, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api";
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

const Homepage = ({ user, handleLogout }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("ratingDesc");

  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/login");

    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };
    
    getRestaurants();
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
  }, [navigate]);

  useEffect(() => {
    let filtered = [...restaurants];

    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter((r) => r.location === selectedLocation);
    }

    if (sortBy === "ratingDesc") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "ratingAsc") {
      filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchQuery, selectedLocation, sortBy]);

  const locations = ["All", ...new Set(restaurants.map((r) => r.location))];

  return (
<<<<<<< HEAD
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
=======
    <div style={{ padding: "1rem 2rem", backgroundColor: "#fef8f7", minHeight: "100vh" }}>
      {/* Navbar */}
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        backgroundColor: "#F7A38E",
        padding: "1rem 2rem", 
        borderRadius: "15px",
        marginBottom: "2rem",
        border: "1px solid #f08b72",
        boxShadow: "0 4px 12px rgba(247, 163, 142, 0.2)"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img 
            src="https://img.icons8.com/ios-filled/50/ffffff/restaurant.png" 
            alt="Logo" 
            style={{ width: "30px", height: "30px", marginRight: "10px" }} 
          />
          <h1 style={{ 
            color: "#fff",
            fontSize: "2.5rem",
            fontWeight: "bold",
            letterSpacing: "-1px"
          }}>
            Kibandaski
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to="/cart" style={{ color: "#fff", display: "flex", alignItems: "center" }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ marginRight: "8px" }}
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Cart
          </Link>
          
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img 
                src="https://www.gravatar.com/avatar?d=mp&s=40" 
                alt="User profile" 
                style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  border: "2px solid #f08b72" 
                }} 
              />
              <div>
                <span style={{ color: "#fff", fontWeight: "bold" }}>{user?.username}</span>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    display: "block",
                    padding: "0.5rem 1rem", 
                    cursor: "pointer", 
                    backgroundColor: "#f08b72",
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "6px", 
                    fontWeight: "bold",
                    marginTop: "4px"
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <span style={{ color: "#fff" }}>Loading...</span>
          )}
        </div>
      </header>

      {/* Filters Section */}
      <section style={{ 
        marginBottom: "2rem", 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "1rem", 
        justifyContent: "center",
        alignItems: "center"
      }}>
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: "0.8rem", 
            borderRadius: "10px", 
            border: "1px solid #f9c8bb", 
            backgroundColor: "#fff",
            width: "300px",
            fontSize: "1rem"
          }}
        />

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ 
            padding: "0.8rem", 
            borderRadius: "10px", 
            border: "1px solid #f9c8bb", 
            backgroundColor: "#fff", 
            color: "#2d3436",
            fontSize: "1rem"
          }}
        >
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ 
            padding: "0.8rem", 
            borderRadius: "10px", 
            border: "1px solid #f9c8bb", 
            backgroundColor: "#fff", 
            color: "#2d3436",
            fontSize: "1rem"
          }}
        >
          <option value="ratingDesc">Sort: Rating (High to Low)</option>
          <option value="ratingAsc">Sort: Rating (Low to High)</option>
        </select>
      </section>

      {/* Restaurant Grid */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b4a42" }}>Loading restaurants...</p>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem"
        }}>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(247, 163, 142, 0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img 
                  src={restaurant.image || "https://via.placeholder.com/300x200?text=No+Image"} 
                  alt={restaurant.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <span style={{ 
                  position: "absolute", 
                  top: "8px", 
                  left: "8px", 
                  backgroundColor: "rgba(247, 163, 142, 0.9)", 
                  color: "#fff", 
                  padding: "6px 12px", 
                  borderRadius: "5px", 
                  fontSize: "0.9rem"
                }}>
                  {restaurant.status || "Open"}
                </span>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", color: "#2d3436" }}>{restaurant.name}</h3>
                <p style={{ margin: "0.3rem 0", color: "#6b4a42" }}>{restaurant.location}</p>
                <p style={{ margin: "0.3rem 0", color: "#6b4a42" }}>
                  ⭐ {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
                </p>
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  style={{
                    display: "inline-block",
                    marginTop: "1rem",
                    backgroundColor: "#F7A38E",
                    color: "#fff",
                    padding: "0.8rem 1.2rem",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f08b72";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#F7A38E";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD
      </div>
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
=======
      )}

      <footer style={{ 
        textAlign: "center", 
        padding: "3rem 0 2rem", 
        color: "#6b4a42", 
        fontSize: "0.9rem",
        marginTop: "3rem"
      }}>
        <p>© 2024 Kibandaski App</p>
      </footer>
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
    </div>
  );
};

export default Homepage;