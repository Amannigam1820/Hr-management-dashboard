import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";



const uploadToCloudinary = async (
  file: { tempFilePath: string },
  folder: string
) => {
  if (!file || !file.tempFilePath) {
    throw new Error("No file provided or file path is empty");
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        folder: folder,
      }
    );

    const cloudinarys = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };

    return cloudinarys;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
};


export { uploadToCloudinary };
