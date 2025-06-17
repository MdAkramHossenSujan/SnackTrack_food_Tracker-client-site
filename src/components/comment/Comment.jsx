import React from 'react';

const comments = [
  {
    name: 'Emily Watson',
    image: 'https://i.pravatar.cc/150?img=47',
    comment: 'SnackTrack has completely changed how I manage food at home. The expiry count-down are a lifesaver!',
  },
  {
    name: 'Liam Rodriguez',
    image: 'https://i.pravatar.cc/150?img=12',
    comment: 'This platform is so easy to use. I love the clean dashboard and ability to track everything.',
  },
  {
    name: 'Sophia Lee',
    image: 'https://i.pravatar.cc/150?img=32',
    comment: 'As a meal prepper, I needed this! It helps me reduce waste and plan meals efficiently.',
  },
  {
    name: 'Ethan Kim',
    image: 'https://i.pravatar.cc/150?img=5',
    comment: 'Smart, useful, and super intuitive. Great job with the user interface and experience.',
  },
];

const CommentSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        What Our Users Say
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {comments.map((user, index) => (
          <div
            key={index}
            className=" p-6 rounded-xl hover:shadow-md transition flex flex-col items-center text-center"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
            />
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
              {user.name}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              {user.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
