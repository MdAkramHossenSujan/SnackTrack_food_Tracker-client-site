import React from 'react';
import { useLoaderData } from 'react-router';

const FoodDetails = () => {
    const food=useLoaderData()
    console.log(food)
    return (
        <div className='py-18'>
            
        </div>
    );
};

export default FoodDetails;