"use client";  // This file is a client component
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import RightSidebar from "@/components/RightSidebar";
import Getcontent from "@/components/Getcontent";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex h-screen">
        
        
          

            <MainContent />
                  <Getcontent />
            <RightSidebar />
        
      </div>
    </div>
    
  );
}
