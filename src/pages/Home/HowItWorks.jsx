import React from 'react';
import {
  FaSearch,
  FaUserPlus,
  FaInfoCircle,
  FaClock,
  FaTasks
} from 'react-icons/fa';
import { motion } from "framer-motion"
const HowItWorks = () => {
  const steps = [
  {
    icon: <FaSearch size={40} className="text-green-600 dark:text-green-400" />,
    title: 'Search Foods',
    description:
      'Quickly search through your food inventory to check what items are stored. Use filters to narrow down by type, date, or location.',
  },
  {
    icon: <FaUserPlus size={40} className="text-green-600 dark:text-green-400" />,
    title: 'Create Account',
    description:
      'Sign up to securely store and access your food records anytime. Your data stays synced and protected for personalized tracking.',
  },
  {
    icon: <FaInfoCircle size={40} className="text-green-600 dark:text-green-400" />,
    title: 'Explore Details',
    description:
      'View expiry dates, storage tips, and nutritional insights for each food item. Stay informed and organized with essential info.',
  },
  {
    icon: <FaClock size={40} className="text-green-600 dark:text-green-400" />,
    title: 'Track Expiry',
    description:
      'Get smart reminders before food items expire. Set notifications so you never forget to use or donate items before they spoil.',
  },
  {
    icon: <FaTasks size={40} className="text-green-600 dark:text-green-400" />,
    title: 'Manage Inventory',
    description:
      'Easily add, edit, or remove food items from your digital pantry. Update quantities and expiry dates in a few simple clicks.',
  },
];
    return (
            <div className="max-w-7xl mx-auto px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">How it works</h2>
      
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
  {steps.map((step, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.4, duration: 0.6, ease: "easeOut" }}
      className="flex items-start space-x-4 p-4 rounded-xl transition-colors duration-300"
    >
      <div>{step.icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-1">
          {step.title.toUpperCase()}
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  ))}
</div>
    </div>
        
    );
};

export default HowItWorks;