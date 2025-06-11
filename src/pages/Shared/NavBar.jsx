import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Moon, Sun } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import './Navbar.css'
const NavBar = () => {
  const { user, logOut, theme,toggleTheme, } = use(AuthContext)
  const handleSignOut = () => {
    logOut().then(() => {
      // console.log('Sign-out successful.')
    }).catch(error => {
      console.log(error)
    })
  }
  return (
    <div>
      <div class="navbar fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabindex="0"
              class="menu menu-md dropdown-content min-h-screen bg-base-100 rounded-box z-1 mt-3 w-52 p-2 -right-36 lg:right-10 rounded-none shadow">
               {user && (
            <div>
              <img
                data-tooltip-id="view-tooltip"
                data-tooltip-content={user.displayName}
                data-tooltip-place="top"
                className="w-12 md:hidden mx-auto h-12 rounded-full border-4 border-green-400 dark:border-green-700 shadow-lg cursor-pointer transition-transform hover:scale-105"
                src={user?.photoURL || 'https://i.ibb.co.com/hJztTMWF/La-suite-de-Dragon-Ball-Z-arrive-cet-ete.jpg'}
                alt="User"
              />
              <Tooltip id="view-tooltip" />
            </div>
          )}
              <li><NavLink to={'./'}>Home</NavLink></li>
              <li><NavLink to={'/fridge'}>Fridge</NavLink></li>
              <li>
                <NavLink to={'/blog'}>Blog</NavLink>
              </li>
              <li><NavLink to={'/about'}>About</NavLink></li>
              {
                user && <li>
                  <NavLink to={'/addfood'}>Add Food</NavLink>
                </li>
              }
              {
                user && <li>
                  <NavLink to={'/myfooditems'}>My Food Items</NavLink>
                </li>
              }
            </ul>
          </div>
          <Link to={'./'} class="text-xl">SnackTrack</Link>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1">
           <li><NavLink to={'./'}>Home</NavLink></li>
              <li><NavLink to={'/fridge'}>Fridge</NavLink></li>
              <li>
                <NavLink to={'/blog'}>Blog</NavLink>
              </li>
              <li><NavLink to={'/about'}>About</NavLink></li>
              {
                user && <li>
                  <NavLink to={'/addfood'}>Add Food</NavLink>
                </li>
              }
              {
                user && <li>
                  <NavLink to={'/myfooditems'}>My Food Items</NavLink>
                </li>
              }
          </ul>
        </div>
        <div class="navbar-end gap-4 pr-4">
          {user && (
            <div>
              <img
                data-tooltip-id="view-tooltip"
                data-tooltip-content={user.displayName}
                data-tooltip-place="top"
                className="w-12 hidden md:block h-12 rounded-full border-4 border-green-400 dark:border-green-700 shadow-lg cursor-pointer transition-transform hover:scale-105"
                src={user?.photoURL || 'https://i.ibb.co.com/hJztTMWF/La-suite-de-Dragon-Ball-Z-arrive-cet-ete.jpg'}
                alt="User"
              />
              <Tooltip id="view-tooltip" />
            </div>
          )}
          {
            user ? <button onClick={handleSignOut} className='btn rounded-3xl bg-white text-black'>
              Sign Out
            </button> :
              <div className='inline-flex gap-2'>
                <Link to={'/register'} className={'btn bg-green-700 dark:bg-white shadow shadow-green-600 dark:text-black text-white rounded-4xl dark:shadow-white'}>Register</Link>
                <Link to={'/signin'} className={'btn rounded-4xl dark:border-white shadow shadow-black dark:shadow-white dark:shadow'}>Sing In</Link>
              </div>
          }
          <label onClick={toggleTheme} className={`cursor-pointer  swap swap-rotate ${theme === 'dark' ? 'swap-active' : ''}`}>
            <Sun size={30} className="swap-on text-yellow-500" />
            <Moon size={30} className="swap-off" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;