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
    </div>
  );
};

export default Login;