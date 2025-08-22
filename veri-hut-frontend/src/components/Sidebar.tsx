// components/Sidebar.js

import { useState } from "react";
import Link from "next/link";
import { FiHome, FiBell, FiMoon, FiSun, FiBookmark, FiLock, FiMessageSquare, FiSmartphone, FiActivity,  } from "react-icons/fi"; // import icons you need
import { FaTrophy, FaWallet } from "react-icons/fa6";


const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`w-70 bg-white dark:bg-gray-800 shadow-md top-0 left-0 p-4 m-3  ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Icon Section */}
      <div className="flex justify-left mb-2 mt-4">
        <div className="w-12 h-12 bg-red-500 rounded-full flex justify-center items-center">
          <FiHome className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiHome className="w-5 h-4" />
            <span className="text-sm font-light">Hut</span>
          </div>
        </Link>

        <Link href="/Notification">
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiBell className="w-5 h-4" />
            <span className="text-sm font-light">Notification</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiMessageSquare className="w-5 h-4" />
            <span className="text-sm font-light">Messages</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiActivity className="w-5 h-4" />
            <span className="text-sm font-light">Live</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiSmartphone className="w-5 h-4" />
            <span className="text-sm font-light">Miniapp</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiBookmark  className="w-5 h-4" />
            <span className="text-sm font-light">Bookmarks</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FaWallet className="w-5 h-4" />
            <span className="text-sm font-light">Wallet</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FiLock className="w-5 h-4" />
            <span className="text-sm font-light">Settings and Privacy</span>
          </div>
        </Link>

        <Link href="#" passHref>
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover-primary">
            <FaTrophy className="w-5 h-4" />
            <span className="text-sm font-light">Leaderboard</span>
          </div>
        </Link>
      </div>

      <div className="mt-6">
        <button className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600">
          Post
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex justify-between mt-4">
        <button
          className="text-gray-500 dark:text-gray-300"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

