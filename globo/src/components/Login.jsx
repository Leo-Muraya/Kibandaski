import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { token, user_id, username } = await login(formData);
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id: user_id,
        username
      }));

      navigate('/home');
    } catch (err) {
      setError(err.message.includes('401') 
        ? 'Invalid username or password' 
        : err.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
        url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '2.5rem',
      borderRadius: '1rem',
      boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.2)',
      width: '90%',
      maxWidth: '400px',
    },
    title: {
      textAlign: 'center',
      color: '#2d3436',
      marginBottom: '0.5rem',
      fontSize: '2rem',
    },
    subtitle: {
      textAlign: 'center',
      color: '#636e72',
      marginBottom: '2rem',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#2d3436',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      border: '2px solid #dfe6e9',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    button: {
      width: '100%',
      padding: '1rem',
      backgroundColor: '#F7A38E',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    error: {
      color: '#e74c3c',
      backgroundColor: '#fdeded',
      padding: '0.8rem',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #f5c6cb',
    },
    footer: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: '#636e72',
    },
    link: {
      color: '#F7A38E',
      fontWeight: '500',
      textDecoration: 'none',
    },
    spinner: {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTopColor: 'white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please login to continue</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={isSubmitting}
            autoComplete="username"
            style={{ 
              ...styles.input,
              borderColor: error ? '#e74c3c' : '#dfe6e9',
              ':focus': { outline: 'none', borderColor: '#F7A38E' }
            }}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={isSubmitting}
            autoComplete="current-password"
            style={{ 
              ...styles.input,
              borderColor: error ? '#e74c3c' : '#dfe6e9'
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            ...styles.button,
            backgroundColor: isSubmitting ? '#b2bec3' : '#F7A38E',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span style={styles.spinner}></span>
              Authenticating...
            </>
          ) : 'Login'}
        </button>

        <div style={styles.footer}>
          New here?{' '}
          <Link to="/signup" style={styles.link}>Create account</Link>
        </div>
      </form>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;