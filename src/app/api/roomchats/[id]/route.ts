import { roomDetail } from "@/models/chatroom";

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  const chatRoomDetail = await roomDetail(id);

  return Response.json({
    statusCode: 200,
    chatRoomDetail,
  });
};
