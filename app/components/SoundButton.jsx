"use client";
import Image from "next/image";
const SoundButton = ({ sound_id, name, file, logo }) => {
  // play Sound
  const playSound = () => {
    const audio = new Audio(file);
    audio.play();
  };
  return (
    <div
      className="w-28 h-32 relative rounded-sm border-[1px] border-utility overflow-hidden hover:shadow-md cursor-pointer transition-all hover:border-logoGradientLight"
      style={{
        background: "radial-gradient(circle at 50% 50%, #563284, #141317 50%)",
      }}
      onClick={playSound}
    >
      <div className="absolute inset-0 bg-secondary bg-opacity-60 backdrop-blur-md"></div>
      <div className="relative h-full w-full">
        <div className="h-3/5 w-full flex justify-center items-center">
          <Image src={logo} alt="sound logo" width={64} height={64} />
        </div>
        <div className="h-2/5 w-full flex justify-center items-center font-semibold">
          {name}
        </div>
      </div>
    </div>
  );
};

export default SoundButton;
