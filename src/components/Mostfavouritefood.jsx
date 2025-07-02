import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';

const MostFavoriteFoods = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get('https://food-expiry-tracker-server.vercel.app/fridge')
      .then((res) => {
        const favItems = res.data
          .filter((item) => item.isFavorite)
          .slice(0, 4);
        setFavorites(favItems);
      })
      .catch((err) => {
        console.error('Failed to fetch favorites:', err);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
          Most Favorite Picks
        </h2>
        <p className="text-gray-500 dark:text-gray-300 max-w-xl mx-auto text-lg">
          Highlighting the foods most loved by our users.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {favorites.map((food, index) => (
          <motion.div
            key={food._id}
            className="bg-white dark:bg-base-200 rounded-xl shadow-md dark:shadow-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={food.foodImage}
              alt={food.foodTitle}
              className="w-full h-48 lg:h-38 object-cover rounded-t-xl"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {food.foodTitle}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {food.description.slice(0, 80)}...
              </p>
              <div className="flex justify-between mt-4 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  Qty: <span className="font-medium">{food.quantity} {food.unit}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Storage: <span className="font-medium">{food.storageLocation}</span>
                </p>
              </div>
              <Link
                to={`/fridgeFoods/${food._id}`}
                className="btn btn-sm btn-outline border-green-600 text-green-600 hover:text-white hover:bg-green-500 btn-accent w-full mt-4"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MostFavoriteFoods;
