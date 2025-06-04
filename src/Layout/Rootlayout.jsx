import React from 'react';
import NavBar from '../pages/Shared/NavBar';
import Footer from '../pages/Shared/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='poppins-regular'>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayout;