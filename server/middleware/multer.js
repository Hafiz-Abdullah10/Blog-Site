import multer from "multer";
import ImageKit from "imagekit";
import fs from "fs";

// Configure local temporary storage for incoming file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp_uploads/"); // temporary folder (will be auto-created)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Configure ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Helper function to upload file to ImageKit
export const uploadToImageKit = async (filePath, fileName) => {
  const fileBuffer = fs.readFileSync(filePath);

  const result = await imagekit.upload({
    file: fileBuffer, // upload the buffer
    fileName,
    folder: "blog_uploads", // optional folder in ImageKit
  });

  // Delete the temp file after upload
  fs.unlinkSync(filePath);

  return result.url;
};

export default upload;
