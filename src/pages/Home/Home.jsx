import React, { Suspense } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import NearestExpiry from '../../components/sectionone/NearestExpiry';


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
                <NearestExpiry/>
            </div>
        </div>
    );
};

export default Home;