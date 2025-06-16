import React from 'react';
import NearestCad from './NearestCad';
const nearestPromise = fetch('http://localhost:5000/nearestFoods').then(res => res.json())
const Nearest = () => {
    return (
        <div className='max-w-7xl mx-auto my-8 px-8'>
            <h2 className='text-3xl font-bold py-6'>Expiring Soon</h2>
            <NearestCad nearestPromise={nearestPromise}>

            </NearestCad>
        </div>
    );
};

export default Nearest;