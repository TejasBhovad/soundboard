"use client";
import Board from "@/app/components/logos/Board";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUserData } from "@/app/hooks/db";
import Plus from "@/app/components/logos/Plus";
import Image from "next/image";
import CreateButton from "@/app/components/buttons/CreateButton";
import { useState, useEffect, useContext } from "react";
import { BoardsContext } from "./BoardsContext";
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
  const [isMounted, setIsMounted] = useState(false);

  // temp soundboard data that will be fetched later
  const [soundboards, setSoundboards] = useState([]);
  // const creator = userData?.$id;
  // setSoundboards(userData?.boards);

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

  // useffect that fetches the soundboards when loading chnages
  useEffect(() => {
    if (loading) return;
    if (userData) {
      // console.log("userData", userData?.boards);
      setBoardsState(userData.boards);
      setSoundboards(userData.boards);
      // console.log("soundboards", soundboards);
    }
  }, [userData, loading]);

  // use effect to print chnage in context
  useEffect(() => {
    console.log("boardsState", boardsState);
  }, [boardsState]);
  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={`bg-secondary text-white h-full border-[1px] border-utility flex py-4 flex-col gap-2 ${
        isSidebarOpen ? "w-60 px-3.5" : "w-16 px-2.5"
      } transition-all`}
    >
      {/* Create Board button */}
      <CreateButton
        isSidebarOpen={isSidebarOpen}
        isTextVisible={isTextVisible}
        setSoundboards={setSoundboards}
      />

      {/* Your Boards button */}
      <div
        className={`collapse-btn w-full flex h-10 gap-1 items-center cursor-pointer rounded-sm hover:bg-utility transition-all ${
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
          <div className="flex items-center h-full font-semibold text-md overflow-hidden whitespace-nowrap px-2 transition-all">
            Your Boards
          </div>
        )}
      </div>

      {/* Soundboards mapping */}
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
                  className=""
                  src={soundboard.logo}
                  width={24}
                  height={24}
                  alt={soundboard.name}
                ></Image>
              </span>
            </button>
            {isTextVisible && (
              <div className="flex items-center h-full font-medium text-md overflow-hidden whitespace-nowrap">
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
