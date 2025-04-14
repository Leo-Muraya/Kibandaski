import React, { useEffect, useState } from 'react';
import { 
  fetchActiveCart, 
  updateOrderItem, 
  removeCartItem 
} from '../api';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchActiveCart();
        setCart(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleUpdate = async (itemId, quantity) => {
    try {
      if (quantity < 1) return;
      await updateOrderItem(itemId, quantity);
      setCart(prev => prev.map(order => ({
        ...order,
        food_items: order.food_items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        ),
        total_price: order.food_items.reduce(
          (total, item) => total + (item.quantity * item.food_item.price), 0
        )
      })));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      setCart(prev => prev.map(order => ({
        ...order,
        food_items: order.food_items.filter(item => item.id !== itemId)
      })));
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading cart...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        cart.map(order => (
          <div key={order.id} className="mb-8 border-b border-orange-100 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {order.restaurant?.name || 'Unknown Restaurant'}
              </h3>
              <span className="text-orange-500 font-medium">
                Status: {order.status}
              </span>
            </div>
            
            {order.food_items.map(item => (
              <div key={item.id} className="flex justify-between items-center py-4 hover:bg-orange-50 px-4 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.food_item.name}</p>
                  <p className="text-gray-600">Ksh {item.food_item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                    <button 
                      onClick={() => handleUpdate(item.id, item.quantity - 1)}
                      className="text-orange-600 hover:text-orange-700 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdate(item.id, item.quantity + 1)}
                      className="text-orange-600 hover:text-orange-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 text-right font-semibold text-lg text-gray-800">
              Order Total: Ksh {order.total_price.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;