// src/app/components/RightSidebar.tsx

import React from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Avatar_one from "../../public/avatars/1.png";
import Avatar_two from "../../public/avatars/2.png";
import Avatar_three from "../../public/avatars/3.png";
import Avatar_four from "../../public/avatars/4.png";

export default function RightSidebar() {
  return (
    <div className="flex flex-col space-y-3 p-2 max-w-md mx-auto m-3 w-80 bg-white">
      {/* Search Bar */}
      <div className="w-full flex flex-row pl-4 items-center rounded-xl border-[0.5px] border-[#BFBFBF] bg-[#F8F8F8]">
        <FiSearch />
        <input
          type="text"
          placeholder="Try searching for people, or keywords"
          className="w-full border-0 outline-0 p-2 text-sm text-[#959595]"
        />
      </div>

      {/* Live on VE Section */}
      <div className="bg-[#F8F8F8] p-2 rounded-lg shadow-md space-y-2">
        <h2 className="text-md font-semibold">Live on VE</h2>
        <div className="space-y-1">
          <div className="flex justify-between items-center rounded-xl border border-red-400 p-2">
            <div className="flex items-center space-x-2">
              <Image
                src={Avatar_one}
                alt="Profile_Avatar"
                className="w-7 h-7 bg-[#ABC5DE] rounded-full"
              />
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-[#FF6D75] text-white px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="flex justify-between items-center rounded-xl border border-red-400 p-2">
            <div className="flex items-center space-x-2">
              <Image
                src={Avatar_two}
                alt="Profile_Avatar"
                className="w-7 h-7 bg-[#FF6D75] rounded-full"
              />
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-[#FF6D75] text-white px-2 py-1 rounded-full">
              Live
            </span>
          </div>
          <div className="flex justify-between items-center rounded-xl border border-red-400 p-2">
            <div className="flex items-center space-x-2">
              <Image
                src={Avatar_three}
                alt="Profile_Avatar"
                className="w-7 h-7 bg-[#F6DE9D] rounded-full"
              />
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-[#FF6D75] text-white px-2 py-1 rounded-full">
              Live
            </span>
          </div>
        </div>
        <a href="#" className="text-xs text-blue-500">
          Show more
        </a>
      </div>

      {/* Trending Section */}
      <div className="bg-[#F8F8F8] p-2 rounded-lg shadow-md space-y-2">
        <h2 className="text-md font-semibold">Trending</h2>
        <div className="space-y-3">
          <p className="text-gray-700">VeryChat Kyc coming</p>
          <p className="text-gray-700">$VE token launched</p>
          <p className="text-gray-700">
            Scale channel exploding with subscribers
          </p>
          <p className="text-gray-700">Veri hut node selling</p>
          <p className="text-gray-700">$VE token launched</p>
        </div>
      </div>

      {/* Popular People Section */}
      <div className="bg-[#F8F8F8] p-2 rounded-lg shadow-md border-[1px] border-[#FFE9E9]">
        <h2 className="text-md font-semibold">Popular People</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src={Avatar_four}
                alt="Profile_Avatar"
                className="w-7 h-7 bg-[#ABC5DE] rounded-full"
              />
              <div>
                <p className="font-medium">Daniella</p>
                <p className="text-sm text-gray-500">@Da-niella</p>
              </div>
            </div>
            <button className="bg-[#FF6D75] text-white py-1 px-2 rounded-md">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src={Avatar_one}
                alt="Profile_Avatar"
                className="w-7 h-7 bg-[#ABC5DE] rounded-full"
              />
              <div>
                <p className="font-medium">Mac-An</p>
                <p className="text-sm text-gray-500">@Mac-An</p>
              </div>
            </div>
            <button className="bg-[#FF6D75] text-white py-1 px-2 rounded-md">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
