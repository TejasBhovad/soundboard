"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const SoundButton = ({ name, file, logo }) => {
  const [soundName, setSoundName] = useState(name);
  const [soundLogo, setSoundLogo] = useState(logo);
  const [soundFile, setSoundFile] = useState(file);

  useEffect(() => {
    setSoundName(name);
    setSoundLogo(logo);
    setSoundFile(file);
  }, [name, logo, file]);

  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };
  return (
    <div
      className="w-28 h-32 relative rounded-sm border-[1px] border-utility overflow-hidden hover:shadow-md cursor-pointer transition-all hover:border-logoGradientLight  hover:scale-95 active:scale-105"
      style={{
        background: "radial-gradient(circle at 50% 50%, #563284, #141317 50%)",
      }}
      onClick={playSound}
    >
      <div className="absolute inset-0 bg-secondary bg-opacity-60 backdrop-blur-md"></div>
      <div className="relative h-full w-full">
        <div className="h-3/5 w-full flex justify-center items-center">
          <Image
            src={soundLogo}
            alt="sound logo"
            width={64}
            height={64}
            className="rounded-md"
          />
        </div>
        <div className="h-2/5 w-full flex justify-center items-center font-semibold select-none">
          {soundName}
        </div>
      </div>
    </div>
  );
};

export default SoundButton;
