import React, { Suspense, use } from 'react';
import MyFoodList from './MyFoodList';
import useFoodsAPI from '../../hooks/useFoodsAPI';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const MyFood = () => {
const {user}=use(AuthContext)
console.log(user)
const {myFoodsPromise}=useFoodsAPI()
    return (
        <div>
            <Suspense fallback={<div className='min-h-screen max-w-screen mx-auto flex justify-center'>
           <span className="loading loading-spinner text-success"></span>
        </div>}>
                <MyFoodList myFoodsPromise={myFoodsPromise(user.email)}>

                </MyFoodList>
            </Suspense>
        </div>
    );
};

export default MyFood;