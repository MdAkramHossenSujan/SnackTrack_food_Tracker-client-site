import React, { Suspense, useEffect } from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import ExpiredFood from '../../components/sectionone/ExpiredFood';
import Nearest from '../../components/NearestExpiryFood/Nearest';
import Faq from '../../components/faq/Faq';
import CommentSection from '../../components/comment/Comment';



const Home = () => {
      useEffect(() => {
    document.title = `Home | Food App`; // Set page title
    window.scrollTo(0, 0); // Scroll to top
  }, []);
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
            <div>
<CommentSection/>
            </div>
            <div>
                <Faq/>
            </div>
        </div>
    );
};

export default Home;