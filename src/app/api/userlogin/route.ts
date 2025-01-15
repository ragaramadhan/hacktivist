import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const username = request.headers.get("rg-user-username");
  const email = request.headers.get("rg-user-email");

  return NextResponse.json(
    {
      statusCode: 200,
      username,
      email,
    },
    {
      status: 200,
    }
  );
};
