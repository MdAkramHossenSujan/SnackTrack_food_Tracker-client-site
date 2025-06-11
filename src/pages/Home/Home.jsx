import React, { Suspense } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import ExpiredFood from '../../components/sectionone/ExpiredFood';
import Nearest from '../../components/NearestExpiryFood/Nearest';



const Home = () => {
    return (
        <div>
            <div>
                <Banner/>
            </div>
            <div>
                <HowItWorks/>
            </div>
            <div>
                <Nearest/>
            </div>
            <div>
                <ExpiredFood/>
            </div>
        </div>
    );
};

export default Home;