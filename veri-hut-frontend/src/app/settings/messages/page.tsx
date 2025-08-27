"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function MessagesSettings() {
  const [emailNotif, setEmailNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);
  const [pushNotif, setPushNotif] = useState(false);

  return (
    <div className="flex-1 p-3 bg-white m-3 rounded-lg">
      {/* Header */}
      <Link href={"/settings"} className="flex items-center space-x-2 mb-6">
        <FiArrowLeft className="w-5 h-5 text-black cursor-pointer" />
        <h2 className="text-lg font-semibold text-black">Message Settings</h2>
      </Link>

      {/* Customize Notification */}
      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded mb-4">
        <div>
          <p className="font-semibold text-[#5A5A5A]">Enable Direct Message</p>
        </div>
        <button
          onClick={() => setEmailNotif(!emailNotif)}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
            emailNotif ? "bg-red-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
              emailNotif ? "translate-x-4" : ""
            }`}
          />
        </button>
      </div>

      <p className="px-2 py-2  text-black">Choose who can send you DMs</p>

      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded mb-4">
        <div>
          <p className="font-semibold text-[#5A5A5A]">Verified Users</p>
          <p className="text-xs text-[#959595]">
            Only verified users canDm you.
          </p>
        </div>
        <input type="checkbox" className="w-5 h-5 rounded " />
      </div>
      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded mb-4">
        <div>
          <p className="font-semibold text-[#5A5A5A]">People you follow</p>
          <p className="text-xs text-[#959595]">
            Followed users can send you DM requests.
          </p>
        </div>
        <input type="checkbox" className="w-5 h-5 rounded" />
      </div>
    </div>
  );
}
