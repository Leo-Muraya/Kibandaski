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

const Homepage = ({ user, handleLogout }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("ratingDesc");
  const [currentSlide, setCurrentSlide] = useState(0);

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
        const restaurantsWithImages = data.map((r, index) => ({
          ...r,
          image: placeholderImages[index % placeholderImages.length]
        }));
        setRestaurants(restaurantsWithImages);
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
  
// Change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % placeholderImages.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

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
            fontSize: "2rem", // Slightly smaller font size
            fontWeight: "bold",
            letterSpacing: "-1px"
          }}>
            Kibandaski
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
          </h1>
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Search Bar in the Navbar */}
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "0.8rem",
              borderRadius: "10px",
              border: "1px solid #ffc2c5",
              backgroundColor: "#fff",
              width: "300px",
              fontSize: "1rem",
              textAlign: "center", // To center the text inside the search bar
            }}
          />
          
          {/* Cart Icon */}
          <Link
            to="/cart"
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2d3436")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            🛒 Cart
          </Link>
  
          {/* User Profile */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src="https://www.gravatar.com/avatar?d=mp&s=40"
                alt="User profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #f39c9c"
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
                    backgroundColor: "#f39c9c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    marginTop: "4px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff8f95";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f39c9c";
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
  
      {/* Featured Text - Moved to the Left */}
      <section style={{
        marginBottom: "2rem",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#FFB6B9",
        textAlign: "left", // Move it to the left
        marginLeft: "2rem"
      }}>
        Featured on Kibandaski
      </section>
  
      {/* Slideshow Section */}
      <section style={{ marginBottom: "2rem" }}>
        <div style={{
          position: "relative",
          width: "100%",
          height: "250px",
          borderRadius: "15px",
          overflow: "hidden"
        }}>
          <img
            src={placeholderImages[currentSlide]}
            alt="Happy customer or delivery person"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.5s ease",
            }}
          />
        </div>
      </section>
  
      {/* Filters Section */}
      <section style={{
        marginBottom: "2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{
            padding: "0.8rem",
            borderRadius: "10px",
            border: "1px solid #ffc2c5",
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
            border: "1px solid #ffc2c5",
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
      ) : filteredRestaurants.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b4a42", fontSize: "1.2rem" }}>
          No restaurants found for your search/filter.
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
                overflow: "hidden"
              }}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginTop: "1rem",
                color: "#333"
              }}>
                {restaurant.name}
              </h3>
              <p style={{
                fontSize: "1rem",
                color: "#777",
                margin: "0.5rem 0"
              }}>
                {restaurant.location}
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.2rem",
                color: "#f39c9c"
              }}>
                <span>⭐</span>
                <span>{restaurant.rating}</span>
              </div>
              <Link
                to={`/restaurants/${restaurant.id}/menu`}
                style={{
                  display: "inline-block",
                  padding: "0.8rem 1.5rem",
                  marginTop: "1rem",
                  backgroundColor: "#f39c9c",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                View Menu
              </Link>
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
    </div>
  );
  
};

export default Homepage;
