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
    text: "Never forget what's in your fridge. Track food items effortlessly and get notified before they expire.",
    btn: "Start Tracking",
  },
  {
    img: two,
    text: "Reduce food waste by staying ahead. Add, edit, and manage food items with ease using our smart expiry tracker.",
    btn: "Explore",
  },
  {
    img: three,
    text: "Built for reliability and control. Secure authentication and full CRUD operations ensure your data stays safe.",
    btn: "Learn More",
  },
];


const Banner = () => {
  return (
    <div className="h-[300px] md:h-[460px] w-full my-16">
      <Swiper
        direction={'vertical'}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="h-full"
      >
        {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
  <div className="relative w-full h-full">
    {/* Darkened Background Image */}
    <div className="absolute inset-0">
      <img
        src={slide.img}
        alt={`Slide ${idx + 1}`}
        className="w-full h-full object-cover brightness-[30%]"
      />
    </div>

    {/* Text Content */}
    <div className="absolute inset-0 flex items-center px-6 md:px-12">
      <div className="text-white z-10 max-w-lg lg:max-w-2xl xl:max-w-3xl">
        <motion.p
initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)", y: -30 }}
animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
transition={{ duration: 1.2 }}

  className="text-3xl lg:text-4xl xl:text-5xl mb-2 font-extrabold"
>
  Take food before expiring
</motion.p>
        <p className=" lg:text-xl text-gray-400 mb-4">{slide.text}</p>
        <button className="btn md:btn-lg rounded-3xl bg-green-800 hover:bg-white hover:text-black text-white border-none">
          {slide.btn}
        </button>
      </div>
    </div>
  </div>
</SwiperSlide>



        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
