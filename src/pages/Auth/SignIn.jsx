import React, { use, useEffect } from 'react';
import loginanimation from '../../assets/Animation/Animation - 1748252718756.json';
import bg from '../../assets/Image/pexels-freestockpro-12932215.jpg';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import Lottie from 'lottie-react';
import SocialLogin from '../Shared/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SignIn = () => {
  const { signInUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  useEffect(() => {
    document.title = `Sign In | SnackTrack`;
    window.scrollTo(0, 0);
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    signInUser(data.email, data.password)
      .then(() => {
        toast.success('Signed In Successfully');
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Wrong Credential');
      });
  };

  return (
    <div
      className="min-h-screen py-24 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-content flex-col lg:flex-row-reverse bg-white/10 dark:bg-black/30 rounded-2xl p-4 shadow-xl backdrop-blur-md max-w-xl lg:max-w-6xl w-full gap-12"
      >
        <motion.div
          animate={{ x: [0, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Lottie style={{ width: '300px' }} animationData={loginanimation} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white pt-6 w-full max-w-lg shadow-2xl"
        >
          <div className="text-center mb-4">
            <h1 className="text-4xl font-bold">Sign In</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="label text-gray-700 dark:text-gray-300">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="label text-gray-700 dark:text-gray-300">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-end">
                <a className="link text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                Login
              </button>
            </form>

            <SocialLogin />

            <div className="text-center mt-4 text-sm">
              Don't have an account?{' '}
              <Link
                className="text-blue-600 dark:text-red-400 font-semibold hover:underline"
                to="/register"
              >
                Register
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;

