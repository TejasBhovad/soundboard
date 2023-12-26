"use client";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { BoardsContext } from "@/app/components/BoardsContext";
import { useUserData } from "@/app/hooks/db";
import { useRouter } from "next/navigation";
import { updateBoard, deleteBoard } from "@/app/queries/board";
import { updateRecentBoards } from "@/app/queries/user";
import { useToast } from "@/components/ui/use-toast";
import "../../styles/Utils.css";
import Image from "next/image";
import Share from "@/app/components/logos/Share";
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
  const URL = "http://localhost:3000/";
  const router = useRouter();
  const { data: session, status } = useSession();
  const { boardsState, setBoardsState } = useContext(BoardsContext);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
    }
  }, [status]);
  const { userData, loading, setRefetch } = useUserData(userEmail);
  const creator = userData?.$id;
  const recentBoards = userData?.recent_boards;
  const { toast } = useToast();
  // temp data (will be fetched using params.dashboard_id)
  const [soundsData, setSoundsData] = useState([]);
  // temp soundboard data that will be fetched later
  const [soundboards, setSoundboards] = useState([]);
  const [dashboardId, setDashboardId] = useState(params.dashboard_id);
  const [dashboardImage, setDashboardImage] = useState(
    "https://robohash.org/" + params.dashboard_id
  );
  const [boardVisibility, setBoardVisibility] = useState("public");

  // Update dashboard ID and image when soundboards changes
  useEffect(() => {
    const soundboard = soundboards.find(
      (sb) => sb.board_id === params.dashboard_id
    );
    if (soundboard) {
      setDashboardId(soundboard.$id);
      setDashboardImage(soundboard.logo);
      setBoardVisibility(soundboard.visibility);
      setBoardName(soundboard.name);
      setSoundsData(soundboard.sounds);
      // set context
      setBoardsState(soundboards);
      // console.log("soundboard", boardsState);
    }
  }, [soundboards, params.dashboard_id]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boardName, setBoardName] = useState(params.dashboard_id.split("_")[0]);
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState("https://robohash.org/placeholder");
  const [isNameValid, setIsNameValid] = useState(true);
  const handleNameChange = (event) => {
    setBoardName(event.target.value);
    setIsNameValid(event.target.value !== "");
  };

  const handleNextClick = () => {
    setIsDialogOpen(false);
    if (boardName !== "") {
      // board_id, name, logo, visibility
      updateBoard(dashboardId, boardName, image, visibility);
      // saveBoard(boardName, creator, image, visibility, boardID, 0);
    }
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(URL + params.dashboard_id);
    console.log("copied:" + URL + params.dashboard_id);
    toast({
      title: "Copied to clipboard",
      description: (
        <span className="gap-2">
          <span>url: </span>
          <a
            className="text-logoGradientDark underline"
            href={URL + params.dashboard_id}
          >
            {URL + params.dashboard_id}
          </a>
        </span>
      ),
    });
  };
  const handleDeleteClick = () => {
    setIsDialogOpen(false);
    // remove dashboardId from recentBoards
    recentBoards.splice(recentBoards.indexOf(params.dashboard_id), 1);
    updateRecentBoards(creator, recentBoards);
    // remove delete board from context
    setBoardsState((prev) =>
      prev.filter((board) => board.board_id !== params.dashboard_id)
    );
    deleteBoard(dashboardId);
    setRefetch((prev) => !prev);
    router.push(`/dashboard/`);
  };

  useEffect(() => {
    // console.log("visibility", visibility);
    // console.log("name", boardName);
    // console.log("image", image);
    if (image.includes("robohash") && boardName !== "") {
      setImage("https://robohash.org/" + boardName.replace(" ", ""));
    }
  }, [visibility, boardName, image]);
  useEffect(() => {
    if (loading) return;
    if (userData) {
      // console.log("userData", userData?.recent_boards);
      setSoundboards(userData.boards);

      // console.log("soundboards", soundboards);
    }
  }, [userData, loading]);

  useEffect(() => {
    if (creator && dashboardId && recentBoards) {
      console.log("recent_boards", recentBoards);
      // add dashboardId to recentBoards to front of array if it doesn't exist
      if (!recentBoards.includes(dashboardId)) {
        recentBoards.unshift(dashboardId);
      }
      // if it does exist, move it to the front of the array
      else {
        recentBoards.splice(recentBoards.indexOf(dashboardId), 1);
        recentBoards.unshift(dashboardId);
      }
      // recentBoards.push(dashboardId);
      updateRecentBoards(creator, recentBoards);
    }
  }, [creator]);
  return (
    <div className="w-full h-full py-6 sm:py-2 px-4 sm:px-0 gap-4 flex flex-col flex items-center sm:items-start">
      {/* add click to edit board page */}
      <div className="w-full flex">
        <Dialog
          open={isDialogOpen}
          onOpenChange={
            (value) => setIsDialogOpen(value) // eslint-disable-line
          }
          className="flex"
        >
          <DialogTrigger
            className="soundboard-card w-10/12 h-32 flex items-center hover:bg-utility transition-all rounded-md cursor-pointer px-4 justify-center md:justify-start "
            onClick={() => setIsDialogOpen(true)}
          >
            <div className="h-4/5 w-4/5 flex gap-6 ">
              <div className="pic aspect-square h-full bg-utility rounded-md flex justify-center items-center">
                <Image
                  className="object-cover rounded-md w-fit"
                  src={dashboardImage}
                  width={72}
                  height={72}
                  alt={dashboardId}
                ></Image>
              </div>
              <div className="desc flex flex-col h-full w-full gap-1.5 py-1.5 justify-start flex text-start">
                <h1 className="text-3xl font-semibold">{boardName}</h1>
                <span className="gradient-text font-regular">
                  {boardVisibility.charAt(0).toUpperCase() +
                    boardVisibility.slice(1)}{" "}
                  Soundboard
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
                  <Select
                    className="text-gray-500"
                    defaultValue="public"
                    value={visibility}
                    onValueChange={
                      (value) => setVisibility(value) // eslint-disable-line
                    }
                  >
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
                  <Input
                    className={`w-[180px] h-8 ${
                      !isNameValid ? "border-red-500" : ""
                    }`}
                    value={boardName}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="Name flex gap-4 flex items-center">
                  <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm">
                    <Image
                      src={image}
                      width={80}
                      height={80}
                      alt="default image"
                      className="w-full h-full"
                    />
                  </div>
                  <ImageUpload setImage={setImage} />
                </div>
              </div>
              {!isNameValid && (
                <div className="text-red-500 bg-opacity-20	 text-xs bg-red-400 px-2 py-1 w-40 text-center rounded-full">
                  Please enter a name
                </div>
              )}
              <div className="flex gap-4">
                <button
                  className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all"
                  onClick={handleNextClick}
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
        <div className="w-auto flex justify-center items-start px-5 py-4">
          <div
            className=" h-12 w-12 hover:bg-utility aspect-square rounded-md flex justify-center items-center p-2 hover:scale-95 transition-all cursor-pointer"
            onClick={handleCopyClick}
          >
            <Share />
          </div>
        </div>
      </div>

      <div className="sounds-container w-full h-fit px-4 grid grid-cols-2 sm:grid-cols-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-4 flex justify-center place-items-center md:justify-items-start">
        <AddSound
          bID={dashboardId}
          creator={creator}
          setSoundsData={setSoundsData}
          soundsData={soundsData}
          setRefetch={setRefetch}
        />
        {soundsData?.map((sound) => (
          <SoundButton
            key={sound.sound_id}
            name={sound.name}
            file={sound.file}
            logo={sound.logo}
            setSoundsData={setSoundsData}
            sound_id={sound.$id}
            bID={dashboardId}
            creator={creator}
            plays={sound.plays}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
