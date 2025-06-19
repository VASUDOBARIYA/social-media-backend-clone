import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from 'dotenv';
dotenv.config();
// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    console.log("File uploaded successfully to Cloudinary:", response.url);

    // Cleanup local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
    
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Safely attempt to delete the temp file (if it exists)
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (fsErr) {
      console.error("Error removing temp file:", fsErr);
    }

    return null;
  }
};

export default uploadOnCloudinary;
