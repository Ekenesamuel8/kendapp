// src/app/components/RightSidebar.tsx

import React from 'react';

export default function RightSidebar() {
  return (
    <div className="flex flex-col space-y-2 p-2 max-w-md mx-auto w-150">
      {/* Search Bar */}
      <div className="bg-white p-2 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Try searching for people, or keywords"
          className="w-full p-2 rounded-full border border-gray-300"
        />
      </div>

      {/* Live on VE Section */}
      <div className="bg-white p-2 rounded-lg shadow-md space-y-2">
        <h2 className="text-md font-semibold">Live on VE</h2>
        <div className="space-y-1">
          <div className="flex justify-between items-center rounded-full border border-red-400 p-2">
            <div className='flex items-center space-x-2'>
              <div className="bg-gray-300 w-7 h-7 rounded-full"></div>
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="flex justify-between items-center rounded-full border border-red-400 p-2">
            <div className='flex items-center space-x-2'>
              <div className="bg-gray-300 w-7 h-7 rounded-full"></div>
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="flex justify-between items-center rounded-full border border-red-400 p-2">
            <div className='flex items-center space-x-2'>
              <div className="bg-gray-300 w-7 h-7 rounded-full"></div>
              <span className="text-sm">Verychat onboarding... +100</span>
            </div>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">Live</span>
          </div>
        </div>
        <a href="#" className="text-xs text-blue-500">Show more</a>
      </div>

      {/* Trending Section */}
      <div className="bg-white p-2 rounded-lg shadow-md space-y-2">
        <h2 className="text-md font-semibold">Trending</h2>
        <div className="space-y-3">
          <p className='text-gray-700'>VeryChat Kyc coming</p>
          <p className='text-gray-700'>$VE token launched</p>
          <p className='text-gray-700'>Scale channel exploding with subscribers</p>
          <p className='text-gray-700'>Veri hut node selling</p>
          <p className='text-gray-700'>$VE token launched</p>
        </div>
      </div>

      {/* Popular People Section */}
      <div className="bg-white p-2 rounded-lg shadow-md">
        <h2 className="text-md font-semibold">Popular People</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-9 h-9 rounded-full"></div>
              <div>
                <p className="font-medium">Daniella</p>
                <p className="text-sm text-gray-500">@Da-niella</p>
              </div>
            </div>
            <button className="bg-red-500 text-white py-1 px-2 rounded-md">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-9 h-9 rounded-full"></div>
              <div>
                <p className="font-medium">Mac-An</p>
                <p className="text-sm text-gray-500">@Mac-An</p>
              </div>
            </div>
            <button className="bg-red-500 text-white py-1 px-2 rounded-md">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}
