"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogoutAction = async () => {
  if (cookies().get("token")) cookies().delete("token");
  return redirect("/login");
};
