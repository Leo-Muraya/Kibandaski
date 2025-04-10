

const API_URL = 'http://127.0.0.1:5000'; 


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

//add a new item to the cart (for now, this can just be a client-side operation)
export const addToCart = (item, cart) => {
  const updatedCart = [...cart, item];
  return updatedCart; // Return updated cart array
};

//remove an item from the cart
export const removeFromCart = (itemId, cart) => {
  const updatedCart = cart.filter(item => item.id !== itemId);
  return updatedCart; // Return updated cart array
};

//proceed to checkout (you can integrate payment API here)
export const checkout = async (cart, userId) => {
  const orderData = {
    userId,
    items: cart,
    totalAmount: cart.reduce((total, item) => total + item.price, 0), // Calculate total amount
  };

  return apiRequest('/orders', 'POST', orderData); // Assuming '/orders' is your order creation endpoint
};

//get user order history
export const fetchOrderHistory = async (userId) => {
  return apiRequest(`/users/${userId}/orders`);
};

//user signup
export const signup = async (userData) => {
  return apiRequest('/signup', 'POST', userData);
};

//user login
export const login = async (credentials) => {
  return apiRequest('/login', 'POST', credentials);
};


