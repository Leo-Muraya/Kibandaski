

const API_URL = 'http://localhost:5000'; 


const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

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

//fetch all restaurants
export const fetchRestaurants = async () => {
  return apiRequest('/restaurants');
};

//fetch menu items for a specific restaurant
export const fetchRestaurantMenu = async (restaurantId) => {
  return apiRequest(`/restaurants/${restaurantId}/menu`);
};

//fetch a single restaurant by ID
export const fetchRestaurantById = async (restaurantId) => {
  return apiRequest(`/restaurants/${restaurantId}`);
};

// Add a new item to the cart (for now, this can just be a client-side operation)
export const addToCart = (item, cart) => {
  const updatedCart = [...cart, item];
  return updatedCart; // Return updated cart array
};

// Remove an item from the cart
export const removeFromCart = (itemId, cart) => {
  const updatedCart = cart.filter(item => item.id !== itemId);
  return updatedCart; // Return updated cart array
};

// Proceed to checkout (you can integrate payment API here)
export const checkout = async (cart, userId) => {
  const orderData = {
    userId,
    items: cart,
    totalAmount: cart.reduce((total, item) => total + item.price, 0), // Calculate total amount
  };

  return apiRequest('/orders', 'POST', orderData); // Assuming '/orders' is your order creation endpoint
};

// Get user order history
export const fetchOrderHistory = async (userId) => {
  return apiRequest(`/users/${userId}/orders`);
};

// User signup
export const signup = async (userData) => {
  return apiRequest('/signup', 'POST', userData);
};

// User login
export const login = async (credentials) => {
  return apiRequest('/login', 'POST', credentials);
};

// Example API Routes for Backend (you should replace with your actual backend routes):
// - GET /restaurants: Fetch all restaurants
// - GET /restaurants/:id/menu: Fetch menu for a specific restaurant
// - GET /restaurants/:id: Fetch a single restaurant
// - POST /orders: Create a new order
// - GET /users/:id/orders: Fetch orders for a specific user
// - POST /signup: User signup
// - POST /login: User login

