import React from 'react';
import { useParams } from 'react-router-dom';
import RestaurantDetails from './RestaurantDetails';

const RestaurantPage = () => {
  const { id } = useParams();
  
  return (
    <div>
      <RestaurantDetails restaurantId={id} />
    </div>
  );
};

export default RestaurantPage;