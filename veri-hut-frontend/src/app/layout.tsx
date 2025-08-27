// src/app/layout.tsx
"use client";

import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideRight = pathname.startsWith("/messages")|| pathname.startsWith("/live/") || pathname.startsWith("/video/");

  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
          {!hideRight && <RightSidebar />} 
        </div>
      </body>
    </html>
  );
}
