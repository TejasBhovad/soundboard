import React from "react";

const SoundUpload = () => {
  return (
    <div className="h-20 w-80 bg-background border-[1px] border-utility border-dashed flex justify-center items-center text-xs rounded-md gap-2">
      <div className="flex flex-col justify-center items-center gap-1">
        <button className="bg-primary px-1 py-0.5 w-24 rounded-sm text-xs">
          choose file
        </button>
        <span>or</span>
        <span>drag sound here</span>
      </div>
    </div>
  );
};

export default SoundUpload;
