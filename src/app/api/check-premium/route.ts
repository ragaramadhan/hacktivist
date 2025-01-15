import { checkSubs } from "@/models/subscription";

export async function POST(request: Request) {
  const { clientId } = await request.json();
  const data = await checkSubs(clientId);

  if (data) {
    return Response.json({
      data: true,
    });
  } else {
    return Response.json({
      data: false,
    });
  }
}
