import { ObjectId } from "mongodb";

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
  profile: {
    address: string;
    birth: string;
  };
  credentials?: {
    education: string[];
    certification: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type SafeUserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: {
    picture: string;
    address: string;
    birth: string;
  };
  credentials?: {
    education: string[];
    certification: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UserUpdateType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  profile: {
    address: string;
    birth: string;
  };
  credentials?: {
    education: string[];
    certification: string;
  };
  createdAt: string;
  updatedAt: string;
};
