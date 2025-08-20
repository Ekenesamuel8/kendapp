// src/app/layout.tsx
"use client";
import "@/app/globals.css";  // Import Tailwind and global styles
import Navbar from '@/components/Navbar';
import RightSidebar from "@/components/RightSidebar";
import Sidebar from '@/components/Sidebar';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body className="bg-white text-black dark:bg-black dark:text-white">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="w-full"> {/* This adds the left margin equal to the sidebar width */}
              <main>{children}</main>
            </div>
            <RightSidebar />    
          </div>

        </body>
      </html>
    </>
  );
}
