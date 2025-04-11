import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({ username, password });
  
      console.log("Backend response:", response);
  
      if (response.token) {
        const userData = {
          id: response.user_id,
          username: response.username,
        };
  
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(userData));
  
        navigate("/home"); // Redirect to homepage after login
      } else {
        console.error("Login failed: Token missing in response");
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err.response || err);
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };
  

  return (
    <div
    style={{
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.5), 
        rgba(0, 0, 0, 0.5)
      ), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1050&q=80')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial",
    }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          width: "320px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Welcome to Kibandaski
        </h2>
        <p style={{ textAlign: "center", marginBottom: "1rem", color: "#666" }}>
          Please log in to continue
        </p>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="username"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.8rem",
            backgroundColor: "#ffd700",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
          New here?{" "}
          <Link to="/signup" style={{ color: "#007bff", textDecoration: "none" }}>
            Create an account
          </Link>
        </p>
      </form>
      <p>Don't have an account? <a href="/signup">Register</a></p>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundImage: 'url(https://teamnutrition.ca/sites/default/files/articles/Inte%CC%81rieur%20restaurant%20-%20Restaurant%20interior.jpeg)', // Replace with your image URL or local path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure it covers the entire height of the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Optional padding around the container
  },
  loginContainer: {
    backgroundColor: '#fff', // White background for the form container
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: 'black', // Text color for the form
    textAlign: 'center',
    zIndex: 1, // Make sure it's above the background image
  },
  header: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#aaa',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f5f5',
    color: 'black',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f39c12',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '10px',
  },
  text: {
    marginTop: '10px',
    color: '#aaa',
  },
  link: {
    color: '#f39c12',
    textDecoration: 'none',
  }
};

export default Login;
