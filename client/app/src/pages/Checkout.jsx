import React from "react";
import Layout from "../components/Layout";

const Checkout = () => {
  return (
    <Layout>
      <section className="min-h-screen bg-dark text-white py-10 px-4 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Checkout</h1>
          <div className="bg-darkSecondary rounded-2xl p-6 shadow-lg space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <ul className="text-gray-400 mt-2">
                <li>Grilled Chicken x1 - $12.99</li>
                <li>Caesar Salad x2 - $9.98</li>
              </ul>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg text-primary font-semibold">$22.97</span>
            </div>
            <button className="w-full mt-6 px-4 py-3 bg-primary text-white text-lg rounded-lg hover:bg-primaryHover transition">
              Proceed to Payment
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
