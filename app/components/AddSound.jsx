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
import { Input } from "@/components/ui/input";
import ImageUpload from "@/app/components/ImageUpload";
import BigPlus from "@/app/components/logos/BigPlus";
import SoundUpload from "@/app/components/SoundUpload";
const SoundButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="mb-4">
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
          <DialogDescription className="text-text py-4 gap-6 flex-col flex">
            <div className="flex-col flex justify-center gap-4">
              <div className="Name flex gap-6 flex items-center">
                <span className="w-8">Name</span>
                <Input className="w-[360px] h-8" />
              </div>
              <div className="Name flex gap-4 flex items-center">
                <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm"></div>
                <ImageUpload />
              </div>
              <div className="Name flex gap-4 flex items-center">
                <div className="aspect-square w-20 bg-background border-[1px] border-utility rounded-sm"></div>
                <SoundUpload />
              </div>
            </div>
            <button className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all">
              Next
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SoundButton;
