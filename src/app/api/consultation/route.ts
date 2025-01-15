import { createConsul, readConsulAll } from "@/models/consultation";

export const POST = async (request: Request) => {
  const data = await request.json();

  const clientId = request.headers.get("rg-user-id");

  data.clientId = clientId;

  await createConsul(data);

  return Response.json(
    {
      statusCode: 201,
      message: "Success Create Consul",
    },
    {
      status: 201,
    }
  );
};

export const GET = async () => {
  const data = await readConsulAll();

  return Response.json({
    data,
  });
};
