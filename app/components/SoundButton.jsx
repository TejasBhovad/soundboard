"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUpload from "@/app/components/ImageUpload";
import SoundUpload from "@/app/components/SoundUpload";
import { Input } from "@/components/ui/input";
const SoundButton = ({ sound_id, name, file, logo }) => {
  // Play sound
  const playSound = () => {
    const audio = new Audio(file);
    audio.play();
  };

  // Handle edit click
  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent the sound from playing
    console.log("Edit clicked");
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
      {/* Edit button on top */}
      <div className="absolute top-0 right-0 z-10" onClick={handleEditClick}>
        <Dialog>
          <DialogTrigger className="">
            <div className="w-7 h-7 bg-utility rounded-tr-sm rounded-bl-sm flex justify-center items-center">
              {/* edit svg icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-text"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  className="text-text"
                  d="M15.707 4.293a1 1 0 010 1.414L6.414 15H4v-2.414l9.293-9.293a1 1 0 011.414 0zM15 7l-1-1 2-2 1 1-2 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              <span className="text-accent"># </span>Edit Sound
            </DialogTitle>
            <div className="text-text py-4 gap-6 flex-col flex">
              <div className="flex-col flex justify-center gap-4">
                <div className="Name flex gap-4 flex items-center">
                  <span className="w-20">Name</span>
                  <Input className="w-[180px] h-8" />
                </div>
                <div className="image flex gap-4 flex items-center">
                  <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm"></div>
                  <ImageUpload />
                </div>
                <div className="file flex gap-4 flex items-center">
                  <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm"></div>
                  <SoundUpload />
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all">
                  Save
                </button>
                <button className="px-2 py-1 bg-background font-semibold w-20 rounded-sm hover:opacity-75 transition-all border border-utility border-[1px]">
                  Delete
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
