<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../api'; // Fixed import name to match your API.js

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(); // Changed to match API.js export
        setProfile(data.user);
        setOrders(data.orders || []);
      } catch (error) {
        console.error('Failed to load profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-orange-100 p-4 rounded-full">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile?.username || 'Anonymous User'}
            </h2>
            <p className="text-gray-600">{profile?.email || 'No email provided'}</p>
          </div>
        </div>

        {/* Order History */}
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border-b border-orange-100 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">
                  {order.timestamp ? 
                    new Date(order.timestamp).toLocaleDateString() : 
                    'Date not available'}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {order.status || 'Unknown status'}
                </span>
              </div>
              <p className="text-gray-800">
                Total: Ksh {order.total_price?.toFixed(2) || '0.00'}
              </p>
            </div>
          ))
        )}
      </div>
=======
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login({ username, password });
      
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify({
        id: response.user_id,
        username: response.username
      }));
      
      navigate("/home");
    } catch (err) {
      setError(err.message.includes("401") 
        ? "Invalid username or password" 
        : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    wrapper: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
        url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    loginContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "40px 35px",
      borderRadius: "20px",
      width: "100%",
      maxWidth: "420px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxSizing: "border-box",
    },
    header: {
      fontSize: "2.2rem",
      marginBottom: "15px",
      color: "#2d3436",
      fontWeight: "700",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
      fontWeight: "500",
    },
    input: {
      width: "90%",
      padding: "14px 20px",
      margin: "12px 0",
      borderRadius: "10px",
      border: "2px solid #e0e0e0",
      backgroundColor: "#f8f9fa",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
    },
    button: {
      width: "90%",
      padding: "16px",
      backgroundColor: "#F7A38E",
      border: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "15px",
      opacity: isLoading ? 0.7 : 1,
      pointerEvents: isLoading ? "none" : "auto",
    },
    error: {
      color: "#e74c3c",
      backgroundColor: "#fdeded",
      padding: "12px",
      borderRadius: "8px",
      margin: "15px 0",
      fontSize: "14px",
      border: "1px solid #f5c6cb",
    },
    text: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#666",
      fontWeight: "500",
    },
    link: {
      color: "#F7A38E",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleLogin} style={styles.loginContainer}>
        <h2 style={styles.header}>Welcome to Kibandaski</h2>
        <p style={styles.subtitle}>Please log in to continue</p>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {isLoading ? "Signing In..." : "Login"}
        </button>

        <p style={styles.text}>
          New here?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
        </p>
      </form>
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
    </div>
  );
};

<<<<<<< HEAD
export default Profile;
=======
export default Login;
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
