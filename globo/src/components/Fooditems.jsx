import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);  // Access cart state from Redux

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Cart</h2>
      <ul className="mt-4">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.id} className="mb-4">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </li>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
