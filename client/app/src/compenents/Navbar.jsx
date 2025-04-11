import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
<<<<<<< HEAD
    <nav className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
<<<<<<< HEAD
            <h1 className="text-2xl font-bold">CarWash</h1>
=======
            <h1 className="text-2xl font-bold">Restaurant</h1>
>>>>>>> c7384338df95178d19ad45d8e5b545548f1c4ad5
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
<<<<<<< HEAD
              <Link to="/Booking" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Booking</Link>
              <Link to="/how-it-works" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
              <Link to="/pricing" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
              <Link to="/contact" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
=======
              <Link to="/Booking" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Checkout</Link>
              <Link to="/how-it-works" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Restaurant</Link>
>>>>>>> c7384338df95178d19ad45d8e5b545548f1c4ad5
              <Link to="/register" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-neutral-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Home</Link>
<<<<<<< HEAD
            <Link to="/services" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/how-it-works" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">How It Works</Link>
            <Link to="/pricing" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
            <Link to="/faq" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">FAQ</Link>
            <Link to="/contact" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Contact</Link>
=======
            <Link to="/services" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Checkout</Link>
            <Link to="/how-it-works" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Restaurant</Link>
>>>>>>> c7384338df95178d19ad45d8e5b545548f1c4ad5
            <Link to="/register" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
          </div>
        </div>
      )}
=======
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">FoodApp</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/restaurant" className="text-gray-700 hover:text-blue-600">Restaurants</Link>
          <Link to="/checkout" className="text-gray-700 hover:text-blue-600">Checkout</Link>
        </div>
      </div>
>>>>>>> 9c0581ce87318342e0b71cb9fd3650a2bf12f714
    </nav>
  );
};

export default Navbar;
