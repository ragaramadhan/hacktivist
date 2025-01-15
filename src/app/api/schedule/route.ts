import { roomSchedule } from "@/models/chatroom";

export const GET = async (request: Request) => {
  const clientId = request.headers.get("rg-user-id");
  if (!clientId) {
    throw "Login First";
  }
  const data = await roomSchedule(clientId);

  return Response.json({
    statusCode: 200,
    data,
  });
};
