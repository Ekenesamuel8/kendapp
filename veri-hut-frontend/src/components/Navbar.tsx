// components/Navbar.js
"use client"; // This file is a client component
import { useState } from "react";
import Link from "next/link";
import { FiBell, FiBookmark } from "react-icons/fi";
import Image from "next/image";
import ProfileImage from "../../public/profile.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
            <Link href="#">
              <span className="text-xl font-bold text-black">LoGO</span>
            </Link>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <input
              type="text"
              className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search"
            />
          </div>

          <div className="flex items-center p-2 px-2 rounded-md bg-[#EAEAEA]">
            <Link href="/notifications">
              <FiBell className="w-5 h-4 hover:text-red-500" />
            </Link>
          </div>

          <div className="flex items-center p-2 px-2 rounded-md mx-4 bg-[#EAEAEA]">
            <Link href="#">
              <FiBookmark className="w-5 h-4 hover:text-red-500" />
            </Link>
          </div>

          {/* Optional Profile Icon */}
          <Link
            href={"/profile"}
            type="button"
            className="text-black hover:text-gray-600 focus:outline-none flex items-center space-x-4"
          >
            <Image
              src={ProfileImage}
              alt="Profile_Avatar"
              className="w-12 h-12 bg-[#F6DE9D] rounded-full"
            />

            <span className="font-medium">Kelvin Nita</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
