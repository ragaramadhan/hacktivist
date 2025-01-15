import { ObjectId } from "mongodb";
import { getDb } from "./user";

export type InputSubscription = {
  userId: string;
};

export type InputSubscriptionRegister = {
  userId: string;
  type: string;
};

const COLLECTION = "subscriptions";

// export const createSubsFirstRegister = async (body: InputSubscriptionRegister) => {
//   const db = await getDb();

//   const bodyInput = {
//     ...body,
//     userId: new ObjectId(body.userId),
//     startDate: null,
//     endDate: null,
//     status: "expired",
//   };

//   const response = await db.collection(COLLECTION).insertOne(bodyInput);

//   return response;
// };

export const checkSubs = async (id: string) => {
  const db = await getDb();

  const response = await db.collection(COLLECTION).findOne({ userId: new ObjectId(id) });

  return response;
};

export const createSubs = async (userId: string) => {
  const db = await getDb();
  // if (!body.userId) {
  //   throw "Login First";
  // }
  // const Subs = await checkSubs(body.userId);

  // if (!Subs) {
  //   throw `Not Found User`;
  // }

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 30);

  const InputcreateSubs = {
    userId: new ObjectId(userId),
    type: "premium",
    status: "active",
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const response = await db.collection(COLLECTION).insertOne(InputcreateSubs);
  // console.log(`pakah lolos`);

  return response;
};

// export async function extractObjectIdString(input: any) {
//   // Jika input adalah object dengan toString method (ObjectId)
//   if (typeof input === "object" && input !== null) {
//     return input.toString();
//   }

//   // Jika input sudah berupa string
//   if (typeof input === "string") {
//     return input;
//   }

//   return null;
// }

// Fungsi untuk memeriksa dan memperbarui status langganan
export const updateSubscriptionStatus = async () => {
  const db = await getDb();
  const currentDate = new Date();

  // const result =
  await db.collection(COLLECTION).updateMany(
    {
      endDate: { $lt: currentDate },
      status: "active",
      type: "premium",
    },
    {
      $set: {
        status: "expired",
        type: "free",
      },
    }
  );

  // console.log(`${result.modifiedCount} subscriptions updated to expired status.`);
};

// Fungsi yang dimodifikasi untuk membuat langganan

// Fungsi untuk memeriksa status langganan saat mengakses layanan
export const checkSubscriptionStatus = async (userId: string) => {
  const db = await getDb();

  const subscription = await db.collection(COLLECTION).findOne({ userId: new ObjectId(userId) });

  if (!subscription) {
    throw `Not Found User`;
  }

  const currentDate = new Date();
  const endDate = new Date(subscription.endDate);

  if (currentDate > endDate && subscription.status === "active" && subscription.type === "premium") {
    // Update subscription status if it's expired
    await db.collection(COLLECTION).deleteOne({ userId: new ObjectId(userId) });

    return "Success Delete";
  }

  return { status: subscription.status, type: subscription.type };
};
