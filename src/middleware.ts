import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyJoseToken } from "./utils/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    request.url.includes("/api/roomchats") ||
    request.url.includes("/api/myrooms") ||
    request.url.includes("/api/participant-details") ||
    request.url.includes("/api/find-chatroom") ||
    request.url.includes("/api/subs") ||
    request.url.includes("/api/userlogin") ||
    request.url.includes("/api/payment") ||
    request.url.includes("/api/schedule") ||
    request.url.includes("/api/clientid")
    // userlogin api untuk login
  ) {
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("rg-user-id", tokenData.id);
    requestHeaders.set("rg-user-email", tokenData.email);
    requestHeaders.set("rg-user-username", tokenData.username);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  if (request.url.includes("/api/ai")) {
    const token = cookies().get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Please login first. 🤖",
      });
    }

    const tokenData = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("rg-user-id", tokenData.id);
    requestHeaders.set("rg-user-email", tokenData.email);
    requestHeaders.set("rg-user-username", tokenData.username);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
