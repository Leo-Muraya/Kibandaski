<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
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
<<<<<<< HEAD
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
=======
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// ================= AUTHENTICATION =================
export const signup = (userData) => apiRequest('/signup', 'POST', userData);
export const login = (credentials) => apiRequest('/login', 'POST', credentials);
export const logout = () => localStorage.removeItem('authToken');
export const checkLoginStatus = () => !!localStorage.getItem('authToken');

<<<<<<< HEAD
// Check if user is logged in by checking the presence of the JWT token
export const checkLoginStatus = () => {
  return !!localStorage.getItem('authToken');
};
=======
// Authentication Context
const AuthContext = createContext();
=======
// ================= RESTAURANTS =================
export const fetchRestaurants = () => apiRequest('/restaurants');
export const getRestaurantDetails = (restaurantId) => 
  apiRequest(`/restaurants/${restaurantId}`);
export const fetchRestaurantMenu = (restaurantId) => 
  apiRequest(`/restaurants/${restaurantId}/menu`);
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c

// ================= ORDERS =================
export const createOrder = (orderData) => 
  apiRequest('/orders', 'POST', orderData, true);
export const fetchUserOrders = () => 
  apiRequest('/orders', 'GET', null, true);
export const updateOrderStatus = (orderId, status) => 
  apiRequest(`/orders/${orderId}`, 'PATCH', { status }, true);

// ================= ORDER ITEMS =================
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

<<<<<<< HEAD
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
=======
// ================= MISC =================
export const verifyToken = () => 
  apiRequest('/verify-token', 'GET', null, true);
export const searchRestaurants = (query) => 
  apiRequest(`/search?q=${encodeURIComponent(query)}`);
>>>>>>> 454c74a82f706381a74ff5aa2db116fb47dcf60c
