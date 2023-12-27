const { createUploadthing } = require("uploadthing/next");
import { getToken } from "next-auth/jwt";
const f = createUploadthing();

const auth = (req) => ({
  id: "fakeId",
});
const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getToken({ req });
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  // sound upload
  soundUploader: f({ audio: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await getToken({ req });
      if (!user) throw new Error("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
};

module.exports = { ourFileRouter };
