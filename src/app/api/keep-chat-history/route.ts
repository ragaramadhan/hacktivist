import { keepChatHistory } from "@/models/chatroom";

export const POST = async (request: Request) => {
  const { messages, mongoDbRoomId } = await request.json();
  if (!mongoDbRoomId) return;

  await keepChatHistory({ messages, mongoDbRoomId });

  return Response.json({
    message: "Success keep chat history",
  });
};
