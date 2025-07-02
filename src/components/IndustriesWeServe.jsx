import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHospital,
  FaStoreAlt,
  FaUtensils,
  FaWarehouse,
  FaIndustry,
  FaCartArrowDown,
} from 'react-icons/fa';

const industries = [
  {
    name: 'Hospitals',
    icon: FaHospital,
    color: 'text-red-500',
    bgGradient: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-700',
  },
  {
    name: 'Grocery Stores',
    icon: FaStoreAlt,
    color: 'text-green-500',
    bgGradient: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-700',
  },
  {
    name: 'Restaurants',
    icon: FaUtensils,
    color: 'text-yellow-500',
    bgGradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-700',
  },
  {
    name: 'Warehouses',
    icon: FaWarehouse,
    color: 'text-blue-500',
    bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-700',
  },
  {
    name: 'Food Industry',
    icon: FaIndustry,
    color: 'text-purple-500',
    bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-700',
  },
  {
    name: 'Online Retailers',
    icon: FaCartArrowDown,
    color: 'text-pink-500',
    bgGradient: 'from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-700',
  },
];

const IndustriesWeServe = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Industries We Serve
        </h2>
        <p className="text-gray-500 dark:text-gray-300 max-w-xl mx-auto text-lg">
          Trusted by businesses across diverse sectors to manage food expiry efficiently.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {industries.map((industry, index) => {
          const Icon = industry.icon;
          return (
            <motion.div
              key={index}
              className={`
                ${industry.bgGradient}
                rounded-xl
                shadow
                dark:shadow-black/30
                p-5
                flex flex-col items-center justify-center
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-105
                hover:shadow-lg
                hover:dark:shadow-pink-500/30
              `}
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Icon
                size={40}
                className={`${industry.color} drop-shadow-sm dark:drop-shadow-md`}
              />
              <h4 className="mt-3 text-base md:text-lg font-semibold text-gray-700 dark:text-gray-100 text-center">
                {industry.name}
              </h4>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default IndustriesWeServe;
