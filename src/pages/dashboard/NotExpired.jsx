import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import noData from '../../assets/Animation/Animation - 1751316496789(No Data).json';
const NotExpired = () => {
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

  // handle loading and errors first
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load fridge data.
      </div>
    );
  }

  // fallback empty array
  const expiredFoods =
    data?.filter((food) => new Date(food.expiryDate) > today) || [];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        Not Expired Food
      </h2>

      {expiredFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={noData} loop autoplay className="w-40 md:w-96" />
          <h3 className="text-xl md:text-3xl font-semibold text-gray-600 mt-6 text-center">
            No matching food items found.
          </h3>
          <p className="text-gray-400 mt-2 text-sm md:text-base text-center max-w-md">
            Try adding some food items!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Storage</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {expiredFoods.map((food, index) => (
                <tr key={food._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={food.foodImage}
                      alt={food.foodTitle}
                      className="md:w-20 md:h-16 w-12 h-10 object-cover rounded-lg"
                    />
                  </td>
                  <td>{food.foodTitle}</td>
                  <td>{food.category}</td>
                  <td>
                    {food.quantity} {food.unit}
                  </td>
                  <td>
                    {new Date(food.expiryDate).toLocaleDateString()}
                  </td>
                  <td>{food.storageLocation}</td>
                  <td>{food.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotExpired;