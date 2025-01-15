import { getDb } from "./user";

type inputSavePdf = {
  inputPdf: string;
  inputFilename: string;
};

const COLLECTION = "pdf";

export const savePdf = async (body: inputSavePdf) => {
  const db = await getDb();

  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

// export const findPdf = async () => {
//   const db = await getDb();

//   const response =  await db.collection(COLLECTION).insert
// };
