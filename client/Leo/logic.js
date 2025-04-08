// src/logic.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


// 1. Axios Configuration

const api = axios.create({
  baseURL: 'http://localhost:5000', // Match your Flask server
  timeout: 10000
});

// Request interceptor for JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


// 2. Authentication System

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/login', credentials);
      localStorage.setItem('token', data.access_token);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const signup = async (userData) => {
    try {
      const { data } = await api.post('/signup', userData);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
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


// 3. Redux Store (Cart)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    restaurantId: null
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.food_id === action.payload.food_id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.food_id !== action.payload
      );
    },
    setRestaurant: (state, action) => {
      if (state.restaurantId !== action.payload) {
        state.items = [];
      }
      state.restaurantId = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
    }
  }
});

export const { addItem, removeItem, setRestaurant, clearCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});


// 4. API Services

export const restaurantService = {
  getAll: async () => {
    const { data } = await api.get('/restaurants');
    return data;
  },
  getMenu: async (restaurantId) => {
    const { data } = await api.get(`/restaurants/${restaurantId}`);
    return data.menu_items;
  }
};

export const orderService = {
  create: async (cart) => {
    const orderData = {
      restaurant_id: cart.restaurantId,
      items: cart.items.map(item => ({
        food_id: item.food_id,
        quantity: item.quantity
      }))
    };
    const { data } = await api.post('/orders', orderData);
    return data;
  },
  getHistory: async () => {
    const { data } = await api.get('/orders');
    return data;
  }
};


// 5. Utility Hooks

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