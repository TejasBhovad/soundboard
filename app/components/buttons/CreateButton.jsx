"use client";
import { saveBoard } from "@/app/queries/board";
import { useSession } from "next-auth/react";
import { useUserData } from "@/app/hooks/db";
import { useEffect, useState } from "react";
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
import ImageUpload from "@/app/components/ImageUpload";
import Plus from "@/app/components/logos/Plus";
import Image from "next/image";

const CreateButton = ({ isSidebarOpen, isTextVisible }) => {
  const { data: session, status } = useSession();

  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    if (status === "authenticated") {
      setUserEmail(session.user.email);
    }
  }, [status]);
  const { userData, loading } = useUserData(userEmail);
  const creator = userData?.$id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [boardID, setBoardID] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState("https://robohash.org/placeholder");

  const handleNameChange = (event) => {
    setName(event.target.value);
    const random_5 = Math.random().toString(36).substring(7);
    const bID =
      event.target.value.replace(" ", "_").toLowerCase() + "_" + random_5;
    setBoardID(bID);
    setIsNameValid(event.target.value !== "");
  };

  const handleNextClick = () => {
    setIsNextClicked(true);
    setIsDialogOpen(false);
    setIsNameValid(name !== "");
    if (name !== "") {
      saveBoard(name, creator, image, visibility, boardID, 0);
    }
  };

  useEffect(() => {
    console.log("visibility", visibility);
    console.log("name", name);
    console.log("boardID", boardID);
    console.log("image", image);
    console.log(userEmail);
    console.log(creator);
    
    if (image.includes("robohash") && name !== "") {
      setImage("https://robohash.org/" + name.replace(" ", ""));
    }
  }, [visibility, name, image]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={
        (value) => setIsDialogOpen(value)
      }
    >
      <DialogTrigger className="mb-4">
        <div
          onClick={() => setIsDialogOpen(true)}
          className={`collapse-btn w-full flex h-10 gap-2 items-center cursor-pointer rounded-sm bg-accent hover:bg-primary transition-all justify-center items-center ${
            isSidebarOpen ? "" : "justify-center px-0"
          }`}
        >
          <span className="flex justify-center items-center">
            <Plus />
          </span>

          {isTextVisible && (
            <div className="flex items-center h-full font-semibold text-md overflow-hidden whitespace-nowrap">
              Create Board
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-accent"># </span>Create new Soundboard
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
                    (value) => setVisibility(value) 
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
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="Name flex gap-4 flex items-start">
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
            <button
              className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;
