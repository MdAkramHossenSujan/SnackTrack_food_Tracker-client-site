import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
const {user,loading}=use(AuthContext)
const location=useLocation()
 if(loading){
        return <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
           <span className="loading loading-spinner text-success"></span>
        </div>
    }
if(!user){
   return <Navigate to={'/signin'} state={location.pathname}></Navigate>
}
    return children;
};

export default PrivateRoute;