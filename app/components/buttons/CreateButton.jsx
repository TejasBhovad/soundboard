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

const CreateButton = ({ isSidebarOpen, isTextVisible }) => {
  return (
    <Dialog>
      <DialogTrigger className="mb-4">
        <div
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
          <DialogDescription className="text-text py-4 gap-6 flex-col flex">
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
            <button className="px-2 py-1 bg-accent font-semibold w-20 rounded-sm hover:bg-primary transition-all">
              Next
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;
