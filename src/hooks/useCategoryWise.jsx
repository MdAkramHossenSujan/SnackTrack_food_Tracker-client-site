import React from 'react';
import useAxios from './useAxios';

const useCategoryWise = () => {
    const axiosSecure=useAxios();
    console.log(axiosSecure)
    const categoryPromise=category=>{
        return axiosSecure.get(`fridgeFoods?category=${category}`).then(res=>res.data
        );
    }
    return {
        categoryPromise
    }
};

export default useCategoryWise;