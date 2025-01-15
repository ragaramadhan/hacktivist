import { Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/config";
import { hashPass } from "../utils/bcrypt";
import { UserUpdateType } from "@/types/userType";

export type Profile = {
  address: string;
  birth: string;
};
export type CredentialLawyer = {
  education: string[];
  certification: string;
};
export type InputUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
};

export type InputLawyer = {
  name: string;
  email: string;
  password: string;
  role: string;
  profile: Profile;
  specialization: string;
  credentials: CredentialLawyer;
};
const DATABASE_NAME = "hacktivist";
const COLLECTION = "users";
const COLLECTION2 = "lawyers";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const registerUser = async (body: InputUser) => {
  const db = await getDb();
  body.password = await hashPass(body.password);
  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const result = await db.collection(COLLECTION).insertOne(bodyInput);

  return result;
};

export const registerLawyer = async (body: InputLawyer) => {
  const db = await getDb();
  body.password = await hashPass(body.password);
  const bodyInput = {
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const result = await db.collection(COLLECTION2).insertOne(bodyInput);

  return result;
};

export const getUserByEmail = async (email: string) => {
  //ini dipakai saat login
  const db = await getDb();

  const result = db.collection(COLLECTION).findOne({ email });

  return result;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });

  return user ? { id: user._id, name: user.name, email: user.email } : null;
};

export const updateUser = async (user: UserUpdateType) => {
  const db = await getDb();
  const result = await db.collection("users").updateOne({ _id: user._id }, { $set: user });

  return result;
};

export const findUserRoleLawyer = async () => {
  const db = await getDb();
  const result = await db.collection("users").find({ role: "lawyer" }).toArray();

  return result;
};

export const findLawyerById = async (id: string) => {
  const db = await getDb();
  // console.log(id);

  const result = await db.collection("users").findOne({ role: "lawyer", _id: new ObjectId(id) });

  return result;
};

export const findLawyerByName = async (name: string) => {
  const db = await getDb();

  const result = await db.collection("users").findOne({ role: "lawyer", name });
  return result;
};
