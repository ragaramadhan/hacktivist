import { ObjectId } from "mongodb";
import { getDb } from "./user";

export type InputPayments = {
  userId: string;
  amount: number;
  paymentType: string;
  status: string;
};

const COLLECTION = "payments";

export const createPayment = async (body: InputPayments) => {
  const db = await getDb();
  const bodyInput = {
    ...body,
    userId: new ObjectId(body?.userId),
    transactionDate: new Date().toISOString(),
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const readPayment = async (id: string) => {
  //ini untuk melihat payment dari user yang sedang login
  const db = await getDb();
  // console.log("cek dlu masuk apa gak");

  const response = await db
    .collection(COLLECTION)
    .find({ userId: new ObjectId(id) })
    .toArray();
  // console.log(response, "ini di model ya");

  return response;
};
