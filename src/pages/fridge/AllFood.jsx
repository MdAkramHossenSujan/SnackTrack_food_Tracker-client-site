import React, { use } from 'react';
import FoodCard from './FoodCard';
const fridgeFoodPromise=fetch('http://localhost:5000/fridgeFoods').then(res=>res.json())
const AllFood = () => {
    const foods=use(fridgeFoodPromise)
    console.log(foods)
    return (
        <div className=' py-18'>
             <h2 className='text-center py-2 text-2xl font-extrabold md:text-3xl lg:text-4xl'>Fridge For Your Foods</h2>
            <div className='max-w-7xl  pt-16 px-8 grid grid-cols-1 mx-auto gap-x-6 gap-y-16 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2'>
           
            {
                foods.map((food,index)=><FoodCard key={index} food={food}>

                </FoodCard>)
            }
        </div>
        </div>
    );
};

export default AllFood;