import React from 'react';
import useAxios from './useAxios';

const useApplicationAPI = () => {
    const axiosSecure=useAxios()
    const myApplicationPromise=email=>{
        return axiosSecure.get(`applications?email=${email}`).then(res=>res.data)
    }
    return {
        myApplicationPromise
    }
};

export default useApplicationAPI;