import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const openLinkedInProfile = () => {
    window.open('https://www.linkedin.com/in/pankajmandloi/', '_blank');
  };

  const navigateToHome = () => {
    // Redirect to the home page
    window.location.href = '/dashboard'; // replace '/dashboard' with the actual path to your home page
  };

  const navigateToLogout = () => {
    // Redirect to the logout page or perform logout logic
    window.location.href = '/login'; // replace '/logout' with the actual path or logic for logging out
  };

  return (
    <div className="w-full h-16 px-4 bg-gradient-to-r from-purple-600 to-pink-400 text-white flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faComments} className="mr-2 text-3xl" />
        <span className="text-2xl font-bold tracking-wide">InteractHub</span>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="text-lg"
          onClick={navigateToHome}
        >
          Home
        </button>

        <div className="relative group">
          <button
            className="text-lg"
            onClick={openLinkedInProfile}
          >
            <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-xl" />
            Profile
          </button>
          <div className="absolute hidden group-hover:block mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={openLinkedInProfile}
            >
              My Profile
            </button>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              onClick={navigateToLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
