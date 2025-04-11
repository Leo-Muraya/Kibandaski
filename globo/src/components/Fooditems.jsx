import { useDispatch } from 'react-redux';
import { addItem } from '../api';

export const FoodItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <h4 className="font-bold text-gray-800">{item.name}</h4>
      <p className="text-gray-600 mt-1">${item.price.toFixed(2)}</p>
      <button
        onClick={() => dispatch(addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        }))}
        className="mt-3 bg-accent text-white px-4 py-2 rounded hover:bg-accent-dark transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};