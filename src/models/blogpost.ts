import { Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/config";

export type InputBlog = {
  title: string;
  content: string;
  image?: string[];
  authorId: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};
const DATABASE_NAME = "hacktivist";
const COLLECTION = "news";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const createBlog = async (body: InputBlog) => {
  const db = await getDb();

  const bodyInput: InputBlog = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const readBlogAll = async () => {
  const db = await getDb();

  const response = await db.collection(COLLECTION).find().toArray();

  return response;
};

export const readDetail = async (id: string) => {
  const db = await getDb();
  // console.log(id, "ini di model");

  const response = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  return response;
};
