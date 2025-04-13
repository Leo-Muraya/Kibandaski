import React from 'react';
import CardButton from './CardButton';

const FoodItem = ({ item, restaurantId }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start p-4">
        <div className="flex-1 mr-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          )}
          <p className="text-orange-600 font-bold text-lg">
            Ksh {item.price?.toFixed(2) || '0.00'}
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <CardButton 
            foodItemId={item.id}
            restaurantId={restaurantId}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodItem;