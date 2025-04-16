import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchRestaurants } from "../api";
import { motion, AnimatePresence } from "framer-motion";



const placeholderImages = [
  "https://tb-static.uber.com/prod/image-proc/processed_images/6019d977e4bb79ccbf79ada572a36d83/16bb0a3ab8ea98cfe8906135767f7bf4.webp",
  "https://www.explore254.com/wp-content/uploads/2024/09/httpswww.explore254.comwp-contentuploads202410KFC-Restaurant-Branches-Locations-in-Kenya.jpg",
  "https://offloadmedia.feverup.com/secretdubai.co/wp-content/uploads/2023/08/10112413/shutterstock_1304901667.jpg",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  "https://invest.hawaii.gov/made-in-hawaii/wp-content/uploads/sites/3/2020/07/o.jpg",
  "https://media.istockphoto.com/id/1293175039/photo/handsome-black-african-american-food-delivery-courier-posing-in-front-of-the-camera-in-a.jpg?s=612x612&w=0&k=20&c=KucST70kZoQAqYcPoRceQM0S5wGYsYaO7-fF72yJe7I=",
  "https://jamesbreuhl.com/wp-content/uploads/2023/10/JAMES-BREUHL-THIBODAUX-LOUISIANA-3.jpg"
];

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
    <div
      style={{
        padding: "1rem 2rem",
        backgroundColor: "#6F4F37",
        minHeight: "100vh",
        margin: 0,
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFB6B9",
          padding: "0.5rem 2rem",
          borderRadius: "15px",
          marginBottom: "2rem",
          border: "1px solid #f39c9c",
          boxShadow: "0 4px 12px rgba(255, 182, 185, 0.2)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/restaurant.png"
            alt="Logo"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <h1
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: "bold",
              letterSpacing: "-1px"
            }}
          >
            Kibandaski
          </h1>
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "0.8rem",
              borderRadius: "10px",
              border: "1px solid#ffc2c5",
              backgroundColor: "#fff",
              width: "300px",
              fontSize: "1rem",
              textAlign: "center"
            }}
          />
  
          <Link
            to="/cart"
            style={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#2d3436")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            🛒 Cart
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
  
      <section
        style={{
          marginBottom: "2rem",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#FFB6B9",
          textAlign: "left",
          marginLeft: "2rem"
        }}
      >
        Featured on Kibandaski
      </section>
  
      <section style={{ marginBottom: "2rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "250px",
            borderRadius: "15px",
            overflow: "hidden"
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              src={placeholderImages[currentSlide]}
              alt="Happy customer or delivery person"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0
              }}
            />
          </AnimatePresence>
        </div>
      </section>
  
      <section
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
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
  
      {loading ? (
        <p style={{ textAlign: "center", color: "#6b4a42" }}>Loading restaurants...</p>
      ) : filteredRestaurants.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b4a42", fontSize: "1.2rem" }}>
          No restaurants found for your search/filter.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}
        >
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={{
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                overflow: "hidden",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                  color: "#333"
                }}
              >
                {restaurant.name}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "#777",
                  margin: "0.5rem 0"
                }}
              >
                {restaurant.location}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.1rem",
                  color: "#f39c9c"
                }}
              >
                <span>⭐</span>
                <span>{restaurant.rating}</span>
              </div>
              <Link
                to={`/restaurants/${restaurant.id}/menu`}
                style={{
                  display: "inline-block",
                  padding: "0.6rem 1.2rem",
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
      )}
    </div>
  );
  
  
};

export default Homepage;
