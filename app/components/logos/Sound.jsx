import React from "react";

function Sound({ sound }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_15_174)">
        <path fill="" d="M0 0H24V24H0z"></path>
        <path
          stroke={sound ? "#8036FF" : "#2F2950"}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16V8h3l5-4v16l-5-4H3zM13 9s2 .5 2 3-2 3-2 3M15 7s3 .833 3 5-3 5-3 5"
        ></path>
        <path
          stroke=""
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 5s4 1.167 4 7-4 7-4 7"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_15_174">
          <path fill="#fff" d="M0 0H24V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Sound;
