import { Db, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/config";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date | { seconds: number; nanoseconds: number };
}

type keepChatHistoryProp = {
  messages: Message[];
  mongoDbRoomId: string;
};

export type RoomChat = {
  _id: ObjectId;
  participants: string[];
  createdAt: string;
  messages: Message[];
};

export type InputRoomChat = {
  participants: string[];
  bookDate: string;
};

export type InputMessage = {
  senderId: string;
  content: string;
};
const DATABASE_NAME = "hacktivist";
const COLLECTION = "chatrooms";

export const getDb = async () => {
  const client = await connectToDatabase();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const createRoom = async (props: InputRoomChat) => {
  const db = await getDb();

  const participants = props?.participants;
  const bookDate = props?.bookDate;

  const bodyInput = {
    participants,
    createdAt: new Date().toISOString(),
    bookDate,
    messages: [],
    status: "pending",
  };

  const response = await db.collection(COLLECTION).insertOne(bodyInput);

  return response;
};

export const deleteRoom = async (id: string) => {
  const db = await getDb();

  await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });

  return {
    message: `Success Delete Room`,
  };
};

export const findRoom = async () => {
  const db = await getDb();

  const data = await db.collection(COLLECTION).find().toArray();

  return data;
};

export const roomDetail = async (id: string) => {
  const db = await getDb();

  const data = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

  return data;
};

export const CheckRoomLogin = async (id: string) => {
  const db = await getDb();
  console.log(id);

  const data = await db
    .collection(COLLECTION)
    .aggregate([
      {
        $match: {
          participants: id,
          status: "active",
        },
      },
    ])
    .toArray();
  // console.log(data);

  return data;
};

export const getRoomChatByParticipants = async (clientId: string, contactId: string) => {
  const db = await getDb();
  const chatroom = await db.collection(COLLECTION).findOne({
    "participants.participants": { $all: [clientId, contactId] },
  });
  return chatroom;
};

export const activateRoom = async () => {
  const db = await getDb();

  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];
  await db.collection(COLLECTION).updateMany({ status: "pending", bookDate: todayFormatted }, { $set: { status: "active" } });

  return {
    message: "Success Update Room To Active",
  };
};

export const deactiveRoom = async () => {
  const db = await getDb();

  await db.collection(COLLECTION).updateMany({ status: "active" }, { $set: { status: "expired" } });

  return {
    message: "Success Update Room to Expired",
  };
};

export const savedRoom = async () => {
  const db = await getDb();
  await db.collection(COLLECTION).updateMany({ status: "expired" }, { $set: { status: "saved" } });

  return {
    message: "Success Delete Room If that room expired",
  };
};

export const keepChatHistory = async (props: keepChatHistoryProp) => {
  const messages = props?.messages;
  const mongoDbRoomId = props?.mongoDbRoomId;

  const db = await getDb();
  await db.collection(COLLECTION).updateOne(
    { _id: new ObjectId(mongoDbRoomId) }, // Match stage
    {
      $set: {
        messages,
      },
    }
  );

  return {
    message: "Success keep chat history.",
  };
};

export const roomSchedule = async (id: string) => {
  const db = await getDb();
  const data = await db
    .collection(COLLECTION)
    .aggregate([
      {
        $match: {
          participants: id,
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { lawyerId: { $arrayElemAt: ["$participants", 0] } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$lawyerId" }] },
              },
            },
            {
              $project: {
                name: 1,
                "credentials.certification": 1,
              },
            },
          ],
          as: "lawyerInfo",
        },
      },
      {
        $unwind: {
          path: "$lawyerInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          bookDate: 1,
          status: 1,
          participants: 1,
          messages: 1,
          createdAt: 1,
          lawyerName: "$lawyerInfo.name",
          lawyerCertification: "$lawyerInfo.credentials.certification",
        },
      },
    ])
    .toArray();

  // console.log(data, "ini pada bagian incoming");

  return data;
};

export const roomDeactive = async () => {
  const db = await getDb();

  const data = await db
    .collection(COLLECTION)
    .aggregate([{ $match: { status: "expired" } }, { $project: { participants: 1 } }])
    .toArray();

  return data;
};

export const riwayatRoom = async (id: string) => {
  const db = await getDb();
  // console.log(id, "di model");

  const chatHistory = await db
    .collection(COLLECTION)
    .aggregate([
      {
        $match: {
          "participants.1": id,
          status: "saved",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { lawyerId: { $arrayElemAt: ["$participants", 0] } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$lawyerId" }] },
              },
            },
            {
              $project: {
                name: 1,
                "profile.picture": 1,
                "credentials.certification": 1,
              },
            },
          ],
          as: "lawyerInfo",
        },
      },
      {
        $unwind: {
          path: "$lawyerInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          bookDate: 1,
          status: 1,
          participants: 1,
          messages: 1,
          createdAt: 1,
          lawyerName: "$lawyerInfo.name",
          lawyerProfile: {
            name: "$lawyerInfo.name",
            avatar: "$lawyerInfo.profile.picture",
            certification: "$lawyerInfo.credentials.certification",
          },
        },
      },
    ])
    .toArray();
  // console.log(chatHistory, "ini data pemberian nya yg baru");

  return chatHistory;
};
