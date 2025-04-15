<<<<<<< HEAD
// api.js (Unified API Service)
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
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
    }
    return Promise.reject(error);
  }
);

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

export const fetchRestaurants = async () => {
  return await restaurantService.getAll();
};

export const fetchUserProfile = async () => {
  const { data } = await api.get('/me');
  return data;
};

export const fetchRestaurantMenu = async (restaurantId) => {
  return await restaurantService.getMenu(restaurantId);
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

export const signup = async (userData) => {
  try {
    const { data } = await api.post('/signup', userData);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};
=======
const API_URL = 'http://127.0.0.1:5000';

const apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('Authentication required');
    }
  }

  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.message);
    throw error;
  }
};

//AUTHENTICATION
export const signup = (userData) => apiRequest('/signup', 'POST', userData);
export const login = (credentials) => apiRequest('/login', 'POST', credentials);
export const logout = () => localStorage.removeItem('authToken');
export const checkLoginStatus = () => !!localStorage.getItem('authToken');

//RESTAURANTS
export const fetchRestaurants = () => apiRequest('/restaurants');
export const getRestaurantById = (restaurantId) => 
  apiRequest(`/restaurants/${restaurantId}`);
export const getFoodItemsForRestaurant = (restaurantId) => 
  apiRequest(`/restaurants/${restaurantId}/menu`);

//ORDERS
export const createOrder = (orderData) => 
  apiRequest('/orders', 'POST', orderData, true);
export const fetchUserOrders = () => 
  apiRequest('/orders', 'GET', null, true);
export const updateOrderStatus = (orderId, status) => 
  apiRequest(`/orders/${orderId}`, 'PATCH', { status }, true);

//  ORDER ITEMS
export const updateOrderItem = (orderId, itemId, quantity) => 
  apiRequest(`/orders/${orderId}/items/${itemId}`, 'PATCH', { quantity }, true);
export const removeOrderItem = (orderId, itemId) => 
  apiRequest(`/orders/${orderId}/items/${itemId}`, 'DELETE', null, true);

// ================= CART =================
export const fetchActiveCart = () => 
  apiRequest('/cart', 'GET', null, true);
export const addToCart = (foodItemId, quantity = 1) =>
  apiRequest('/cart/items', 'POST', { food_item_id: foodItemId, quantity }, true);
export const removeCartItem = (itemId) =>
  apiRequest(`/cart/items/${itemId}`, 'DELETE', null, true);

// ================= PROFILE =================
export const fetchUserProfile = () => 
  apiRequest('/profile', 'GET', null, true);
export const updateUserProfile = (profileData) => 
  apiRequest('/profile', 'PATCH', profileData, true);

// ================= REVIEWS =================
export const createReview = (reviewData) => 
  apiRequest('/reviews', 'POST', reviewData, true);
export const getFoodItemReviews = (foodItemId) => 
  apiRequest(`/reviews/food/${foodItemId}`);
export const deleteReview = (reviewId) => 
  apiRequest(`/reviews/${reviewId}`, 'DELETE', null, true);

// ================= ADMIN =================
export const adminCreateRestaurant = (restaurantData) => 
  apiRequest('/admin/restaurants', 'POST', restaurantData, true);
export const adminUpdateRestaurant = (restaurantId, restaurantData) => 
  apiRequest(`/admin/restaurants/${restaurantId}`, 'PATCH', restaurantData, true);
export const adminDeleteRestaurant = (restaurantId) => 
  apiRequest(`/admin/restaurants/${restaurantId}`, 'DELETE', null, true);

// ================= MISC =================
export const verifyToken = () => 
  apiRequest('/verify-token', 'GET', null, true);
export const searchRestaurants = (query) => 
  apiRequest(`/search?q=${encodeURIComponent(query)}`);
>>>>>>> 67661aeac307493fff0d92957db9ff58fee7f17c
