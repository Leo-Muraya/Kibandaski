import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">CarWash</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/Booking" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Booking</Link>
              <Link to="/how-it-works" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">How It Works</Link>
              <Link to="/pricing" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
              <Link to="/contact" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
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
            <Link to="/services" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Services</Link>
            <Link to="/how-it-works" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">How It Works</Link>
            <Link to="/pricing" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
            <Link to="/faq" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">FAQ</Link>
            <Link to="/contact" className="block hover:bg-neutral-700 px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/register" className="hover:bg-neutral-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
