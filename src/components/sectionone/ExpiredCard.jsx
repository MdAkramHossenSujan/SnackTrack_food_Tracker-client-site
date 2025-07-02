import React, { use } from "react";
import { MdFavorite } from "react-icons/md";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";

const ExpiredCard = ({ nearestPromise }) => {
  const foods = use(nearestPromise);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: false });

  // Navigation handlers
  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative max-w-full">
      {/* Carousel container */}
      <div
        className="overflow-hidden rounded-3xl"
        ref={emblaRef}
      >
        <div className="flex gap-6 px-2 py-6">
          {foods.map((food, index) => (
            <div
              key={index}
              className="flex-none w-[300px] bg-gradient-to-tr from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-300 dark:border-gray-700 rounded-3xl p-5 flex flex-col justify-between
              shadow-md hover:shadow-2xl transform hover:scale-[1.03] transition duration-300 ease-in-out cursor-pointer"
            >
              {/* Top Info */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-md">
                  {food.brand}
                </span>
                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide shadow-md animate-pulse">
                  Expired
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={food.foodImage}
                  alt={food.foodTitle}
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>

              {/* Bottom Content */}
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate drop-shadow-sm">
                      {food.foodTitle}
                    </h2>
                    {food.isFavorite && (
                      <MdFavorite className="text-red-500 text-2xl drop-shadow-md" />
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3 leading-relaxed">
                    {food.description}
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Quantity:{" "}
                    <span className="font-semibold">{food.quantity} {food.unit}</span>
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    Expires:{" "}
                    <span className="font-semibold">
                      {new Date(food.expiryDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <Link to={`/fridgeFoods/${food._id}`}>
                    <button
                      className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl
                      shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                      aria-label={`View details of ${food.foodTitle}`}
                    >
                      <FaEye />
                      See Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
  onClick={scrollPrev}
  className="
    absolute top-1/2 left-3 transform -translate-y-1/2 z-30 
    bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900
    rounded-full p-3 shadow-lg 
    hover:from-green-500 hover:to-green-700 cursor-pointer dark:hover:from-green-800 dark:hover:to-green-900
    focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-60
    transition duration-300 ease-in-out
    active:scale-95
    flex items-center justify-center
  "
  aria-label="Previous"
>
  <FaChevronLeft
    className="text-white drop-shadow-md"
    size={24}
  />
</button>

<button
  onClick={scrollNext}
  className="
    absolute top-1/2 right-3 transform -translate-y-1/2 z-30
    bg-gradient-to-br from-green-400 to-green-600 dark:from-green-700 dark:to-green-900
    rounded-full p-3 shadow-lg
    hover:from-green-500 hover:to-green-700 dark:hover:from-green-800 cursor-pointer dark:hover:to-green-900
    focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-60
    transition duration-300 ease-in-out
    active:scale-95
    flex items-center justify-center
  "
  aria-label="Next"
>
  <FaChevronRight
    className="text-white drop-shadow-md"
    size={24}
  />
</button>

    </div>
  );
};

export default ExpiredCard;



