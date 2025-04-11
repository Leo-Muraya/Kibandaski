import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, LogOut, Menu } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in and retrieves user info from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      // If no user is found in localStorage, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user info from localStorage
    setUser(null); // Clear the user state
    navigate('/login'); // Redirect to login page
  };

  const restaurants = [
    { id: 1, name: "Dau Swahili Restaurant", location: "Nairobi, Kingari Rd", image: "/api/placeholder/400/250", cuisine: "Swahili" },
    { id: 2, name: "Exodus Restaurant", location: "Nairobi, Plaza Jay", image: "/api/placeholder/400/250", cuisine: "Continental" },
    { id: 3, name: "Khum Indian Cuisine", location: "Nairobi, along Waiyaki Way", image: "/api/placeholder/400/250", cuisine: "Indian" },
    { id: 4, name: "Java Restaurant", location: "Nairobi, Westlands", image: "/api/placeholder/400/250", cuisine: "Café" },
    { id: 5, name: "KFC", location: "Nairobi, along Ngong Road", image: "/api/placeholder/400/250", cuisine: "Fast Food" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="mr-2 text-orange-500" />
            <h1 className="text-2xl font-bold text-orange-500">FoodGo</h1>
          </div>

          {/* Profile Section */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 rounded-full h-8 w-8 flex items-center justify-center text-orange-600 font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 hidden md:inline">Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-600 hover:text-orange-500"
                >
                  <LogOut size={16} className="mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <span className="text-gray-500">Loading...</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Restaurants</h2>
          
          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-xl hover:-translate-y-1">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">{restaurant.cuisine}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1 text-orange-500" />
                    <p className="text-sm">{restaurant.location}</p>
                  </div>
                  <Link 
                    to={`/restaurant/${restaurant.id}`}
                    className="block w-full text-center py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-orange-400 mb-2">FoodGo</h2>
              <p className="text-gray-300 text-sm">Delicious food delivered to your doorstep</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>© 2025 Food Delivery App. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;