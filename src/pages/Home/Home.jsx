import React, { Suspense, useEffect } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import ExpiredFood from '../../components/sectionone/ExpiredFood';
import Nearest from '../../components/NearestExpiryFood/Nearest';
import Faq from '../../components/faq/Faq';
import CommentSection from '../../components/comment/Comment';
import BenefitsSection from '../../components/whyuseus/BenefitSection';
import IndustriesWeServe from '../../components/IndustriesWeServe';
import MostFavoriteFoods from '../../components/Mostfavouritefood';



const Home = () => {
    useEffect(() => {
        document.title = `Home | Food App`; // Set page title
        window.scrollTo(0, 0); // Scroll to top
    }, []);
    return (
        <div>
            <div>
                <Banner />
            </div>
            <div>
                <HowItWorks />
            </div>
            <div>
                <BenefitsSection/>
            </div>

            <div>
                <Nearest />
            </div>
            <div>
                <MostFavoriteFoods/>
            </div>
            <div>
                <ExpiredFood />
            </div>
            <div>
                <CommentSection />
            </div>
            <div>
                <IndustriesWeServe/>
            </div>
            <div>
                <Faq />
            </div>
        </div>
    );
};

export default Home;