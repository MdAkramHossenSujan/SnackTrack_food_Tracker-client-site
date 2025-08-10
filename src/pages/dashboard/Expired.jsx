import React, { use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Lottie from 'lottie-react';
import noData from '../../assets/Animation/Animation - 1751316496789(No Data).json';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Expired = () => {
  const {user} = use(AuthContext
  )
   useEffect(() => {
              document.title = `Expired | Dashboard | SnackTrack`;
              window.scrollTo(0, 0);
          }, []);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fridgeFoods'],
    queryFn: async () => {
      const res = await axios.get(
        'https://food-expiry-tracker-server.vercel.app/fridge'
      );
      return res.data;
    },
  });

  const today = new Date();

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen py-12">
        <span className="loading loading-spinner text-green-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 font-semibold">
        Failed to load fridge data.
      </div>
    );
  }
  const myFoods =
  data?.filter((food) => food.userEmail === user.email) || [];
  const expiredFoods =
    myFoods?.filter((food) => new Date(food.expiryDate) < today) || [];

  return (
    <div className="max-w-7xl mx-auto md:p-6 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-6 text-red-700 dark:text-red-500">
       Your Expired Foods
      </h2>

      {expiredFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Lottie animationData={noData} loop autoplay className="w-48 md:w-72" />
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-6 text-center">
            No expired food items found.
          </h3>
          <p className="text-gray-400 dark:text-gray-500 mt-3 max-w-md text-center">
            You don't have any expired foods yet. Keep adding fresh items to track!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg bg-white dark:bg-gray-800">
          <table className="min-w-full text-left text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Storage</th>
                <th className="py-3 px-4">Brand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {expiredFoods.map((food, index) => (
                <tr
                  key={food._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="md:w-20 md:h-16 w-12 h-10  object-cover rounded-lg shadow-md"
                      loading="lazy"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-semibold">{food.foodTitle}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{food.category}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {food.quantity} {food.unit}
                  </td>
                  <td className="py-3 px-4 text-red-600 dark:text-red-400 font-semibold">
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{food.storageLocation}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{food.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Expired;

