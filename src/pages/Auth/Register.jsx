import React, { use, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaLock, FaEnvelope, FaImage } from 'react-icons/fa';
import register from '../../assets/Animation/Animation - 1748197816538.json';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SocialLogin from '../Shared/SocialLogin';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import bg from '../../assets/Image/pexels-freestockpro-12932215.jpg';
import axios from 'axios';

const Register = () => {
    const [error, setError] = useState('');
    const [checkError, setCheckError] = useState('');
    const [passError, setPassError] = useState('');
    const { createUser, updateUser, resetPass } = use(AuthContext);
    const [email, setEmail] = useState('');
    const [photoURL,setPhotoURL]=useState('')
    const navigate = useNavigate();
useEffect(() => {
    document.title = `Register | SnackTrack`; 
    window.scrollTo(0, 0); 
  }, []);
  const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image)
        console.log(formData)

        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API}`, formData)
        setPhotoURL(res.data.data.url)
    }
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        setEmail(data.email);

        const name = data.displayName;
        if (name.length < 5) {
            setError('Name Should Be More Than 5 Characters.');
            return;
        } else {
            setError('');
        }

        const password = data.password;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordPattern.test(password)) {
            setPassError('Password must contain at least one uppercase, one lowercase, and be 6+ characters.');
            return;
        } else {
            setPassError('');
        }

        if (!form.checkbox.checked) {
            setCheckError('Accept Terms and Conditions.');
            return;
        } else {
            setCheckError('');
        }

        createUser(data.email, data.password)
            .then(() => {
                updateUser({ displayName: name, photoURL:photoURL })
                    .then(() => {
                        navigate('/myfooditems');
                        toast.success('Registered Successfully');
                    }).catch(console.log);
            }).catch(console.log);
    };

    const handleForget = (e) => {
        e.preventDefault();
        resetPass(email)
            .then(() => toast.success('Reset Email Sent'))
            .catch(console.log);
    };

    return (
  <div
    className="min-h-screen py-24 bg-cover bg-center flex items-center justify-center"
    style={{ backgroundImage: `url(${bg})` }}
  >
    <div className=" backdrop-blur-xl p-8 rounded-2xl shadow-lg max-w-2xl lg:max-w-5xl text-white w-full flex flex-col lg:flex-row items-center justify-between
     
    ">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-[300px]"
      >
        <Lottie animationData={register} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label text-gray-200 dark:text-gray-300 flex items-center gap-2">
              <FaUserCircle /> Name
            </label>
            <input
              type="text"
              name="displayName"
              className="input input-bordered w-full bg-base-300 dark:bg-gray-800 text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div>
            <label className="label text-gray-200 dark:text-gray-300 flex items-center gap-2">
              <FaImage /> Photo URL
            </label>
            <input
              required
              type="file"
              onChange={handleImageUpload}
              className="w-full file-input text-black"
              placeholder="Photo URL"
            />
          </div>

          <div>
            <label className="label text-gray-200 dark:text-gray-300 flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              required
              type="email"
              name="email"
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="label text-gray-200 dark:text-gray-300 flex items-center gap-2">
              <FaLock /> Password
            </label>
            <input
              required
              type="password"
              name="password"
              className="input input-bordered w-full bg-base-300 dark:bg-gray-800 text-gray-900 dark:text-white
                         border-gray-300 dark:border-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {passError && (
              <p className="text-red-500 text-sm mt-1">{passError}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                name="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
              />
              <span className="text-sm text-gray-200">Accept Terms & Conditions</span>
            </label>
            <a
              onClick={handleForget}
              className="text-sm text-blue-200 dark:text-blue-300 hover:underline cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
          {checkError && <p className="text-red-500 text-sm">{checkError}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full
                       bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                       text-white"
          >
            Register
          </button>
        </form>

        <SocialLogin />

        <p className="text-sm text-center mt-4 text-gray-200 dark:text-gray-300">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-blue-200 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  </div>
);

};

export default Register;
