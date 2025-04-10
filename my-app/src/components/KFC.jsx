import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const kfcMenuItems = [
  { name: 'Zinger Burger', price: 550 },
  { name: 'Twister Combo', price: 650 },
  { name: 'Chicken Bucket', price: 1200 },
  { name: 'Wings', price: 450 },
  { name: 'Popcorn Chicken', price: 400 },
  { name: 'Crispy Strips', price: 500 },
  { name: 'Masala Fries', price: 250 },
  { name: 'Soft Drink', price: 150 },
  { name: 'Coleslaw', price: 100 },
  { name: 'Cheesy Chips', price: 300 },
];

function KFCPage() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('menu'); // 'menu' | 'cart' | 'checkout'

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setView('cart');
  };

  const handleCheckout = () => {
    setView('checkout');
  };

  const getTotal = () => cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-6">
      {view === 'menu' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kfcMenuItems.map((item, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="mb-4 text-gray-600">Ksh {item.price}</p>
                <Button onClick={() => addToCart(item)}>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {view === 'cart' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.map((item, index) => (
            <div key={index} className="mb-2 flex justify-between border-b pb-2">
              <span>{item.name}</span>
              <span>Ksh {item.price}</span>
            </div>
          ))}
          <p className="mt-4 font-semibold">Total: Ksh {getTotal()}</p>
          <Button className="mt-4" onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      )}

      {view === 'checkout' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form className="space-y-4">
            <input className="w-full border p-2" type="text" placeholder="Full Name" required />
            <input className="w-full border p-2" type="text" placeholder="Delivery Address" required />
            <input className="w-full border p-2" type="tel" placeholder="Phone Number" required />
            <select className="w-full border p-2">
              <option value="">Select Payment Method</option>
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit/Debit Card</option>
              <option value="cash">Cash on Delivery</option>
            </select>
            <Button type="submit" className="w-full">Place Order</Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default KFCPage;
