<<<<<<< HEAD
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
=======
// api.js (Unified API Service)
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Axios configuration with JWT handling
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
    }
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
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
=======
// Authentication Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async credentials => {
    try {
      const { data } = await api.post('/login', credentials);
      localStorage.setItem('token', data.accessToken);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const signup = async userData => {
    try {
      const { data } = await api.post('/signup', userData);
      localStorage.setItem('token', data.accessToken);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await api.get('/me');
        setUser(data);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Redux Cart Store
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    restaurantId: null
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.itemId === action.payload.itemId
      );
      existingItem 
        ? existingItem.quantity += action.payload.quantity
        : state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
    setRestaurant: (state, action) => {
      if (state.restaurantId !== action.payload) state.items = [];
      state.restaurantId = action.payload;
    },
    clearCart: state => {
      state.items = [];
      state.restaurantId = null;
    }
  }
});

export const { addItem, removeItem, setRestaurant, clearCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

// API Services
export const restaurantService = {
  getAll: async () => (await api.get('/restaurants')).data,
  getById: async id => (await api.get(`/restaurants/${id}`)).data,
  getMenu: async restaurantId => 
    (await api.get(`/restaurants/${restaurantId}/menu`)).data
};

export const orderService = {
  create: async cart => {
    const orderData = {
      restaurantId: cart.restaurantId,
      items: cart.items.map(({ itemId, quantity }) => ({ itemId, quantity }))
    };
    return (await api.post('/orders', orderData)).data;
  },
  getHistory: async () => (await api.get('/orders')).data
};

// Utility Components
export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    setStatus('pending');
    try {
      const result = await asyncFunction(...args);
      setData(result);
      setStatus('success');
      return result;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  };

  return { execute, data, status, error };
};

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  return user ? children : null;
};
>>>>>>> da284935ad2844064f046a972ace2b26c96d0c94
