import { savePdf } from "@/models/pdf";
export const POST = async (request: Request) => {
  const body = await request.json();
  const {
    pdfData,
    // filename
  } = body;
  const inputPdf: string = pdfData;
  const inputFilename: string = pdfData;
  const inputSend = {
    inputPdf,
    inputFilename,
  };
  //   console.log(pdfData, filename);
  await savePdf(inputSend);
  return Response.json({
    message: "Success Premium ",
  });
};

// export const GET = async() => {
//     await
// };
