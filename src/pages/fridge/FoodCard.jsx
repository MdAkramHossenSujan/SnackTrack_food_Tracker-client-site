import { FaExclamationTriangle, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import { Link } from 'react-router';

const FoodCard = ({ food }) => {
    const {
        foodImage,
        foodTitle,
        category,
        quantity,
        expiryDate,
        unit,
        _id
    } = food;

    const now = new Date();
    const isExpired = new Date(expiryDate) < now;
    const formattedExpiry = format(new Date(expiryDate), 'MMM dd, yyyy');

    return (
        <div className="relative bg-[#022105] dark:bg-[#0c0c19] text-white rounded-xl p-4 pt-12 shadow-lg hover:shadow-xl transition duration-300">
            {/* Food Image (Rounded & Partly Outside) */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                <img
                    src={foodImage}
                    alt={foodTitle}
                    className="w-30 hover:scale-120 h-30 object-cover rounded-full border-4 border-white shadow-md"
                />
            </div>

            <div className="mt-10 text-center md:h-[119px]">
                {isExpired && (
                    <div className=" bg-red-600 mx-auto my-1 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 text-center w-[80px]">
                        <FaExclamationTriangle size={12} />
                        Expired
                    </div>
                )}
                <h2 className="text-lg font-semibold">{foodTitle}</h2>
                <p className="text-sm text-gray-300">Category: {category}</p>
                <p className="text-sm text-gray-300 mb-1">
                    Quantity: {quantity} {unit}
                </p>
                <p className="text-sm text-gray-400">Expires: {formattedExpiry}</p>
            </div>

            {/* See Details Button */}
            <Link to={`/fridgeFoods/${_id}`}>
            <button className="mt-4 w-full flex items-center cursor-pointer justify-center gap-2 bg-white text-[#2f2a2a] hover:bg-gray-800 hover:text-white font-medium text-sm py-2 rounded-lg transition">
                <FaEye />
                See Details
            </button>
            </Link>
        </div>
    );
};

export default FoodCard;

