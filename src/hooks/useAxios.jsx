import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'https://career-code-server-roan.vercel.app/'
})
const useAxios = () => {
    const { user, logOut } = use(AuthContext)
    axiosInstance.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config;
    })
    axiosInstance.interceptors.response.use(response => {
        return response
    }, error => {
        if (error.status === 401 || error.status === 403) {
            logOut().then(() => {
                // console.log('Signed Out for 401')
            }).catch(err => {
                console.log(err)
            })
        }
        return Promise.reject(error)
    })
    return axiosInstance;
};

export default useAxios;