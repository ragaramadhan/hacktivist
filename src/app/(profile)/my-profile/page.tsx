export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { fetchUserLogin } from "./action";
import ProfileComponent from "../../../components/profile/ProfileComponent";

const MyProfile = async () => {
  const user = await fetchUserLogin();
  if (!user) return redirect("/login");
  // console.log("user yang ada di My Profile nih Bang: ", user);

  return (
    <div>
      <ProfileComponent user={user} />
    </div>
  );
};

export default MyProfile;
