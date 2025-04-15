import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../api';

// Removed the top-level useAuth call

const SignUp = ({ setUser }) => {
  const { signup } = useAuth(); // Moved useAuth inside the component
=======
import { signup } from '../api';

const SignUp = ({ setUser }) => {
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const newUser = await signup(formData);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      navigate('/login');
    } catch (err) {
      setError(err.message.includes('400') 
        ? 'Username or email already exists' 
        : 'Signup failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    wrapper: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
        url('https://teamnutrition.ca/sites/default/files/articles/Inte%CC%81rieur%20restaurant%20-%20Restaurant%20interior.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    signupContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '40px 35px',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      color: '#2d3436',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box',
    },
    header: {
      fontSize: '2.2rem',
      marginBottom: '15px',
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '30px',
      fontWeight: '500',
    },
    input: {
      width: '90%',
      padding: '14px 20px',
      margin: '12px 0',
      borderRadius: '10px',
      border: '2px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    button: {
      width: '90%',
      padding: '16px',
      backgroundColor: '#F7A38E',
      border: 'none',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '15px',
      opacity: isLoading ? 0.7 : 1,
      pointerEvents: isLoading ? 'none' : 'auto',
    },
    error: {
      color: '#e74c3c',
      backgroundColor: '#fdeded',
      padding: '12px',
      borderRadius: '8px',
      margin: '15px 0',
      fontSize: '14px',
      border: '1px solid #f5c6cb',
    },
    text: {
      marginTop: '20px',
      fontSize: '14px',
      color: '#666',
      fontWeight: '500',
    },
    link: {
      color: '#F7A38E',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.signupContainer}>
        <h2 style={styles.header}>Create Account</h2>
        <p style={styles.subtitle}>Join our food community</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;