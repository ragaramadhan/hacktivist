import { getUserById } from "@/models/user";

export const POST = async (request: Request) => {
  const clientId = request.headers.get("rg-user-id");
  if (!clientId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { participantIds } = await request.json();

  if (!participantIds || !Array.isArray(participantIds)) {
    return new Response(JSON.stringify({ error: "Invalid body, expected array of IDs" }), { status: 400 });
  }

  const otherParticipantId = participantIds.find((id) => id !== clientId);
  if (!otherParticipantId) {
    return new Response(JSON.stringify({ error: "No valid participant found" }), { status: 404 });
  }

  const user = await getUserById(otherParticipantId);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
};
