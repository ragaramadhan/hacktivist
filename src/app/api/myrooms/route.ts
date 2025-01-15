import { CheckRoomLogin } from "@/models/chatroom";

export const GET = async (request: Request) => {
  const clientId = request.headers.get("rg-user-id");

  if (!clientId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await CheckRoomLogin(clientId);

  return Response.json({
    data,
  });
};
