import Chat from "@/components/chat/layout";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Chats() {
  // const token = cookies().get("token");

  // if (!token) {
  //   console.log("Toastify disini");
  //   redirect("/login");
  // }

  return (
    <div>
      <Chat />
    </div>
  );
}
