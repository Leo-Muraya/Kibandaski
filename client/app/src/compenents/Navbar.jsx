import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">FoodApp</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/restaurant" className="text-gray-700 hover:text-blue-600">Restaurants</Link>
          <Link to="/checkout" className="text-gray-700 hover:text-blue-600">Checkout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
