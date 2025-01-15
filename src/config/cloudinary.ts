import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export const handleUpload = async (dataURI: string) => {
  try {
    const res = await cloudinary.uploader.upload(dataURI, {
      folder: "hacktivist",
      use_filename: true,
      resource_type: "auto",
    });

    return res;
  } catch (error) {
    console.error("Error uploading file to Cloudinary", error);
  }
};

export const handleDelete = async (publicId: string) => {
  try {
    const res = await cloudinary.uploader.destroy(publicId);

    return res;
  } catch (error) {
    console.error("Error deleting file from Cloudinary", error);
  }
};
