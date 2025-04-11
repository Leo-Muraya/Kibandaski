import { useParams } from 'react-router-dom';
import { useAsync } from '../api';
import { FoodItem } from '../components/FoodItems';

export const RestaurantDetail = () => {
  const { id } = useParams();
  const { data: restaurant, loading, error } = useAsync(() =>
    fetch(`http://localhost:5000/restaurants/${id}`).then(res => res.json())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading && <p className="col-span-full text-center">Loading menu...</p>}
      {error && <p className="col-span-full text-red-500">Error loading menu: {error.message}</p>}
      {restaurant?.menu_items?.map(item => (
        <FoodItem key={item.id} item={item} />
      ))}
    </div>
  );
};