import React from 'react';
import ExpiredCard from './ExpiredCard';

const nearestPromise = fetch('https://food-expiry-tracker-server.vercel.app/expiredFoods').then(res => res.json());

const ExpiredFood = () => {
    return (
        <div className="max-w-7xl mx-auto my-12 md:px-8 px-4">
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400">
                    Oops! Some Items Have Expired
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto">
                    Review and remove expired items to keep your fridge fresh and safe.
                </p>
            </div>

            <ExpiredCard nearestPromise={nearestPromise} />
        </div>
    );
};

export default ExpiredFood;
