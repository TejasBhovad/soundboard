"use client";
import { BoardsContext } from "../components/BoardsContext";
import Sidebar from "@/app/components/Sidebar.jsx";
import { useState } from "react";
const layout = ({ children }) => {
  const [boardsState, setBoardsState] = useState([]);
  return (
    <div className="flex w-full h-full flex-col sm:flex-row">
      <BoardsContext.Provider value={{ boardsState, setBoardsState }}>
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        {children}
        <div className="block sm:hidden">
          <Sidebar />
        </div>{" "}
      </BoardsContext.Provider>
      {/*       
      <Sidebar />
      {children} */}
    </div>
  );
};

export default layout;
