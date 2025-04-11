const API_URL = 'http://127.0.0.1:5000';

// Utility function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If authentication is required, include the JWT token in the Authorization header
  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('Authentication required');
    }
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// User login (stores JWT token in localStorage)
export const login = async (credentials) => {
  try {
    const loginData = {
      email: credentials.email,
      password: credentials.password,
    };

    const response = await apiRequest('/login', 'POST', loginData);  // Send login data to backend
    localStorage.setItem('authToken', response.token); // Assuming the token is returned in response.token

    return response; 
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// User signup (stores JWT token in localStorage)
export const signup = async (userData) => {
  try {
    const response = await apiRequest('/signup', 'POST', userData);
    return response.user; // Assuming the user data is returned in the response
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

// Check if user is logged in by checking the presence of the JWT token
export const checkLoginStatus = () => {
  return !!localStorage.getItem('authToken');
};
