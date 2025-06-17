import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import snackLogo from '../../assets/Image/foodWatch.png'; // Adjust if your path is different

const Footer = () => {
  return (
    <div className='bg-base-200'>
      <footer className="footer sm:footer-horizontal  max-w-7xl mx-auto text-base-content p-10">
      <aside>
        <img src={snackLogo} alt="SnackTrack Logo" className="w-12 h-12 mb-2" />
        <p className="font-semibold text-lg">SnackTrack</p>
        <p className="text-sm text-gray-500">Track. Save. Waste Less.</p>
      </aside>

      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Food Tracking</a>
        <a className="link link-hover">Expiry Alerts</a>
        <a className="link link-hover">Inventory Management</a>
        <a className="link link-hover">User Dashboard</a>
      </nav>

      <nav>
        <h6 className="footer-title">Contact</h6>
        <a className="link link-hover">Email: support@snacktrack.com</a>
        <a className="link link-hover">Phone: +1 (800) 123-4567</a>
        <a className="link link-hover">Location: Online Platform</a>
      </nav>

      <nav>
        <h6 className="footer-title">Follow Us</h6>
        <div className="flex gap-4 mt-2 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-600 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-600 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-sky-500 transition" />
          </a>
        </div>
      </nav>
    </footer>
    </div>
  );
};

export default Footer;
