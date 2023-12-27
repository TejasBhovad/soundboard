"use client";
import { useToast } from "@/components/ui/use-toast";
import { UploadDropzone } from "@uploadthing/react";

const ImageUpload = ({ setImage }) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      className="mt-0 p-2 w-80 bg-background border-[1px] border-utility border-dashed flex justify-center items-center text-xs rounded-md gap-2 ut-label:text-xs ut-upload-icon:h-8 gap-1 ut-button:px-0.5 ut-button:py-0.5 ut-button:rounded-sm ut-button:bg-primary ut-label:text-gray-200 ut-button:text-xs ut-button:h-8 ut-allowed-content:"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        toast({
          title: "Image Upload Completed",
          description: res[0].name,
        });
        setImage(res[0].url);
      }}
      onUploadError={(error) => {
        toast({
          title: "Image Upload Failed",
          description: error.message,
        });
      }}
    />
  );
};

export default ImageUpload;
