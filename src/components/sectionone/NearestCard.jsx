import React, { use } from "react";
import { motion } from "framer-motion";
import { MdFavorite } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const NearestCard = ({ nearestPromise }) => {
  const foods = use(nearestPromise);

  return (
    <div className="relative">
      <Swiper
        freeMode={true}
        mousewheel={true}
        keyboard={true}
        navigation={{ nextEl: ".swiper-next" }}
        modules={[FreeMode, Pagination, Navigation, Mousewheel, Keyboard]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1580: { slidesPerView: 4 },
        }}
        spaceBetween={20}
      >
        {foods.map((food, index) => (
          <SwiperSlide key={index} className="flex">
            <div className="h-full w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-400 rounded-2xl p-4 flex flex-col justify-between h-full"
              >
                {/* Top Info */}
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {food.brand}
                  </span>
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Expires: {new Date(food.expiryDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={food.foodImage}
                    alt={food.foodTitle}
                    className="w-48 h-48 object-cover rounded-xl"
                  />
                </div>

                {/* Bottom Content */}
                <div className="space-y-2 h-[156px]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {food.foodTitle}
                    </h2>
                    {food.isFavorite && (
                      <MdFavorite className="text-red-500 text-lg" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{food.description}</p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Quantity: {food.quantity} {food.unit}
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
                      <FaEye />
                      See Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Right Navigation with react-icons */}
      <div className="swiper-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <BsArrowRightCircleFill size={40} className="text-3xl text-blue-600 hover:text-blue-700 transition" />
      </div>
    </div>
  );
};

export default NearestCard;

