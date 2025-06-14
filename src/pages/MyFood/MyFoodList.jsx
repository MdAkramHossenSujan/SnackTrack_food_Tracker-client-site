import React, { use } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';

const MyFoodList = ({myFoodsPromise}) => {
    const foods=use(myFoodsPromise)
    console.log(foods)
    const handleDelete=(e)=>{
e.preventDefault()


    }
    return (
       <div className="overflow-x-auto py-28">
  <table className="table max-w-7xl mx-auto">
    {/* head */}
    <thead>
      <tr>
        <th>Food Description</th>
        <th>Amount</th>
        <th>Expiry date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        foods.map((food,index)=>
        <tr key={index}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-18 w-18">
               <Link to={`/fridgeFoods/${food._id}`}>
                <img
                  src={food.foodImage}
                  alt="Avatar Tailwind CSS Component" />
               </Link>
              </div>
            </div>
            <div>
              <div className="font-bold">{food.foodTitle}</div>
              <div className="text-sm opacity-50">{food.category}</div>
              <div className='text-sm opacity-70'>{food.brand}</div>
            </div>
          </div>
        </td>
        <td>
         {food.quantity} {food.unit}
          <br />
          <span className="badge badge-ghost badge-sm">{food.storageLocation}</span>
        </td>
       <td>{new Date(food.expiryDate).toLocaleString()}</td>
       <th className="flex my-5 gap-2 lg:gap-4">
  {/* Modify Button */}
  <button
    className="tooltip-trigger cursor-pointer"
    data-tooltip-id="modify-tooltip"
    data-tooltip-content="Modify this food item"
  >
    <MdEdit className="text-blue-500 text-lg" />
  </button>

  {/* Delete Button */}
  <button 
  onClick={handleDelete}
    className=" tooltip-trigger cursor-pointer"
    data-tooltip-id="delete-tooltip"
    data-tooltip-content="Delete this food item"
  >
    <MdDelete className="text-red-500 text-lg" />
  </button>

  {/* Tooltips */}
  <Tooltip id="modify-tooltip" place="top" />
  <Tooltip id="delete-tooltip" place="top" />
</th>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
    );
};

export default MyFoodList;