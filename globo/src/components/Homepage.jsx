import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("ratingDesc");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/login");

    const userData = JSON.parse(localStorage.getItem("user")) || { username: "Developer" };
    setUser(userData);
  }, [navigate]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        console.log("Fetched data:", data); // Check the structure of the response
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setLoading(false);
      }
    };
    
    getRestaurants();
  }, []);

  useEffect(() => {
    let filtered = [...restaurants];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (selectedLocation !== "All") {
      filtered = filtered.filter((r) => r.location === selectedLocation);
    }

    // Sorting
    if (sortBy === "ratingDesc") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "ratingAsc") {
      filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchQuery, selectedLocation, sortBy]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const locations = ["All", ...new Set(restaurants.map((r) => r.location))];

  return (
    <div style={{ padding: "1rem 2rem", backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Arial" }}>
      
      {/* Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#111", padding: "1rem 2rem", borderRadius: "10px", marginBottom: "2rem" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="https://img.icons8.com/ios-filled/50/FFD700/restaurant.png" alt="Logo" style={{ width: "30px", height: "30px", marginRight: "10px" }} />
          <h1 style={{ color: "#ffd700", fontSize: "1.8rem", fontWeight: "bold" }}>Kibandaski</h1>
        </div>

        {/* Optional Tagline */}
        <div style={{ color: "#ccc", fontStyle: "italic" }}>Enjoy local flavors, fast & fresh!</div>

        {/* User Profile Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {user ? (
            <>
              <span style={{ color: "#fff", fontWeight: "bold" }}>{user?.username}</span>
              <img src="https://www.gravatar.com/avatar?d=mp&s=40" alt="User profile" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #ffd700" }} />
              <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "#ffd700", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold" }}>
                Logout
              </button>
            </>
          ) : (
            <span style={{ color: "#ccc" }}>Loading...</span>
          )}
        </div>

      {/* Filters Section */}
      <section style={{ marginBottom: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", flexGrow: 1, minWidth: "200px" }}
        />

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#fff", color: "#000" }}
        >
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", backgroundColor: "#fff", color: "#000" }}
        >
          <option value="ratingDesc">Sort: Rating (High to Low)</option>
          <option value="ratingAsc">Sort: Rating (Low to High)</option>
        </select>
      </section>

      {/* Loading state */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#ccc" }}>Loading restaurants...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(255,255,255,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: "8px", left: "8px", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "#fff", padding: "4px 8px", borderRadius: "5px", fontSize: "0.8rem" }}>
                  {restaurant.status}
                </span>
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", color: "#fff" }}>{restaurant.name}</h3>
                <p style={{ margin: "0.3rem 0", color: "#ccc" }}>{restaurant.location}</p>
                <p style={{ margin: "0.3rem 0", color: "#ccc" }}>
                  ⭐ {restaurant.rating ? restaurant.rating.toFixed(1) : "N/A"}
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

      <footer style={{ textAlign: "center", padding: "2rem 0", color: "#777", fontSize: "0.9rem" }}>
        <p>© 2025 Kibandaski App</p>
      </footer>
    </div>
  );
};

export default Homepage;