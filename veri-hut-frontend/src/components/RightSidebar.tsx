// src/app/components/RightSidebar.tsx

import React from 'react';

export default function RightSidebar() {
  return (
    <div className="flex flex-col space-y-4 p-4 max-w-md mx-auto">
      {/* Search Bar */}
      <div className="bg-white p-2 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Try searching for people, or keywords"
          className="w-full p-2 rounded-full border border-gray-300"
        />
      </div>

      {/* Live on VE Section */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <h2 className="text-lg font-semibold">Live on VE</h2>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span>Verychat onboarding...</span>
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">+100</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Verychat onboarding...</span>
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">+100</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Verychat onboarding...</span>
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-full">+100</span>
          </div>
        </div>
        <a href="#" className="text-blue-500">Show more</a>
      </div>

      {/* Trending Section */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
        <h2 className="text-lg font-semibold">Trending</h2>
        <div className="space-y-1">
          <p>VeryChat Kyc coming</p>
          <p>$VE token launched</p>
          <p>Scale channel exploding with subscribers</p>
          <p>Veri hut node selling</p>
          <p>$VE token launched</p>
        </div>
      </div>

      {/* Popular People Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">Popular People</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
              <div>
                <p className="font-medium">Daniella</p>
                <p className="text-sm text-gray-500">@Da-niella</p>
              </div>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded-md">Follow</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-300 w-10 h-10 rounded-full"></div>
              <div>
                <p className="font-medium">Mac-An</p>
                <p className="text-sm text-gray-500">@Mac-An</p>
              </div>
            </div>
            <button className="bg-red-500 text-white py-1 px-4 rounded-md">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}
