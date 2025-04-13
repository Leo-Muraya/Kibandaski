const API_URL = 'http://127.0.0.1:5000';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }
  return data;
};

export const apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Authentication required');
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    return await handleResponse(response);
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Auth functions
export const login = async (credentials) => {
  try {
    const data = await apiRequest('/login', 'POST', {
      username: credentials.username,
      password: credentials.password
    });
    
    if (!data.token) throw new Error('Missing authentication token');
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error(error.message || 'Login failed. Please try again.');
  }
};

export const signup = async (userData) => {
  return apiRequest('/signup', 'POST', userData);
};

export const checkAuth = () => {
  return !!localStorage.getItem('authToken');
};

// Restaurant functions
export const fetchRestaurants = async () => {
  return apiRequest('/restaurants');
};

export const fetchMenu = async (restaurantId) => {
  return apiRequest(`/restaurants/${restaurantId}/menu`);
};

// Order functions
export const createOrder = async (items) => {
  return apiRequest('/orders', 'POST', { items }, true);
};

export const getOrders = async () => {
  return apiRequest('/orders', 'GET', null, true);
};

export const updateOrder = async (orderId, status) => {
  return apiRequest(`/orders/${orderId}`, 'PATCH', { status }, true);
};

export const removeItemFromOrder = async (orderId, itemId) => {
  return apiRequest(`/orders/${orderId}/items/${itemId}`, 'DELETE', null, true);
};