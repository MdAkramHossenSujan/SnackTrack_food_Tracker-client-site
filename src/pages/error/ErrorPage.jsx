import React, { useEffect } from 'react';
import { useRouteError, Link } from 'react-router';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/Animation/Animation - 1750050106340.json';

const ErrorPage = () => {
  const error = useRouteError();
useEffect(() => {
    document.title = `404 Error | SnackTrack`; 
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white dark:bg-neutral-900">
      <Lottie
        animationData={errorAnimation}
        loop
        className="w-full max-w-lg h-auto"
      />

      <h1 className="text-4xl font-extrabold text-red-600 mt-6 dark:text-red-400">
        Something went wrong
      </h1>

      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
        {error?.message || 'An unexpected error occurred. Please try again later.'}
      </p>

      <Link to="/" className="mt-6">
        <button className="btn btn-primary rounded-xl px-6 py-2 text-white">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;

