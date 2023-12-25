"use client";

import Image from "next/image";
import Sound from "@/app/components/logos/Sound";
import { updateSound, deleteSound } from "@/app/queries/sound";
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
import { useEffect, useState } from "react";
const SoundButton = ({
  sound_id,
  name,
  file,
  logo,
  bID,
  creator,
  plays,
  setSoundsData,
}) => {
  // Play sound
  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  // Handle edit click
  const handleEditClick = (event) => {
    event.stopPropagation(); // Prevent the sound from playing
    console.log("Edit clicked");
  };

  const [soundName, setSoundName] = useState(name);
  const [soundLogo, setSoundLogo] = useState(logo);
  const [soundFile, setSoundFile] = useState(file);
  const [soundID, setSoundID] = useState(sound_id);
  const [soundBoard, setSoundBoard] = useState(bID);
  const [soundCreator, setSoundCreator] = useState(creator);
  const [soundPlays, setSoundPlays] = useState(plays);

  // const [soundPlays, setSoundPlays] = useState(0);

  const [isNameValid, setIsNameValid] = useState(true);

  const handleNameChange = (event) => {
    setTempName(event.target.value);
    setIsNameValid(event.target.value !== "");
  };

  useEffect(() => {
    setSoundName(name);
    setSoundLogo(logo);
    setSoundFile(file);
    setSoundID(sound_id);
    setSoundBoard(bID);
    setSoundCreator(creator);
    setSoundPlays(plays);
  }, [name, logo, file, sound_id, bID, creator, plays]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // temp states for edit dialog
  const [tempName, setTempName] = useState(name);
  const [tempLogo, setTempLogo] = useState(logo);
  const [tempFile, setTempFile] = useState(file);

  useEffect(() => {
    setTempName(name);
    setTempLogo(logo);
    setTempFile(file);
  }, [name, logo, file]);

  useEffect(() => {
    setSoundID(sound_id);
  }, [sound_id]);

  // set temp states to current sound data
  useEffect(() => {
    setSoundName(tempName);
    setSoundLogo(tempLogo);
    setSoundFile(tempFile);
  }, [tempName, tempLogo, tempFile]);
  const handleSaveClick = () => {
    if (isNameValid) {
      setSoundName(tempName);
      setSoundLogo(tempLogo);
      setSoundFile(tempFile);
      updateSound(
        soundID,
        soundName,
        soundLogo,
        soundFile,
        0,
        // soundCreator,
        soundBoard,
        new Date().toISOString()
      );
      setIsDialogOpen(false);
    }
  };

  const handleDeleteClick = () => {
    console.log("Delete clicked");
    // console.log("soundID", sound_id);
    if (soundID !== undefined) {
      deleteSound(soundID, soundLogo, soundFile);
      setIsDialogOpen(false);
      setSoundsData((prev) => prev.filter((sound) => sound.$id !== soundID));
    }
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
        <Dialog
          open={isDialogOpen}
          onOpenChange={(value) => setIsDialogOpen(value)}
        >
          <DialogTrigger className="" onClick={() => setIsDialogOpen(true)}>
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
                  <Input
                    className={`w-[180px] h-8 ${
                      !isNameValid ? "border-red-500" : ""
                    }`}
                    value={tempName}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="Name flex gap-4 flex items-start">
                  <div className="justify-between flex flex-col gap-2">
                    <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm">
                      <Image
                        src={tempLogo}
                        width={80}
                        height={80}
                        alt="default image"
                        className="w-full h-full"
                      />
                    </div>{" "}
                    <span className="w-full items-center flex justify-center text-gray-500 bg-secondary border-solid border-[1px] border-utility rounded-sm">
                      image
                    </span>
                  </div>{" "}
                  <ImageUpload setImage={setTempLogo} />
                </div>
              </div>
              <div className="Name flex gap-4 flex items-start">
                <div className="justify-between flex flex-col gap-2">
                  <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm flex justify-center items-center">
                    <Sound />
                  </div>{" "}
                  <span className="w-full items-center flex justify-center text-gray-500 bg-secondary border-solid border-[1px] border-utility rounded-sm">
                    sound
                  </span>
                </div>
                <SoundUpload setSound={setTempFile} />
              </div>
              <div className="error flex gap-2">
                {/* show error message when name not valid */}
                {!isNameValid && (
                  <div className="text-red-500 bg-opacity-20	 text-xs bg-red-400 px-2 py-1 w-40 text-center rounded-full">
                    Please enter a name
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  className="px-2 py-1 bg-background font-semibold w-20 rounded-sm hover:opacity-75 transition-all border border-utility border-[1px]"
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
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
