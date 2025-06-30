import axios from 'axios';
import React, { use, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';
import noData from '../../assets/Animation/Animation - 1751316496789(No Data).json'
import Lottie from 'lottie-react';
const MyFoodList = ({ myFoodsPromise }) => {
  const {user}=use(AuthContext)
  console.log(user)
  const resolvedFoods = use(myFoodsPromise);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    setFoods(resolvedFoods);
  }, [resolvedFoods]);

  const handleDelete = (id) => {
     Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
     axios
      .delete(`https://food-expiry-tracker-server.vercel.app/fridgeFoods/${id}`,{
  headers: {
    Authorization: `Bearer ${user.accessToken}`
  }
}).then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    })
          const remaining = foods.filter(food => food._id !== id);
          setFoods(remaining);
        } else {
          toast.error('Item not found or already deleted');
        }
      })
    ;
  }
}).catch((err) => {
        console.error(err);
        toast.error('Something went wrong');
      });
  };
 if (foods.length === 0) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-base-100">
      <div className="w-48 md:w-96 lg:w-[540px]">
        <Lottie animationData={noData} loop autoplay />
      </div>
      <h3 className="text-2xl font-semibold mt-6 text-center text-gray-600">
        No food items found.
      </h3>
      <p className="mt-2 max-w-md text-center text-gray-400">
        You haven't added any food items yet. Try adding some to see them here!
      </p>
    </div>
  );
}
  return (
    <div className="overflow-x-auto px-4 py-28">
      <table className="table max-w-7xl mx-auto">
        <thead>
          <tr>
            <th>Food Description</th>
            <th>Amount</th>
            <th>Expiry date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-18 w-18">
                      <Link to={`/fridgeFoods/${food._id}`}>
                        <img
                          src={food.foodImage}
                          alt="Food"
                        />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{food.foodTitle}</div>
                    <div className="text-sm opacity-50">{food.category}</div>
                    <div className="text-sm opacity-70">{food.brand}</div>
                  </div>
                </div>
              </td>
              <td>
                {food.quantity} {food.unit}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {food.storageLocation}
                </span>
              </td>
              <td>{new Date(food.expiryDate).toLocaleString()}</td>
              <th className="flex my-5 gap-2 lg:gap-4">
                <Link to={`/updateFood/${food._id}`}>
                  <button
                    className="tooltip-trigger my-2 cursor-pointer"
                    data-tooltip-id="modify-tooltip"
                    data-tooltip-content="Modify this food item"
                  >
                    <MdEdit className="text-blue-500 text-lg" />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="tooltip-trigger  cursor-pointer"
                  data-tooltip-id="delete-tooltip"
                  data-tooltip-content="Delete this food item"
                >
                  <MdDelete className="text-red-500 my-auto text-lg" />
                </button>
                <Tooltip id="modify-tooltip" place="top" />
                <Tooltip id="delete-tooltip" place="top" />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFoodList;
