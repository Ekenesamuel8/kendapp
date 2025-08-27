"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const EditNotifications = () => {
  const [toggles, setToggles] = useState({
    customize: false,
    likes: false,
    repost: false,
    comments: false,
    tags: false,
    followers: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 p-3 bg-white m-3 rounded-lg">
      {/* Header */}
      <Link href={"/settings"} className="flex items-center space-x-2 mb-6">
        <FiArrowLeft className="w-5 h-5 text-black cursor-pointer" />
        <h2 className="text-lg font-semibold text-black">Edit Notifications</h2>
      </Link>

      {/* Customize Notification */}
      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded mb-4">
        <div>
          <p className="font-semibold text-[#5A5A5A]">Customize Notification</p>
          <p className="text-xs text-[#959595]">
            Get quick updates sent straight to your device
          </p>
        </div>
        <button
          onClick={() => handleToggle("customize")}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
            toggles.customize ? "bg-red-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
              toggles.customize ? "translate-x-4" : ""
            }`}
          />
        </button>
      </div>

      {/* Settings Title */}
      <h3 className="px-2 py-2 text-sm font-semibold text-[#5A5A5A]">
        Settings
      </h3>

      {/* Settings List */}
      <div className="flex flex-col">
        {[
          { key: "likes", title: "Likes", desc: "From people you follow only" },
          {
            key: "repost",
            title: "Repost",
            desc: "Only from people you follow",
          },
          {
            key: "comments",
            title: "Comments",
            desc: "Only from people you follow",
          },
          { key: "tags", title: "Tags", desc: "Only from people you follow" },
          {
            key: "followers",
            title: "New followers",
            desc: "Only from people you follow",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 bg-[#F8F8F8] hover:bg-gray-50 rounded"
          >
            <div>
              <p className="font-bold text-[#5A5A5A]">{item.title}</p>
              <p className="text-xs text-[#959595]">{item.desc}</p>
            </div>
            <button
              onClick={() => handleToggle(item.key as keyof typeof toggles)}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
                toggles[item.key as keyof typeof toggles]
                  ? "bg-red-400"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  toggles[item.key as keyof typeof toggles]
                    ? "translate-x-4"
                    : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditNotifications;
