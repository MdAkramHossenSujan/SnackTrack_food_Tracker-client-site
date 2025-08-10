import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Bell, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const DashboardNavbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success('Logged out successfully');
        setIsMenuOpen(false);
      })
      .catch(console.error);
  };

  return (
    <>
      <div className="flex items-center z-100 fixed top-0 left-0 right-0 justify-end px-18 py-5 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
        
        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          
          {/* Notification Icon */}
          <button className="relative text-gray-700 dark:text-gray-300 hover:text-green-500">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] px-1">
              3
            </span>
          </button>

          {/* Profile Avatar */}
          <img
            src={user?.photoURL || 'https://via.placeholder.com/40'}
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Overlay + Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-6 top-16 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg p-4 z-50"
            >
              <div className="flex items-center gap-3 mb-3">
                <User size={24} className="text-gray-600 dark:text-gray-300" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {user?.displayName || 'No Name'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || 'No Email'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;

