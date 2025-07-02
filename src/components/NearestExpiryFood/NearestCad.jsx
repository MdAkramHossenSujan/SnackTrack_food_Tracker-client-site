import React, { use } from 'react';
import { FaEye, FaWeightHanging, FaCalendarAlt } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router';

const NearestCad = ({ nearestPromise }) => {
  const foods = use(nearestPromise);
  const displayFoods = foods.slice(0, 6);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {displayFoods.map((food) => (
        <div
          key={food._id}
          className="w-full h-full group hover:shadow-md hover:rounded-2xl dark:shadow-green-300 hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative flex flex-col h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden">

            {/* Brand Badge and Favorite Icon */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {food.brand}
              </span>
            </div>
            {food.isFavorite && (
              <div className="absolute top-3 right-3 z-10">
                <MdFavorite className="text-red-500 text-2xl drop-shadow" />
              </div>
            )}

            {/* Food Image */}
            <div className="overflow-hidden">
              <img
                src={food.foodImage}
                alt={food.foodTitle}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow p-5">
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white truncate">
                  {food.foodTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {food.description}
                </p>

                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <FaWeightHanging className="text-green-500 dark:text-green-400" />
                    <span className="font-medium">Quantity:</span>{" "}
                    {food.quantity} {food.unit}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-rose-500 dark:text-rose-400" />
                    <span className="font-medium">Expires:</span>{" "}
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Link to={`/fridgeFoods/${food._id}`}>
                  <button className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-600 hover:to-green-700 rounded-xl transition duration-200">
                    <FaEye className="text-white" />
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NearestCad;
