import React, { use } from 'react';
import { useLoaderData } from 'react-router';
import Countdown from 'react-countdown';
import {
  MdOutlineWatchLater,
  MdStorage,
  MdCategory,
  MdCalendarToday,
  MdLocalOffer
} from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const FoodDetails = () => {
  const food = useLoaderData();
  const { user } = use(AuthContext)
  console.log(food, user)
  const expiryDate = new Date(food.expiryDate);
  const addedDate = new Date(food.addedDate);
  const handleNote = (e) => {
    e.preventDefault()
    const time = new Date
    const addedTime = time.toISOString()
    console.log(addedTime)
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    axios.patch(`http://localhost:5000/fridgeFoods/${food._id}`, data,
      {
  headers: {
    Authorization: `Bearer ${user.accessToken}` // Ensure this is set
  }
}
    ).then(res => {
      if (res.status === 200) {
        toast.success(`Your Note added successfully`)
      }
      form.reset()
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
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
              expiryDate >= new Date && (
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
              expiryDate >= new Date && <div className="flex items-center gap-2">
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
            <div>
              {
    food.notes && (
      <p className="italic">
        <span className="font-medium">Note:</span> {food.notes}
      </p>
    )
  }
            </div>
            <div>
  {food?.newNotes &&
    <div className="space-y-3">
      {food.newNotes?.map((item, index) => (
        <div key={index} className="dark:bg-green-800 px-2 py-3 dark:text-white rounded-xl bg-green-200 shadow-sm">
          <p className=" bg-blue-400 rounded-2xl px-3 py-2 text-white font-semibold">
            {item.note}
          </p>
          <p className="text-xs px-2 mt-1">
            Added on: {new Date(item.addedTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
}
</div>

          </div>

          {/* Description Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {food.description}
            </p>
          </div>
          <div>
            {
              user?.email == food?.userEmail &&
              <form onSubmit={handleNote}>
                <textarea required name='note' placeholder="Type Note About the food" className="textarea w-full textarea-md"></textarea>
                <div className='flex justify-end mt-3'>
                  <button className='btn btn-primary rounded-2xl'>Add Note</button>
                </div>
              </form>
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDetails;
