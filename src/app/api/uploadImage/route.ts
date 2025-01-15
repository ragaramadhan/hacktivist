import { handleDelete, handleUpload } from "@/config/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const data = await request.formData();
  const file: File | null = data.get("picture") as File;
  let cldRes = null;

  if (!file) {
    return NextResponse.json({ success: false });
  } else {
    // ? mengambil data file berupa buffer tanpa multer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageBase64 = buffer.toString("base64");
    const dataURI = "data:" + file.type + ";base64," + imageBase64;

    cldRes = await handleUpload(dataURI);
  }
  console.log(cldRes);

  return NextResponse.json(cldRes);
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();
  const publicId = data.publicId;

  const cldRes = await handleDelete(publicId);

  return NextResponse.json(cldRes);
};
