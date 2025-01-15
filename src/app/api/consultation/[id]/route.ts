import { readConsul } from "@/models/consultation";

export const GET = async (_request: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  const data = await readConsul(id);

  return Response.json({
    statusCode: 200,
    data,
  });
};
