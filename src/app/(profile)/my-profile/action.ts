"use server";

import { cookies } from "next/headers";
import { verifyJoseToken } from "@/utils/jwt";
import { getUserByEmail } from "@/models/user";
import { SafeUserType } from "../../../types/userType";
import { NextResponse } from "next/server";

// todo: harusnya dari sini untuk ngambil cookies dan cari data usernya
export const fetchUserLogin = async (): Promise<SafeUserType | undefined | null> => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return null;
    }

    const tokenData = await verifyJoseToken<{ id: string; email: string; username: string }>(token.value);

    const email = tokenData.email;
    const user = await getUserByEmail(email);

    // console.log("user: ", user);
    if (!user) {
      NextResponse.redirect("/login");
      return null;
    }

    if (user) {
      const safeUser: SafeUserType = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        profile: {
          picture: user.profile.picture ?? null,
          address: user.profile.address,
          birth: user.profile.birth,
        },
        credentials: user.credentials ?? null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return safeUser as SafeUserType;
    }
  } catch (error) {
    console.log(error);
  }
};
