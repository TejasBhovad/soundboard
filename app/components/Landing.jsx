"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/Landing.css";
const Landing = () => {
  // create a state variable to hold the current scroll percent
  const [scrollPercent, setScrollPercent] = useState(0);
  // update the scroll percent when the user scrolls
  useEffect(() => {
    const scrollHandler = () => {
      const scrollPercent = Math.floor(
        (100 * window.scrollY) /
          (document.body.scrollHeight - window.innerHeight)
      );
      setScrollPercent(scrollPercent);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center scroll-smooth text-text transition duration-300 ease-in-out">
      <div
        className="mb-center w-full h-full bg-bgG1 relative flex overflow-hidden  items-center justify-center"
        style={{
          minHeight: "595px",
        }}
      >
        <div className="md:w-1/2 w-full h-full z-20 flex md:items-end md:justify-end items-center justify-center">
          <div
            className="contain w-5/6 h-5/6 flex flex-col md:gap-8 gap-2 items-center md:items-start lg:gap-6"
            style={{}}
          >
            <div className="w-full aspect-video md:hidden flex my-4 z-10">
              {" "}
              <img src="show.png" alt="" />
            </div>
            <div className="opacity-100 md:opacity-0 z-0 w-3/4 h-1/5 rounded-full bg-accent absolute blur-[100px] top-32 left-1/8 "></div>
            <span className="transition duration-300 ease-in-out z-30 md:text-6xl font-semibold text-5xl pt-2 md:text-left text-center lg:text-7xl">
              Create and share Soundboards
            </span>
            <p className="transition duration-300 ease-in-out z-30 text-textSecondary md:text-2xl text-xl pb-6 md:text-left text-center lg:text-2xl">
              SoundXLR allows users to create custom soundboards and share them
              on the web
            </p>
            <Link href="/dashboard">
              <button
                type="button"
                className="transition duration-300 ease-in-out z-30 w-48 bg-accent py-2 px-4 rounded-md text-xl lg:text-2xl font-semibold transition duration-300 ease-in-out hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="transition duration-300 ease-in-out w-1/2 h-full bg-transparent z-20 flex items-end justify-end md:flex hidden 2xl:w-full 2xl:justify-center">
          <div
            className="transition z-80 duration-300 ease-in-out w-10/12 h-4/6  fixed"
            style={{
              // top 50% if less than 50 else 200%
              top: scrollPercent >= 40 ? "80%" : "50%", // Adjust this value
              right: scrollPercent >= 40 ? "50%" : "20%", // Adjust this value
              transform:
                scrollPercent >= 40 && scrollPercent <= 60
                  ? "translate(50%, -50%)"
                  : scrollPercent < 40
                  ? "translate(75%, -50%)"
                  : "translate(50%, -50%)",
              transition: "top 0.5s ease, right 0.5s ease", // Add this line
              opacity: "1",
              boxShadow: scrollPercent >= 40 ? "0 0 20px 1px #8036FF" : "none",
            }}
          >
            <img src="show.png" alt="" />
          </div>
          <div
            className="rectangle transition duration-300 ease-in-out w-full flex items-center justify-center z-90"
            style={{
              position: "fixed",
              top: "30%",

              right:
                scrollPercent >= 50 && scrollPercent <= 80
                  ? "50%"
                  : scrollPercent < 50
                  ? "0"
                  : "50%",
              transform:
                scrollPercent >= 50 && scrollPercent <= 80
                  ? "translate(50%, -50%)"
                  : scrollPercent < 50
                  ? "translate(75%, -50%)"
                  : "translate(50%, -50%)",
              transition: "top 0.5s ease, right 0.5s ease",
              // opacity to 1 if scrollPercent is greater than 50
              opacity: scrollPercent >= 48 ? "1" : "0",
            }}
          >
            <span className="text-6xl text-center font-semibold">
              <p>
                {" "}
                Unleash your <span className="gradient-text">Creativity</span>
              </p>
              <p> one sound at a time.</p>
            </span>
          </div>
        </div>
        <div className="md:opacity-100 opacity-0 z-10 w-2/4 h-3/5 rounded-full bg-accent absolute blur-[100px] top-36 left-1/2"></div>{" "}
      </div>
      <div className="mb-hide w-full h-screen bg-gradient-to-b from-bgG1 to-bgG1 via-bgG2 overflow-auto"></div>
    </div>
  );
};

export default Landing;
