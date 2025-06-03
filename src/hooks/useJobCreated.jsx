import React from 'react';
import useAxios from './useAxios';

const useJobCreated = () => {
    const axiosSecure=useAxios();
    console.log(axiosSecure)
    const myJobPostedPromise=email=>{
        return axiosSecure.get(`jobs/applications?email=${email}`).then(res=>res.data
        );
    }
    return {
        myJobPostedPromise
    }
};

export default useJobCreated;