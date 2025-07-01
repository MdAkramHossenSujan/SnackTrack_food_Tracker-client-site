import React, { use } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router';

const NearestCad = ({nearestPromise}) => {
const foods=use(nearestPromise)
const displayFoods=foods.slice(0,6)
console.log(displayFoods)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
  displayFoods.map((food, index) => (
  <div key={index} className="w-full p-3">
    <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition rounded-2xl overflow-hidden flex flex-col h-full">
      
      {/* Header Tag */}
      <div className="flex justify-between items-center px-4 pt-4">
        <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {food.brand}
        </span>
        {food.isFavorite && <MdFavorite className="text-red-500 text-xl" />}
      </div>

      {/* Food Image */}
      <div className="flex justify-center items-center px-4 py-3">
        <img
          src={food.foodImage}
          alt={food.foodTitle}
          className="rounded-xl object-cover w-full h-44"
        />
      </div>

      {/* Food Details */}
      <div className="flex-grow px-4 pb-4 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {food.foodTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {food.description}
          </p>

          <div className="text-sm text-gray-700 dark:text-gray-400">
            <p>
              <span className="font-medium">Quantity:</span> {food.quantity} {food.unit}
            </p>
            <p>
              <span className="font-medium">Expires:</span>{" "}
              {new Date(food.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex justify-end">
          <Link to={`/fridgeFoods/${food._id}`}>
            <button className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm bg-green-600 border-green-800 border text-white font-semibold rounded-xl  transition duration-200">
              <FaEye />
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
))


            }
        </div>
    );
};

export default NearestCad;