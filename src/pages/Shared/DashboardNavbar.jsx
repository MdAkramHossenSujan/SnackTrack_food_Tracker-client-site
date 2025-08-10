import React, { use } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const DashboardNavbar = () => {
    const {user} = use(AuthContext)
    console.log(user)
    return (
        <div>
            <p></p>
        </div>
    );
};

export default DashboardNavbar;