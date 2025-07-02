import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import { Link } from 'react-router';

const FoodCard = ({ food }) => {
  const {
    foodImage,
    foodTitle,
    category,
    quantity,
    expiryDate,
    unit,
    _id,
  } = food;

  const now = new Date();
  const isExpired = new Date(expiryDate) < now;

  return (
    <div
      className="
        relative 
         border-gray-400
        dark:from-[#0c0c19] dark:to-[#1f1f3a]  
        rounded-2xl 
        dark:border-gray-500 border
        p-6 
        pt-16 
        shadow-xl 
        hover:scale-[1.02] 
        hover:-translate-y-2
        transition 
        duration-300 
        ease-in-out
      "
    >
      {/* Decorative blurred circle */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-400 opacity-20 blur-3xl pointer-events-none"></div>

      {/* Food Image */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
        <img
          src={foodImage}
          alt={foodTitle}
          className="
            w-28 h-28 
            object-cover 
            rounded-full 
            border-2 border-gray-300 
            shadow-lg 
            transition-transform 
            duration-300 
            hover:scale-110 
            hover:shadow-2xl
          "
        />
      </div>

      <div className="mt-4 text-center space-y-2 md:min-h-[90px]">
        {isExpired && (
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-full shadow">
            <FaExclamationTriangle size={12} />
            <span>Expired</span>
          </div>
        )}

        <h2 className="text-lg md:text-xl font-bold">{foodTitle}</h2>
        <p className="text-sm ">Category: {category}</p>
        <p className="text-sm ">
          Quantity: {quantity} {unit}
        </p>
      </div>

      <Link to={`/fridgeFoods/${_id}`}>
        <button
          className="
            mt-5 w-full flex items-center justify-center gap-2 
            bg-white 
            border border-gray-400
            text-[#1d3e2d]
            cursor-pointer  
            font-semibold 
            text-sm 
            py-2.5 
            rounded-xl 
            shadow 
            hover:shadow-lg 
            transition-all
            duration-300
          "
        >
          <FaEye className="transition-transform duration-300 cursor-pointer group-hover:translate-x-1" />
          See Details
        </button>
      </Link>
    </div>
  );
};

export default FoodCard;



