// About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineFoodBank, MdAccessTime, MdNote, MdUpdate, MdAddCircle } from 'react-icons/md';

const features = [
  {
    icon: <MdAddCircle className="text-4xl text-green-600" />,
    title: 'Add Foods',
    description: 'Add food with category, storage location, quantity, and expiry date.'
  },
  {
    icon: <MdAccessTime className="text-4xl text-red-500" />,
    title: 'Countdown Timer',
    description: 'Each food has a live countdown showing time left before expiry.'
  },
  {
    icon: <MdNote className="text-4xl text-blue-500" />,
    title: 'Add Notes',
    description: 'Write custom notes per food item to track changes or reminders.'
  },
  {
    icon: <MdUpdate className="text-4xl text-yellow-500" />,
    title: 'Update/Delete',
    description: 'Easily update or remove any food entry from your list.'
  },
  {
    icon: <MdOutlineFoodBank className="text-4xl text-purple-600" />,
    title: 'Reduce Waste',
    description: 'Get alerts before expiration and reduce food waste effortlessly.'
  }
];

const About = () => {
  return (
    <motion.div
      className="min-h-screen px-6 py-28 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          About SnackTrack
        </motion.h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          SnackTrack is a powerful and user-friendly food expiry tracker that helps you monitor your fridge and pantry,
          reduce waste, and save money. Whether you're a student, homemaker, or just health-conscious, it's the tool you need.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 text-left space-y-3"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
