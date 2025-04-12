const API_URL = 'http://127.0.0.1:5000';

// Utility function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null, requiresAuth = false) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

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
      const errorText = await response.text();
      throw new Error(errorText || 'API Error');
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// --------- AUTH ----------
export const signup = async (userInfo) => {
  return await apiRequest('/signup', 'POST', userInfo);
};

export const login = async (credentials) => {
  const response = await apiRequest('/login', 'POST', credentials);

  // Confirm the structure is what we expect
  if (response && response.token) {
    localStorage.setItem('authToken', response.token);
  } else {
    throw new Error('Invalid login response: missing token');
  }

  return response;
};


export const checkLoginStatus = () => {
  return !!localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

// --------- RESTAURANTS ----------
export const fetchRestaurants = async () => {
  return await apiRequest('/restaurants');
};

export const fetchRestaurantMenu = async (restaurantId) => {
  return await apiRequest(`/restaurants/${restaurantId}/menu`);
};

// --------- ORDERS ----------
export const createOrder = async (items) => {
  // items: [{ food_id: 1, quantity: 2 }, ...]
  return await apiRequest('/orders', 'POST', { items }, true);
};

export const fetchUserOrders = async () => {
  return await apiRequest('/orders', 'GET', null, true);
};

export const updateOrderStatus = async (orderId, status) => {
  return await apiRequest(`/orders/${orderId}`, 'PATCH', { status }, true);
};

export const removeOrderItem = async (orderId, foodItemId) => {
  return await apiRequest(`/orders/${orderId}/items/${foodItemId}`, 'DELETE', null, true);
};
