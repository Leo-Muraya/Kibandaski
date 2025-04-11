import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Assuming you have the login API method

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For handling error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send email as username_or_email in the request body
      const response = await login({ username_or_email: email, password });

      // Check if the response contains a token
      if (response.token) {
        // Save the token in localStorage
        localStorage.setItem('token', response.token);

        // Optionally save the user data as well
        localStorage.setItem('user', JSON.stringify({ username: response.username, email }));

        // Set the user data in the app state
        setUser({ username: response.username, email });

        // Redirect to homepage
        navigate('/home');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.loginContainer}>
        <h2 style={styles.header}>Welcome to Kibandaski!</h2>
        <p style={styles.subtitle}>Please log in to continue.</p>
        <form onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.text}>Don't have an account? <a href="/signup" style={styles.link}>Register</a></p>
      </div>
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
