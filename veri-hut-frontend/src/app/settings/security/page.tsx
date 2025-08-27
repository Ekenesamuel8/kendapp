"use client";

import RecoveryEmailModal from "@/components/RecoveryEmailModal";
import { StageModal } from "@/components/StageModal";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";

export default function AccountSettings() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex-1 p-3 bg-white m-3 rounded-lg">
      {/* Header */}
      <Link href={"/settings"} className="flex items-center space-x-2 mb-6">
        <FiArrowLeft className="w-5 h-5 text-black cursor-pointer" />
        <h2 className="text-lg font-semibold text-black">Message Settings</h2>
      </Link>

      {/* Customize Notification */}
      <div
        className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded mb-4 hover:cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2">
          <FiPlusCircle className="w-10 h-10 font-bold text-black" />
          <div>
            <p className="font-semibold text-[#5A5A5A]">Recovery Email</p>
            <p className="text-xs text-[#959595]">No recovery email added</p>
          </div>
        </div>
        <RecoveryEmailModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        {/* <StageModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
      </div>
    </div>
  );
}
