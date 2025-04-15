import React, { useState, useEffect } from 'react';
import { fetchAdminRestaurant, updateAdminMenu, getAdminOrders } from '../api';

const AdminPanel = ({ admin }) => {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchAdminRestaurant(admin.restaurantId);
      const orders = await getAdminOrders(admin.restaurantId);
      setRestaurant(res);
      setOrders(orders);
    };
    loadData();
  }, [admin]);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          {restaurant?.name || 'My Restaurant'} Admin
        </h1>
        <div className="flex gap-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Menu Settings
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded">
            Order History
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Today's Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500">New Orders</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <div>
              <p className="text-gray-500">Pending Orders</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Recent Orders</h3>
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="border-b py-3 last:border-0">
              <p>Order #{order.id} • {order.status}</p>
              <p className="text-sm text-gray-500">
                {order.items.length} items • Ksh {order.total}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};