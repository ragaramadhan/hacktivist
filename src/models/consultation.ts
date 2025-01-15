import { ObjectId } from "mongodb";
import { getDb } from "./user";
export type InputConsultations = {
  clientId: string;
  lawyerId: string;
  duration: number;
  scheduledAt: string;
  status: string;
  notes?: string;
};

const COLLECTION = "consultations";

export const createConsul = async (body: InputConsultations) => {
  const db = await getDb();
  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const readConsul = async (id: string) => {
  const db = await getDb();

  const response = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  return response;
};

export const readConsulAll = async () => {
  const db = await getDb();
  const response = await db.collection(COLLECTION).find().toArray();

  return response;
};
