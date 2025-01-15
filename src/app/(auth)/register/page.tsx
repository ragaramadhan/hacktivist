import AuthForm from "@/components/auth/form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Register() {
  const token = cookies().get("token");

  if (token) {
    redirect("/");
    // console.log("Buat toastify, sudah login");
  }

  return (
    <div>
      <AuthForm type="register" />
    </div>
  );
}
