import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Lottie from 'lottie-react';
import noData from '../../assets/Animation/Animation - 1751316496789(No Data).json';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const MyAddedFood = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fridgeFoods'],
    queryFn: async () => {
      const res = await axios.get(
        'https://food-expiry-tracker-server.vercel.app/fridge'
      );
      return res.data;
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `https://food-expiry-tracker-server.vercel.app/fridgeFoods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['fridgeFoods']);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your food item has been deleted.',
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Something went wrong.',
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this food item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen py-12">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Failed to load data.
      </div>
    );
  }

  const myFoods =
    data?.filter((food) => food.userEmail === user.email) || [];

  const today = new Date();

  return (
    <div className="max-w-7xl mx-auto p-4 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
          My Added Foods
        </h2>
        <Link
          to="/addFood"
          className="btn bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 px-4 py-2 shadow-md dark:shadow-none"
        >
          <FaPlus size={14} />
          Add Food
        </Link>
      </div>

      {myFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Lottie animationData={noData} loop autoplay className="w-48 md:w-96" />
          <h3 className="text-xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 mt-6 text-center">
            No matching food items found.
          </h3>
          <p className="text-gray-400 dark:text-gray-400 mt-2 text-center max-w-md">
            Try adding some food items to see them here!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-lg bg-white dark:bg-gray-800">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Expiry Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {myFoods.map((food, index) => {
                const expiryDate = new Date(food.expiryDate);
                const isExpired = expiryDate < today;

                return (
                  <tr
                    key={food._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                      {food.foodTitle}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{food.category}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {food.quantity} {food.unit}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {expiryDate.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {isExpired ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300">
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Not Expired
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="flex items-center gap-1 text-white cursor-pointer bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs md:text-sm"
                        >
                          <FaTrash size={12} />
                          Delete
                        </button>

                        <Link to={`/updateFood/${food._id}`}>
                          <button className="flex items-center gap-1 cursor-pointer text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs md:text-sm">
                            <FaEdit size={12} />
                            Update
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAddedFood;



