"use server";

interface RegisterDataInput {
  name: string;
  email: string;
  password: string;
  role: "client" | "lawyer";
  address: string;
  birthDate: string;
  specialization: string;
  education: string;
  certification: string | null;
}

export const registerUser = async (data: RegisterDataInput) => {
  // ! merubah data sesuai dengan yang dibutuhkan backend
  const userInput = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    profile: {
      address: data.address,
      birth: data.birthDate,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  // console.log("response:", response);

  // ! mengembalikan response ke client
  return response.json();
};

export const registerLawyer = async (data: RegisterDataInput) => {
  // console.log("data: ", data);

  // ! merubah data sesuai dengan yang dibutuhkan backend
  const userInput = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    profile: {
      address: data.address,
      birth: data.birthDate,
    },
    specialization: data.specialization,
    credentials: {
      education: [data.education],
      certification: data.certification,
    },
  };

  // console.log("userInput: ", userInput);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lawyers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInput),
  });

  return response.json();
};

// ! logic login action from raga
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/models/user";
import { comparePass } from "@/utils/bcrypt";
import { createJoseToken } from "@/utils/jwt";

export const handleLogin = async (formData: FormData) => {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users`, {
  //     body: JSON.stringify({
  //       email: formData.get("email"),
  //       password: formData.get("password"),
  //     }),
  //   });

  const loginInput = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInput.safeParse({
    email,
    password,
  });
  //   console.log(parsedData);

  if (!parsedData.success) {
    // tak boleh di throw karena bisa jadi nanti sangkut di catch
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMess = `${errPath} - ${errMessage}`;

    return redirect(`/login?error=${errFinalMess}`);
  }

  const user = await getUserByEmail(parsedData.data.email);

  if (!user || !(await comparePass(parsedData.data.password, user.password))) {
    // return redirect(`/login?error=Invalid%20Credentials`);
    return false;
  }

  //   console.log(`masuk yaw`);
  const payload = {
    id: user._id,
    email: user.email,
    username: user.name,
  };

  const token = await createJoseToken(payload);
  // console.log(token);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    sameSite: "strict",
  });

  // return redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  return true;
};
