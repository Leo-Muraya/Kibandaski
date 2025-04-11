import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

const BASE_URL = ""; 

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

export const fetchMenuItems = async (restaurantId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/restaurants/${restaurantId}/menu`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};