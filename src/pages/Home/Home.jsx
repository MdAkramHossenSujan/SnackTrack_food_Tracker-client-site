import React, { Suspense } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';


const Home = () => {
    return (
        <div>
            <div>
                <Banner/>
            </div>
            <div>
                <HowItWorks/>
            </div>
        </div>
    );
};

export default Home;