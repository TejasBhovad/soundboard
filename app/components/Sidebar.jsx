"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { BoardsContext } from "./BoardsContext";
import { useSession } from "next-auth/react";
import { useUserData } from "@/app/hooks/db";
import Board from "@/app/components/logos/Board";
import CreateButton from "@/app/components/buttons/CreateButton";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const { boardsState, setBoardsState } = useContext(BoardsContext);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
    }
  }, [status]);

  const { userData, loading } = useUserData(userEmail);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [soundboards, setSoundboards] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setIsSidebarOpen(localStorage.getItem("sidebarState") === "open");
    }
  }, []);
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
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsTextVisible(false);
    }
  }, [isSidebarOpen]);
  useEffect(() => {
    if (loading) return;
    if (userData) {
      setBoardsState(userData.boards);
      setSoundboards(userData.boards);
    }
  }, [userData, loading]);
  useEffect(() => {
    console.log("boardsState", boardsState);
  }, [boardsState]);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarState", newState ? "open" : "closed");
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={`bg-secondary h-16 text-white sm:h-full border-[1px] border-utility flex py-2 sm:py-4 sm:flex-col gap-2 justify-start sm:justify-start ${
        isSidebarOpen ? "sm:w-60 px-3.5 w-full" : "sm:w-16 px-2.5 w-full"
      } transition-all`}
    >
      <CreateButton
        isSidebarOpen={isSidebarOpen}
        isTextVisible={isTextVisible}
        setSoundboards={setSoundboards}
      />
      <div
        className={`collapse-btn md:w-auto w-10 flex h-10 gap-1 items-center cursor-pointer rounded-sm hover:bg-utility transition-all hidden sm:flex ${
          isSidebarOpen ? "" : "justify-start px-0"
        }`}
        onClick={toggleSidebar}
        tabIndex={0}
      >
        <button className="w-10 h-10" aria-label="Your Boards">
          <span className="flex justify-center items-center">
            <Board />
          </span>
        </button>
        {isTextVisible && (
          <div className="flex items-center h-full font-semibold text-md overflow-hidden whitespace-nowrap px-2 transition-all sm:flex hidden">
            Your Boards
          </div>
        )}
      </div>
      {boardsState.map((soundboard) => (
        <Link
          key={soundboard.board_id}
          href={`/dashboard/${soundboard.board_id}`}
        >
          <div
            className={`board-btn w-full flex h-10 gap-1 items-center cursor-pointer rounded-sm hover:bg-utility transition-all  ${
              isSidebarOpen ? "pr-1" : "justify-start "
            }`}
            tabIndex={0}
          >
            <button
              className="w-10 h-10"
              aria-label={`Go to ${soundboard.name} Dashboard`}
            >
              <span className="flex justify-center items-center">
                <Image
                  src={soundboard.logo}
                  width={24}
                  height={24}
                  alt={soundboard.name}
                ></Image>
              </span>
            </button>
            {isTextVisible && (
              <div className="flex items-center h-full font-medium text-md overflow-hidden whitespace-nowrap hidden sm:flex">
                {soundboard.name}
              </div>
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
