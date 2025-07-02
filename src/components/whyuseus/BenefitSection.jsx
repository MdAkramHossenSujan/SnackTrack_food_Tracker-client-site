import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaClock, FaMoneyBillWave, FaHeartbeat } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaLeaf className="text-green-500 w-10 h-10" />,
    title: 'Reduce Waste',
    description:
      'Track expiry dates and avoid throwing away good food, helping the planet and your wallet.',
  },
  {
    icon: <FaClock className="text-blue-500 w-10 h-10" />,
    title: 'Save Time',
    description:
      'Quickly see what’s expiring soon and plan meals or shopping trips efficiently.',
  },
  {
    icon: <FaMoneyBillWave className="text-yellow-500 w-10 h-10" />,
    title: 'Save Money',
    description:
      'Reduce unnecessary purchases and lower your grocery expenses by keeping food fresh.',
  },
  {
    icon: <FaHeartbeat className="text-red-500 w-10 h-10" />,
    title: 'Stay Healthy',
    description:
      'Avoid consuming expired food and keep your family safe and healthy every day.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const BenefitsSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200"
        >
          Why Choose Food Expiry Tracker?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="card bg-base-100 hover:-translate-y-1 dark:shadow-blue-400 shadow-gray-600 shadow hover:shadow-md transition-all duration-300 p-6"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
                {benefit.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
