export async function GET(request: Request) {
  const clientId = request.headers.get("rg-user-id");

  return Response.json({
    clientId,
  });
}
