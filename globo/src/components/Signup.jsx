import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api'; // Assuming you have the signup API method

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const newUser = await signup({ username, email, password });

      // Store new user data in localStorage
      localStorage.setItem('user', JSON.stringify(newUser));

      // Set user in app state
      setUser(newUser);

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.signupContainer}>
        <h2 style={styles.header}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <p style={styles.text}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundImage: 'url(https://teamnutrition.ca/sites/default/files/articles/Inte%CC%81rieur%20restaurant%20-%20Restaurant%20interior.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  signupContainer: {
    backgroundColor: '#000',
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    color: 'white',
    textAlign: 'center',
    zIndex: 1,
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#444',
    color: 'white',
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
  text: {
    marginTop: '10px',
    color: '#aaa',
  },
  link: {
    color: '#f39c12',
    textDecoration: 'none',
  },
};

export default SignUp;
