export const UploadImage = async (data: File | null) => {
  try {
    let dataPicture = null;
    if (data) {
      dataPicture = new FormData();
      dataPicture.set("picture", data);
    }

    const res = await fetch("/api/uploadImage", {
      method: "POST",
      body: dataPicture,
    });
    const cldRes = await res.json();
    // console.log("cldRes nih: ", cldRes);

    return cldRes;
  } catch (error) {
    console.log(error);
  }
};

// untuk mengambil publicId dari url
const extractPublicIdFromUrl = (secureUrl: string) => {
  const parsedUrl = new URL(secureUrl);
  const pathname = parsedUrl.pathname; // Ambil bagian path (pathname)
  // Pisahkan path berdasarkan "/"
  const parts = pathname.split("/");
  // Hapus elemen-elemen awal yang tidak diperlukan ("/", "image", "upload", "v1234567890")
  parts.splice(0, 5); // Menghapus "/", "image", "upload", dan "v1234567890"
  // Gabungkan kembali elemen path yang tersisa
  const filenameWithExtension = parts.join("/");
  // Hapus ekstensi file (contoh: .jpg, .png, .pdf)
  const filenameWithoutExtension = filenameWithExtension.replace(/\.[^.]+$/, ""); // Menghapus ekstensi file
  return filenameWithoutExtension;
};

export const DeleteImageFromCloudinary = async (url: string) => {
  try {
    // console.log("Coba untuk delete Image dari cloudinary: ", url);
    // ? ambil publicId dengan extractPublicIdFromUrl
    const publicId = extractPublicIdFromUrl(url);

    // ? delete image dari cloudinary dengan cloudinary action
    await fetch("/api/uploadImage", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicId,
      }),
    });
    // console.log("Berhasil menghapus image dari cloudinary");

    return true;
  } catch (error) {
    console.log(error);
  }
};
