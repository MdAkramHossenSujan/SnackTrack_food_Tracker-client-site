import React from 'react';
import one from '../../assets/Image/banner_one.jpg';
import two from '../../assets/Image/banner_two.jpg';
import three from '../../assets/Image/banner_three.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    img: one,
    heading: "Take food before expiring",
    subHeading: "Smart Food Expiry Tracker",
    text: "Never forget what's in your fridge. Add Food to remember expiry times and get timely notifications.",
    btn: "Start Tracking",
  },
  {
    img: two,
    heading: "Reduce food waste by staying ahead",
    subHeading: "Manage Your Pantry",
    text: "Create your own fridge, add, edit and manage food items easily with our smart expiry tracker.",
    btn: "Explore",
  },
  {
    img: three,
    heading: "Built for reliability and control",
    subHeading: "Secure & User Friendly",
    text: "Enjoy secure authentication and full CRUD operations, keeping your data safe and accessible.",
    btn: "Learn More",
  },
];

const Banner = () => {
  return (
    <div className="h-[60vh] md:min-h-screen w-full my-16 relative">
      <Swiper
        direction={'horizontal'}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover brightness-75 dark:brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-20 max-w-4xl px-6 md:px-20 text-center md:text-left">
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-green-400 font-semibold uppercase tracking-widest mb-2 text-sm md:text-base"
                >
                  {slide.subHeading}
                </motion.h4>

                <motion.h2
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4"
                >
                  {slide.heading}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="text-gray-300 text-sm md:text-lg max-w-lg mb-8 drop-shadow-md"
                >
                  {slide.text}
                </motion.p>

                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-3xl px-8 py-3 md:px-12 md:py-4 shadow-lg hover:shadow-2xl transition"
                >
                  {slide.btn}
                  <svg
                    className="ml-3 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                  </svg>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Style */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #34d399; /* Tailwind green-400 */
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
};

export default Banner;

