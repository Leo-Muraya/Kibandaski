import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api";
import { useCart } from "./Cartcontext";

const Homepage = ({ user, handleLogout }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("ratingDesc");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  const filteredRestaurants = useMemo(() => {
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

    return filtered;
  }, [restaurants, searchQuery, selectedLocation, sortBy]);

  const locations = ["All", ...new Set(restaurants.map((r) => r.location))];

  return (
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
        boxShadow: "0 4px 12px rgba(247, 163, 142, 0.2)",
        flexDirection: window.innerWidth < 768 ? "column" : "row",
        gap: window.innerWidth < 768 ? "1rem" : "0"
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
          </h1>
        </div>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "2rem",
          flexDirection: window.innerWidth < 768 ? "column" : "row"
        }}>
          <Link 
            to="/cart" 
            style={{ 
              color: "#fff", 
              display: "flex", 
              alignItems: "center",
              position: "relative"
            }}
          >
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
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#f08b72",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px"
              }}>
                {cartCount}
              </span>
            )}
          </Link>
          
          {user ? (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1rem",
              flexDirection: window.innerWidth < 768 ? "column" : "row"
            }}>
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
              <div style={{ textAlign: window.innerWidth < 768 ? "center" : "left" }}>
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
                    marginTop: "4px",
                    width: "100%"
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
          aria-label="Search restaurants"
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
          aria-label="Filter by location"
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
          aria-label="Sort restaurants"
        >
          <option value="ratingDesc">Sort: Rating (High to Low)</option>
          <option value="ratingAsc">Sort: Rating (Low to High)</option>
        </select>
      </section>

      {/* Restaurant Grid */}
      {loading ? (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "1.5rem"
        }}>
          {[1,2,3,4].map((_, index) => (
            <div 
              key={index} 
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                height: "350px",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      ) : filteredRestaurants.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h3 style={{ color: "#6b4a42" }}>No restaurants found</h3>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedLocation("All");
            }}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#F7A38E",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "1rem"
            }}
          >
            Clear Filters
          </button>
        </div>
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p style={{ margin: "0.3rem 0", color: "#6b4a42" }}>
                    ⏰ {restaurant.delivery_time || '30-40'} mins
                  </p>
                  <p style={{ margin: "0.3rem 0", color: "#6b4a42" }}>
                    ⭐ {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
                  </p>
                </div>
                <p style={{ margin: "0.3rem 0", color: "#6b4a42" }}>{restaurant.location}</p>
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

      <style>
        {`
          @keyframes pulse {
            0% { background-color: #f5f5f5; }
            50% { background-color: #ffffff; }
            100% { background-color: #f5f5f5; }
          }
        `}
      </style>
    </div>
  );
};

export default Homepage;