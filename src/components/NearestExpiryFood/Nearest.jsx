import React from 'react';
import NearestCad from './NearestCad';

const nearestPromise = fetch('https://food-expiry-tracker-server.vercel.app/nearestFoods').then(res => res.json());

const Nearest = () => {
    return (
        <div className="max-w-7xl mx-auto my-12 md:px-8 px-4">
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-extrabold dark:text-transparent text-gray-500 bg-clip-text dark:bg-gradient-to-r from-green-500 via-yellow-600 to-green-700">
                    Don’t Let Good Food Go to Waste!
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto">
                    Keep an eye on the items nearing expiry and plan your meals smartly.
                </p>
            </div>

            <NearestCad nearestPromise={nearestPromise} />
        </div>
    );
};

export default Nearest;
