import React from 'react';
import NearestCard from './ExpiredCard';
import ExpiredCard from './ExpiredCard';
const nearestPromise = fetch('http://localhost:5000/expiredFoods').then(res => res.json())
const ExpiredFood = () => {
    return (
        <div className='max-w-7xl mx-auto my-8 px-8'>
            <h2 className='text-3xl font-bold py-6'>Expired Food</h2>
           <ExpiredCard nearestPromise={nearestPromise}>

           </ExpiredCard>
        </div>
    );
};

export default ExpiredFood;