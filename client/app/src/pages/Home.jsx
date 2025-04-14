import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleFindFood = () => {
    if (address.trim() !== "") {
      navigate("/restaurant");
    } else {
      alert("Please enter a delivery address.");
    }
  };

  return (
    <Layout>
      <div
        className="relative bg-cover bg-center min-h-[80vh] rounded-xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606755962773-c3d5fba3c9d4?auto=format&fit=crop&w=1400&q=80')", // Replace with your own image or static asset
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-2xl w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Order delivery near you
            </h1>

            <div className="bg-white rounded-lg overflow-hidden shadow-md text-black flex flex-col md:flex-row items-stretch">
              <input
                type="text"
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 px-4 py-3 outline-none"
              />
              <select className="px-4 py-3 border-t md:border-t-0 md:border-l border-gray-200">
                <option>Deliver now</option>
                <option>Schedule for later</option>
              </select>
              <button
                onClick={handleFindFood}
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition"
              >
                Find Food
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-300">
              Or{" "}
              <a
                href="/login"
                className="underline hover:text-white transition"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
