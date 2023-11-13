"use client";
import "../../styles/Utils.css";
import Image from "next/image";
import SoundButton from "@/app/components/SoundButton";
import ImageUpload from "@/app/components/ImageUpload";
import AddSound from "@/app/components/AddSound";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
const page = ({ params }) => {
  // temp data (will be fetched using params.dashboard_id)
  const [soundsData, setSoundsData] = useState([
    {
      sound_id: "sound_1",
      name: "Sound 1",
      board_id: "sound_1",
      file: "https://www.myinstants.com/media/sounds/bruh-sound-effect_WstdzdM.mp3",
      logo: "https://robohash.org/sound_1",
      lastPlayed: "2021-10-10T12:00:00.000Z",
    },
    {
      sound_id: "sound_2",
      name: "Sound 2",
      board_id: "sound_2",
      file: "https://www.myinstants.com/media/sounds/duck-toy-sound.mp3",
      logo: "https://robohash.org/sound_2",
      lastPlayed: "2021-10-10T12:00:00.000Z",
    },
  ]);
  // temp soundboard data that will be fetched later
  const [soundboards, setSoundboards] = useState([
    {
      id: "sound_1",
      name: "Soundboard 1",
      logo: "https://robohash.org/helloworld",
      visibility: "Private",
    },
    {
      id: "sound_2",
      name: "Soundboard 2",
      logo: "https://robohash.org/hello",
      visibility: "Public",
    },
  ]);
  const [dashboardId, setDashboardId] = useState("");
  const [dashboardImage, setDashboardImage] = useState("");
  const [boardVisibility, setBoardVisibility] = useState("");

  // Update dashboard ID and image when soundboards changes
  useEffect(() => {
    const soundboard = soundboards.find((sb) => sb.id === params.dashboard_id);
    if (soundboard) {
      setDashboardId(soundboard.id);
      setDashboardImage(soundboard.logo);
      setBoardVisibility(soundboard.visibility);
    }
  }, [soundboards, params.dashboard_id]);

  return (
    <div className="w-full h-full py-2 px-4 gap-4 flex flex-col">
      {/* add click to edit board page */}
      <Dialog>
        <DialogTrigger className="soundboard-card w-full h-24 flex items-center hover:bg-utility transition-all rounded-md cursor-pointer px-4">
          <div className="h-4/5 w-4/5 flex gap-6">
            <div className="pic aspect-square h-full bg-utility rounded-md flex justify-center items-center">
              <Image
                className="object-cover rounded-md w-18 h-18"
                src={dashboardImage}
                width={72}
                height={72}
                alt={dashboardId}
              ></Image>
            </div>
            <div className="desc flex flex-col h-full w-full gap-1.5 py-1.5 justify-start flex text-start">
              <h1 className="text-3xl font-semibold">{dashboardId}</h1>
              <span className="gradient-text font-regular">
                {boardVisibility} Soundboard
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <span className="text-accent"># </span>Edit Soundboard
          </DialogTitle>
          <div className="text-text py-4 gap-6 flex-col flex">
            <div className="flex-col flex justify-center gap-4">
              <div className="visibility flex gap-4  flex items-center">
                <span className="w-20">Visibility</span>
                <Select className="text-gray-500" defaultValue="public">
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Public" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="Name flex gap-4 flex items-center">
                <span className="w-20">Name</span>
                <Input className="w-[180px] h-8" />
              </div>
              <div className="Name flex gap-4 flex items-center">
                <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm"></div>
                <ImageUpload />
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

      <div className="sounds-container w-full h-fit px-4 flex gap-4">
        <AddSound />
        {soundsData.map((sound) => (
          <SoundButton
            key={sound.sound_id}
            name={sound.name}
            file={sound.file}
            logo={sound.logo}
            setSoundsData={setSoundsData}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
