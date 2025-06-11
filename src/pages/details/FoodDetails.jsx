import React from 'react';
import { useLoaderData } from 'react-router';
import Countdown from 'react-countdown';
import {
  MdOutlineWatchLater,
  MdStorage,
  MdCategory,
  MdCalendarToday,
  MdLocalOffer
} from 'react-icons/md';

const FoodDetails = () => {
  const food = useLoaderData();
  console.log(food)
  const expiryDate = new Date(food.expiryDate);
  const addedDate = new Date(food.addedDate);

  return (
    <div className="min-h-screen py-24 lg:py-36 px-4 md:px-10 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Column 1: Image and Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={food.foodImage}
            alt={food.foodTitle}
            className="w-full max-h-[350px] object-cover rounded-xl shadow-md"
          />
          <h1 className="text-3xl font-bold">{food.foodTitle}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 font-medium">{food.brand}</p>
        </div>

        {/* Column 2: Details */}
        <div className="space-y-6">
          {/* Countdown Timer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
           {
            expiryDate >= new Date &&  (
                <div className="flex items-center gap-3 mb-3">
              <MdOutlineWatchLater className="text-red-500 text-2xl" />
              <h2 className="text-2xl font-semibold">Expires In</h2>
            </div>
            )
           }
            <Countdown
              date={expiryDate}
              renderer={({ days, hours, minutes, seconds, completed }) =>
                completed ? (
                  <span className="text-red-600 text-3xl font-bold">Expired</span>
                ) : (
                  <div className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {days}d {hours}h {minutes}m {seconds}s
                  </div>
                )
              }
            />
          </div>

          {/* Info Rows */}
          <div className="space-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-blue-500" />
              Added On: {addedDate.toLocaleDateString()}
            </div>
           {
            expiryDate >= new Date &&  <div className="flex items-center gap-2">
              <MdCalendarToday className="text-blue-500" />
              Will Expire On: {expiryDate.toLocaleDateString()}
            </div>
           }
            <div className="flex items-center gap-2">
              <MdCategory className="text-purple-500" />
              Category: {food.category}
            </div>
            <div className="flex items-center gap-2">
              <MdStorage className="text-green-500" />
              Storage: {food.storageLocation}
            </div>
            <div className="flex items-center gap-2">
              🧪 Quantity: {food.quantity} {food.unit}
            </div>
            <div className="flex items-start gap-2">
              <MdLocalOffer className="text-yellow-500 mt-1" />
              Notes: <span className="italic">{food.notes}</span>
            </div>
          </div>

          {/* Description Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {food.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
