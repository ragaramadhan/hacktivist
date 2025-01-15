import { findLawyerById } from "@/models/user";

export const GET = async (_request: Request, { params }: { params: { lawyerId: string } }) => {
  const id = params.lawyerId;
  //   console.log(params);

  const data = await findLawyerById(id);

  return Response.json({
    statusCode: 200,
    data,
  });
};
