"use client";

import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@uploadthing/react";

const SoundUpload = ({ setSound }) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      className="mt-0 p-2 w-80 bg-background border-[1px] border-utility border-dashed flex justify-center items-center text-xs rounded-md gap-2 ut-label:text-xs ut-upload-icon:h-8 gap-1 ut-button:px-0.5 ut-button:py-0.5 ut-button:rounded-sm ut-button:bg-primary ut-label:text-gray-200 ut-button:text-xs ut-button:h-8 ut-allowed-content:"
      endpoint="soundUploader"
      onClientUploadComplete={(res) => {
        setSound(res[0].url);
        toast({
          title: "Sound Upload Completed",
          description: res[0].name,
        });
      }}
      onUploadError={(error) => {
        toast({
          title: "Sound Upload Failed",
          description: error.message,
        });
      }}
    />
  );
};

export default SoundUpload;
