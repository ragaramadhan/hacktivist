import { getRoomChatByParticipants } from "@/models/chatroom";

export const POST = async (request: Request) => {
  const { contactId } = await request.json();
  const clientId = request.headers.get("rg-user-id");

  if (!clientId || !contactId) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }

  const chatRoom = await getRoomChatByParticipants(clientId, contactId);

  return new Response(JSON.stringify({ roomId: chatRoom?._id, clientId }), { status: 200 });
};
