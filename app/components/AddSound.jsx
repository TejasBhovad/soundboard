"use client";
// import { ID } from "appwrite";
import { useEffect } from "react";
import Image from "next/image";
import Sound from "@/app/components/logos/Sound";
import { useState } from "react";
import { saveSound } from "@/app/queries/sound";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/app/components/ImageUpload";
import BigPlus from "@/app/components/logos/BigPlus";
import SoundUpload from "@/app/components/SoundUpload";
const SoundButton = ({ bID, creator, setSoundsData, setRefetch }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [boardID, setBoardID] = useState(bID);
  const [soundID, setSoundID] = useState("");
  const [image, setImage] = useState("https://robohash.org/placeholder");
  const [sound, setSound] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [creatorID, setCreatorID] = useState(creator);
  const [isSoundValid, setIsSoundValid] = useState(false);
  const handleNextClick = () => {
    setIsSoundValid(sound !== "");
    if (isNameValid && isSoundValid) {
      // alert("Sound added successfully");
      // sound_id,
      // name,
      // logo,
      // file,
      // plays,
      // creator,
      // board,
      // last_played
      saveSound(
        soundID,
        name,
        image,
        sound,
        0,
        creatorID,
        boardID,
        new Date().toISOString()
      );
      // setSoundsData((prev) => [
      //   ...prev,
      //   {
      //     // $id: ID(),
      //     sound_id: soundID,
      //     name,
      //     logo: image,
      //     file: sound,
      //     plays: 0,
      //     creator: creatorID,
      //     board: boardID,
      //     last_played: new Date().toISOString(),
      //   },
      // ]);
      setRefetch((prev) => !prev);

      setIsDialogOpen(false);
    }
  };

  const handleNameChange = (event) => {
    setIsNameValid(event.target.value !== "");
    setName(event.target.value);
    const random_5 = Math.random().toString(36).substring(7);
    const bID =
      event.target.value.replace(" ", "_").toLowerCase() + "_" + random_5;
    setSoundID(bID);
  };

  useEffect(() => {
    // console.log("name", name);
    // console.log("soundID", soundID);
    // console.log("boardID", boardID);
    // console.log("image", image);
    // console.log("sound", sound);
    // console.log("creatorID", creatorID);
    if (image.includes("robohash") && name !== "") {
      setImage("https://robohash.org/" + name.replace(" ", ""));
    }
  }, [name, image, sound, image]);

  useEffect(() => {
    setBoardID(bID);
  }, [bID]);
  useEffect(() => {
    setCreatorID(creator);
  }, [creator]);

  useEffect(() => {
    setSound(sound);
    setIsSoundValid(sound !== "");
  }, [sound]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => setIsDialogOpen(value)}
    >
      <DialogTrigger className="mb-4" onClick={() => setIsDialogOpen(true)}>
        <div
          className="w-28 h-32 relative rounded-sm border-[1px] border-utility overflow-hidden hover:shadow-md cursor-pointer transition-all hover:border-logoGradientLight"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, #563284, #141317 50%)",
          }}
        >
          <div className="absolute inset-0 bg-secondary bg-opacity-60 backdrop-blur-md"></div>
          <div className="relative h-full w-full">
            <div className="h-3/5 w-full flex justify-center items-end pb-4">
              <span className="flex justify-center items-center">
                <BigPlus />
              </span>
            </div>
            <div className="h-2/5 w-full flex justify-center items-center font-semibold">
              Add Sound
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-accent"># </span>Add new Sound
          </DialogTitle>
          <div className="text-text py-4 gap-6 flex-col flex">
            <div className="flex-col flex justify-center gap-6">
              <div className="Name flex gap-6 flex items-center">
                <span className="w-8">Name</span>
                <Input
                  className={`w-[180px] h-8 ${
                    !isNameValid ? "border-red-500" : ""
                  }`}
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="Name flex gap-4 flex items-start">
                <div className="justify-between flex flex-col gap-2">
                  <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm">
                    <Image
                      src={image}
                      width={80}
                      height={80}
                      alt="default image"
                      className="w-full h-full"
                    />
                  </div>{" "}
                  <span className="w-full items-center flex justify-center text-gray-500 bg-secondary border-solid border-[1px] border-utility rounded-sm">
                    image
                  </span>
                </div>

                <ImageUpload setImage={setImage} />
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
                <SoundUpload setSound={setSound} />
              </div>
              <div className="error flex gap-2">
                {/* show error message when sound not valid */}
                {!isSoundValid && (
                  <div className="text-red-500 bg-opacity-20	 text-xs bg-red-400 px-2 py-1 w-40 text-center rounded-full">
                    Please select a sound
                  </div>
                )}
                {/* show error message when name not valid */}
                {!isNameValid && (
                  <div className="text-red-500 bg-opacity-20	 text-xs bg-red-400 px-2 py-1 w-40 text-center rounded-full">
                    Please enter a name
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleNextClick}
              className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all"
            >
              Next
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SoundButton;
