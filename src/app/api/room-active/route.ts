import { riwayatRoom } from "@/models/chatroom";

export async function POST(request: Request) {
  const { userId } = await request.json();
  //   console.log(userId, "ini di model roomactive");

  const chatHistory = await riwayatRoom(userId);
  //   console.log(chatHistory);

  return Response.json({
    status: 200,
    data: chatHistory,
  });
}
