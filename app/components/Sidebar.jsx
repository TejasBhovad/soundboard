"use client";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setIsSidebarOpen(localStorage.getItem("sidebarState") === "open");
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarState", newState ? "open" : "closed");
    }
  };

  useEffect(() => {
    if (!isMounted) return;
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sidebarState");
      setIsSidebarOpen(storedState === "closed");
    }
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => {
        setIsTextVisible(true);
      }, 100); // Adjust delay as needed
      return () => clearTimeout(timer);
    } else {
      setIsTextVisible(false);
    }
  }, [isSidebarOpen]);

  return (
    <div
      className={`bg-secondary text-white h-full border-[1px] border-utility flex py-4 ${
        isSidebarOpen ? "w-48 px-2" : "w-16 px-2.5"
      } transition-all`}
    >
      <div className="collapse-btn w-full flex h-12 gap-3 items-center">
        <button className="w-10 h-10 bg-blue-300" onClick={toggleSidebar}>
          {/* state of sidebar text */}
          <span className="text-sm text-blue-900 font-bold">
            {" "}
            {isSidebarOpen ? "close" : "open"}
          </span>
        </button>
        {isTextVisible && (
          <div className="flex items-center h-full font-semibold text-md">
            Your Boards
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
