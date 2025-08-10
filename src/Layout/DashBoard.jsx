import React, { use } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import foodWatch from '../assets/Image/foodWatch.png';
import {
    FaHome, FaUtensils,
    FaPlusSquare,
    FaExclamationTriangle,
    FaCheckCircle,
    FaUserCircle,
    FaTachometerAlt
} from "react-icons/fa";
import { AuthContext } from '../context/AuthContext/AuthContext';
import { Moon, Sun } from 'lucide-react';
import DashboardNavbar from '../pages/Shared/DashboardNavbar';
const DashBoard = () => {
    const { theme, toggleTheme } = use(AuthContext)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Page content here */}
                    <div className="navbar lg:hidden fixed z-30 bg-base-300 w-full">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                        <div className='flex lg:ml-12 md:py-2 gap-1'>
                            <img className='w-12 h-12' src={foodWatch} alt="" />
                            <Link to={'/'} class="my-auto text-xl md:text-2xl lg:text-3xl">SnackTrack</Link>
                        </div>
                    </div>
                        <div className='px-6 py-18 lg:py-0 md:px-8'>
                        <DashboardNavbar/>
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side z-40">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <div className='flex lg:ml-12 md:py-2 gap-1'>
                            <img className='w-12 h-12' src={foodWatch} alt="" />
                            <Link to={'/'} className="my-auto text-xl md:text-2xl lg:text-3xl">SnackTrack</Link>
                        </div>
                        <li className='mt-4'>
                            <Link className='flex items-center gap-2' to={'/dashboard'}>
                                <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>

                        <li>
                            <NavLink to="/dashboard/myaddedfoods" className="flex items-center gap-2">
                                <FaUtensils /> My Added Foods
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/expired" className="flex items-center gap-2">
                                <FaExclamationTriangle /> Expired
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/notexpired" className="flex items-center gap-2">
                                <FaCheckCircle /> Not Expired
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                                <FaUserCircle /> Profile
                            </NavLink>
                        </li>
                        <li>
                            <Link className='flex items-center gap-2' to={'/'}>
                                <FaHome /> Home
                            </Link>
                        </li>
                    </ul>

                </div>

            </div>
            <div className='fixed right-6 top-6'>
                <label onClick={toggleTheme} className={`cursor-pointer  swap swap-rotate ${theme === 'dark' ? 'swap-active' : ''}`}>
                    <Moon size={30} className="swap-on text-gray-300" />
                    <Sun size={30} className="swap-off text-yellow-500" />
                </label>
            </div>
        </div>
    );
};

export default DashBoard;