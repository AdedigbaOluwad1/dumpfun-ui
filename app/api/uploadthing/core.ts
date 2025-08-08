import { createUploadthing, type FileRouter } from "uploadthing/server";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("Upload complete!", file);
    },
  ),
  jsonUploader: f({
    "application/json": {
      maxFileSize: "1KB",
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete!", file);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
