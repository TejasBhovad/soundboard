"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/Utils.css";
import GuestSound from "@/app/components/GuestSound";
import Share from "@/app/components/logos/Share";
import { useToast } from "@/components/ui/use-toast";
import { getBoardById } from "../queries/board";
import { useState, useEffect } from "react";
const page = ({ params }) => {
  const URL = "http://localhost:3000/";
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBoard = async () => {
      const board = await getBoardById(params.board_id);
      setBoard(board);
      setLoading(false);
    };
    fetchBoard();
  }, []);
  const { toast } = useToast();
  const handleCopyClick = () => {
    navigator.clipboard.writeText(URL + params.board_id);
    // console.log("copied:" + URL + params.board_id);
    toast({
      title: "Copied to clipboard",
      description: (
        <span className="gap-2">
          <span>url: </span>
          <a
            className="text-logoGradientDark underline"
            href={URL + params.board_id}
          >
            {URL + params.board_id}
          </a>
        </span>
      ),
    });
  };
  return (
    <div className="w-full h-full bg-secondary">
      {/* page params: {params.board_id} */}
      {/* if board visibility is public display board name else say the board is private */}
      {loading ? (
        <div className="gradient-text px-4 py-4 font-semibold text-accent">
          loading...
        </div>
      ) : board.visibility === "public" ? (
        <div className="w-full h-full py-6 sm:py-2 px-4 sm:px-0 gap-4 flex flex-col flex items-center sm:items-start">
          {/* add click to edit board page */}
          <div className="w-full flex py-4 px-4 flex justify-center">
            <div className="soundboard-card w-10/12 h-32 flex items-center hover:bg-utility transition-all rounded-md cursor-pointer px-4 justify-center md:justify-start ">
              <div className="h-4/5 w-4/5 flex gap-6 ">
                <div className="pic aspect-square h-full bg-utility rounded-md flex justify-center items-center">
                  <Image
                    className="object-cover rounded-md w-fit"
                    src={board.logo}
                    width={72}
                    height={72}
                    alt={board.name}
                  ></Image>
                </div>
                <div className="desc flex flex-col h-full w-full gap-1.5 py-1.5 justify-start flex text-start">
                  <h1 className="text-3xl font-semibold">{board.name}</h1>
                  <span className="gradient-text font-regular">
                    {board.visibility.charAt(0).toUpperCase() +
                      board.visibility.slice(1)}{" "}
                    Soundboard
                  </span>
                </div>
              </div>
            </div>

            <div className="w-auto flex justify-center items-start px-5 py-4">
              <div
                className=" h-12 w-12 hover:bg-utility aspect-square rounded-md flex justify-center items-center p-2 hover:scale-95 transition-all cursor-pointer"
                onClick={handleCopyClick}
              >
                <Share />
              </div>
            </div>
          </div>

          <div className="flex w-full px-12 py-4 justify-center py-4">
            <div className="sounds-container w-full h-fit px-4 grid grid-cols-2 sm:grid-cols-3 xs:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-4 flex justify-center place-items-center md:justify-items-start py-4 rounded-md bg-background border-[1px] border-solid border-utility">
              {board.sounds?.map((sound) => (
                <GuestSound
                  key={sound.id}
                  name={sound.name}
                  logo={sound.logo}
                  file={sound.file}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
          <div className="container flex flex-col justify-center items-center">
            <h1 className="gradient-text md:text-[200px] text-[150px] font-bold p-0 mb-0 leading-none transition-all">
              401
            </h1>
            <span className="md:text-lg p-0 mb-0 text-sm transition-all">
              The Board you are looking for is private
            </span>
          </div>
          <Link href="/">
            <button className="px-4 py-2 bg-secondary border-[1px] border-utility rounded-md">
              Back to Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
