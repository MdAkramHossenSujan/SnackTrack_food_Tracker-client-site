import React from 'react';
import { motion } from "motion/react"
import teamone from '../../assets/Image/colleagues-working-project-discussing-details.jpg'
import teamtwo from '../../assets/Image/inspire-your-teamwork-keep-achieving-group-asian-team-creative-business-people-hand-raise-up-partnership-teamwork-concept-modern-office-background.jpg'
const Banner = () => {
    return (
        <div className="hero py-12 lg:px-8">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="flex-1 hidden md:flex flex-col lg:items-center gap-6">
                    <motion.img
                        animate={{
                            y: [50, 100, 50],
                            transition: { duration: 4, repeat: Infinity },
                        }}
                        src={teamone}
                        alt="Team One"
                        className="w-full max-w-xs md:max-w-sm 
               rounded-t-3xl rounded-br-3xl border-s-8 border-b-8 
               border-blue-600 shadow-2xl object-cover"
                    />

                    <motion.img
                        animate={{
                            x: [80, 120, 80],
                            transition: { duration: 8, delay: 4, repeat: Infinity },
                        }}
                        src={teamtwo}
                        alt="Team Two"
                        className="w-full max-w-xs md:max-w-sm 
               rounded-t-3xl rounded-br-3xl border-s-8 border-b-8 
               border-blue-600 shadow-2xl object-cover"
                    />
                </div>
                <div className="flex-1 md:hidden flex flex-col lg:items-center gap-6">
                    <motion.img
                        animate={{
                            y: [50, 100, 50],
                            transition: { duration: 4, repeat: Infinity },
                        }}
                        src={teamone}
                        alt="Team One"
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 
               rounded-t-3xl rounded-br-3xl border-s-8 border-b-8 
               border-blue-600 shadow-2xl object-cover"
                    />

                    <motion.img
                        animate={{
                            x: [20, 40, 20],
                            transition: { duration: 8, delay: 4, repeat: Infinity },
                        }}
                        src={teamtwo}
                        alt="Team Two"
                        className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 
               rounded-t-3xl rounded-br-3xl border-s-8 border-b-8 
               border-blue-600 shadow-2xl object-cover"
                    />
                </div>

                <div className='flex-1 py-6'>
                    <motion.h1
                        initial={{ scale: 0.5 }}
                        animate={{
                            scale: 1,
                            transition: { duration: 2 },
                        }}
                        className='md:text-5xl text-4xl font-extrabold'
                    >Latest <motion.span
                        animate={
                            {
                                color: ['#17c90a', '#062c7d', '#f4f716'],
                                transition: { duration: 4, repeat: Infinity }
                            }
                        }
                    > Jobs</motion.span> For You!!!</motion.h1>
                    <p className="py-6 text-sm md:text-[16px]">
                        Your Career Hub is a comprehensive job portal designed to connect job seekers with employers across industries. Whether you're a fresh graduate looking for your first opportunity or a seasoned professional aiming to advance your career, our platform provides access to thousands of verified job listings from top companies.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;