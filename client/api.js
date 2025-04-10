const BASE_URL = "http://localhost:5000"; // Backend base URL

// Fetch all restaurants
export const fetchRestaurants = async () => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Fetch a single restaurant by ID
export const fetchRestaurantById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/restaurants/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (usernameOrEmail, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: usernameOrEmail, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to log in");
    }
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Sign up user
export const signupUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
    return await response.json();
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};