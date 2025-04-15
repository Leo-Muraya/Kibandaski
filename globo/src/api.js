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
