import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../src/logic';

export const RestaurantCard = ({ restaurant }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
      <p className="text-gray-600 mt-2">{restaurant.location}</p>
      <Link
        to={`/restaurants/${restaurant.id}`}
        onClick={() => dispatch(clearCart())}
        className="mt-4 inline-block bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
      >
        View Menu
      </Link>
    </div>
  );
};