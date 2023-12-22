"use client";
import { useToast } from "@/components/ui/use-toast";

import { UploadDropzone } from "@uploadthing/react";

const SoundUpload = ({ setSound }) => {
  const { toast } = useToast();
  return (
    // <div className="h-20 w-80 bg-background border-[1px] border-utility border-dashed flex justify-center items-center text-xs rounded-md gap-2">
    //   <div className="flex flex-col justify-center items-center gap-1">
    //     <button className="bg-primary px-1 py-0.5 w-24 rounded-sm text-xs">
    //       choose file
    //     </button>
    //     <span>or</span>
    //     <span>drag image here</span>
    //   </div>
    // </div>
    <UploadDropzone
      className="mt-0 p-2 w-80 bg-background border-[1px] border-utility border-dashed flex justify-center items-center text-xs rounded-md gap-2 ut-label:text-xs ut-upload-icon:h-8 gap-1 ut-button:px-0.5 ut-button:py-0.5 ut-button:rounded-sm ut-button:bg-primary ut-label:text-gray-200 ut-button:text-xs ut-button:h-8 ut-allowed-content:"
      endpoint="soundUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        // console.log("Files: ", res[0].ur);
        console.log("Files: ", res);
        console.log("Files: ", res[0].name);
        setSound(res[0].url);
        toast({
          title: "Sound Upload Completed",
          description: res[0].name,
        });
        // alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default SoundUpload;
