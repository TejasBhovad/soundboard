"use client";
import { BoardsContext } from "../components/BoardsContext";
import Sidebar from "@/app/components/Sidebar.jsx";
import { useState } from "react";
const layout = ({ children }) => {
  const [boardsState, setBoardsState] = useState([]);
  return (
    <div className="flex w-full h-full">
      <BoardsContext.Provider value={{ boardsState, setBoardsState }}>
        <Sidebar />
        {children}
      </BoardsContext.Provider>
      {/*       
      <Sidebar />
      {children} */}
    </div>
  );
};

export default layout;
