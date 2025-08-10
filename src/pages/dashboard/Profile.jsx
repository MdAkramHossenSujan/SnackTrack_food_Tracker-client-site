import React, { useState, use, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { Pencil, Mail, Phone, Info } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  useEffect(() => {
    document.title = `My Profile | Dashboard | SnackTrack`;
    window.scrollTo(0, 0);
  }, []);

  const { user, updateUser } = use(AuthContext);
  const [editing, setEditing] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || '');
  console.log(user)
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 dark:text-gray-300">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  const handleEditToggle = () => setEditing(!editing);

  const handleImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_API}`,
      formData
    );
    setPhotoURL(res.data.data.url);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const updatedData = {
      displayName,
      photoURL: photoURL || user.photoURL,
      aboutMe,
      contactNumber
    };
    updateUser(updatedData)
      .then(() => toast.success('Profile updated successfully!'))
      .catch(console.error);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150?text=No+Photo'}
            alt="User Avatar"
            className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border-4 border-green-400 dark:border-green-600 shadow-md hover:scale-105 transition-transform duration-300"
          />

          <div className='text-center space-y-1'>
            {/* Basic Info */}
          <h2 className="text-2xl font-semibold">
            {user?.displayName || 'No Name'}
          </h2>
          <p className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <Mail size={16} /> {user?.email || 'No Email'}
          </p>
          {/* Account Metadata Section */}     
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>
                  <strong>Account Created:</strong> {user?.metadata?.creationTime || 'N/A'}
                </li>
                <li>
                  <strong>Last Login:</strong> {user?.metadata?.lastSignInTime || 'N/A'}
                </li>
              </ul>
          </div>

          

          {/* Contact Number */}
          {contactNumber && !editing && (
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Phone size={16} /> {contactNumber}
            </p>
          )}

          {/* About Me */}
          {aboutMe && !editing && (
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-center max-w-lg">
              <Info size={16} /> {aboutMe}
            </p>
          )}

          {/* Edit Button */}
          <button
            onClick={handleEditToggle}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border transition font-medium text-sm"
          >
            <Pencil size={16} />
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>

          {/* Edit Form */}
          {editing && (
            <form onSubmit={handleForm} className="w-full mt-6 flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  defaultValue={user?.displayName}
                  className="p-2 rounded-lg text-gray-900 dark:text-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                  placeholder="Enter your name"
                />
              </div>

              {/* Photo */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600 dark:text-gray-300">Add Photo</label>
                <input
                  type="file"
                  name="photoURL"
                  onChange={handleImage}
                  className="rounded-lg file-input w-full text-gray-900 dark:text-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
                />
              </div>

              <button
                type="submit"
                className="border dark:border-green-400 border-gray-400 cursor-pointer font-medium rounded-full px-4 py-2 transition"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;


