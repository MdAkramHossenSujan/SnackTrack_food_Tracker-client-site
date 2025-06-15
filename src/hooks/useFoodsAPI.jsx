import React from 'react';
import useAxios from './useAxios';

const useFoodsAPI = () => {
    const axiosSecure=useAxios()
    const myFoodsPromise=email=>{
        return axiosSecure.get(`fridgeFoods/myItems?email=${email}`).then(res=>res.data)
    }
    return {
        myFoodsPromise
    }
};

export default useFoodsAPI;