// components/Sidebar.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBell,
  FiMoon,
  FiSun,
  FiBookmark,
  FiLock,
  FiMessageSquare,
  FiSmartphone,
  FiActivity,
  FiMoreVertical,
} from "react-icons/fi"; // import icons you need
import { FaTrophy, FaWallet } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import ProfileImage from "../../public/profile.png";

const Sidebar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [more, setMore] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <div
        className={
          "w-100 h-fit bg-white shadow-md rounded-lg top-0 left-0 py-6 px-4 m-3 relative"
        }
        onClick={() => setMore(false)}
      >
        {/* Icon Section */}
        <div className="flex justify-left mb-2 mt-4">
          <div className="w-12 h-12 bg-[#ff6d75] rounded-full flex justify-center items-center">
            <FiHome className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/" ? "bg-[#ff6d75] text-white" : "hover-primary"
              }`}
            >
              <FiHome className="w-5 h-4" />
              <span className="text-sm font-light">Hut</span>
            </div>
          </Link>

          <Link href="/notifications" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/notifications"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiBell className="w-5 h-4" />
              <span className="text-sm font-light">Notification</span>
            </div>
          </Link>

          <Link href="/messages" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/messages"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiMessageSquare className="w-5 h-4" />
              <span className="text-sm font-light">Messages</span>
            </div>
          </Link>

          <Link href="/live" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/live"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiActivity className="w-5 h-4" />
              <span className="text-sm font-light">Live</span>
            </div>
          </Link>

          <Link href="#" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/miniapp"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiSmartphone className="w-5 h-4" />
              <span className="text-sm font-light">Miniapp</span>
            </div>
          </Link>

          <Link
            href="#"
            passHref
            onClick={(e) => {
              e.stopPropagation();
              setMore(true);
            }}
          >
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/more"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiMoreVertical className="w-5 h-4" />
              <span className="text-sm font-light">More</span>
            </div>
          </Link>

          <Link href="#" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/bookmarks"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiBookmark className="w-5 h-4" />
              <span className="text-sm font-light">Bookmarks</span>
            </div>
          </Link>

          <Link href="#" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/wallet"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FaWallet className="w-5 h-4" />
              <span className="text-sm font-light">Wallet</span>
            </div>
          </Link>

          <Link href="/settings" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname.includes("/settings")
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FiLock className="w-5 h-4" />
              <span className="text-sm font-light">Settings and Privacy</span>
            </div>
          </Link>

          <Link href="#" passHref>
            <div
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-full  ${
                pathname == "/leaderboard"
                  ? "bg-[#ff6d75] text-white"
                  : "hover-primary"
              }`}
            >
              <FaTrophy className="w-5 h-4" />
              <span className="text-sm font-light">Leaderboard</span>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <button className="w-full bg-[#FF6D75] text-white py-2 rounded-full hover:bg-red-600">
            Post
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex mt-8 w-20 h-10 ">
          <div className="w-10 h-10 flex justify-center items-center rounded-l-xl bg-[#EAEAEA] border-[1px] border-[#BFBFBF]">
            <FiMoon className="w-4 h-4" onClick={toggleDarkMode} />
          </div>
          <div className="w-10 h-10 flex justify-center items-center rounded-r-xl border-[1px] border-[#BFBFBF]">
            <FiSun className="w-5 h-5" onClick={toggleDarkMode} />
          </div>
        </div>
        {more && (
          <div className="absolute w-[90%] h-fit p-6 bg-[#FFFFFF] shadow-sm shadow-[#FFF0F1] top-15 flex flex-col gap-6">
            <p className="font-bold text-[19px]">Verihut Shop</p>
            <p className="font-bold text-[19px]">LeaderBoard</p>
            <p className="font-bold text-[19px]">Monetization</p>
            <p className="font-bold text-[19px]">Refer & Earn</p>
          </div>
        )}
      </div>

      {/* mini profile */}
      <div className="w-100 h-fit bg-white shadow-md rounded-lg top-0 left-0 p-4 m-3">
        <div className="bg-[#F8F8F8] h-fit gap-10 p-6 flex flex-col rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={ProfileImage}
                alt="Profile Avatar"
                className="w-15 h-15 rounded-full bg-[#F6DE9D]"
              />
              <div>
                <h4 className="font-medium tex">Kelvin Nita</h4>
                <p className="font-medium text-[#959595]">@kelnita </p>
              </div>
            </div>
            <div className="rounded-full border-2 border-[#ff6d75] w-7 h-7 flex items-center justify-center">
              <FaCheck className="text-[#ff6d75]" />
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center text-center">
            <div>
              <p className="text-lg">2.3k</p>
              <p className="text-[#959595]">Followers</p>
            </div>
            <div>
              <p className="text-lg">1.0k</p>
              <p className="text-[#959595]">Followwing</p>
            </div>
            <div>
              <p className="text-lg">80</p>
              <p className="text-[#959595]">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
