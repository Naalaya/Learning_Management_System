import { OurFileRouter } from "@/app/api/uploadthing/core";
import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import { createUploadthing } from "uploadthing/server";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const f = createUploadthing();

export const imageUploader = f({
  image: { maxFileSize: "4MB" },
}).onUploadComplete(({ metadata, file }) => {
  console.log("Upload completed:", file);
});
