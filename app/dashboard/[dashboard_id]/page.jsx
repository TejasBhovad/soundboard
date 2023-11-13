"use client";
import "../../styles/Utils.css";
import Image from "next/image";
import SoundButton from "@/app/components/SoundButton";
import AddSound from "@/app/components/AddSound";
import { useState, useEffect } from "react";
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
      <div className="soundboard-card w-full h-24 flex items-center hover:bg-utility transition-all rounded-md cursor-pointer px-4">
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
          <div className="desc flex flex-col h-full w-full gap-1.5 py-1.5">
            <h1 className="text-3xl font-semibold">{dashboardId}</h1>
            <span className="gradient-text font-regular">
              {boardVisibility} Soundboard
            </span>
          </div>
        </div>
      </div>
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
