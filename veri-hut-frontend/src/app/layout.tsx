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
        <div className="sticky top-0 z-50 h-16 bg-white dark:bg-black border-b border-neutral-200/60">
            <Navbar />
        </div>
        <div className="flex flex-1 overflow-hidden">
            <aside
            className="shrink-0 sticky h-[calc(100vh-64px)] overflow-y-auto border-r border-neutral-200/60 bg-white dark:bg-black"
            >
              <Sidebar />
            </aside>
            <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto bg-neutral-50 dark:bg-neutral-900"> {/* This adds the left margin equal to the sidebar width */}
              <main className="flex-1">{children}</main>
            </div>
            <aside
            className=" shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-neutral-200/60 bg-white dark:bg-black "
            >
              {!hideRight && <RightSidebar />}
            </aside>
        </div>
      </body>
    </html>
  );
}
