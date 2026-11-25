import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { serializeUser } from "@/lib/serializers";
import { ProfileView } from "@/components/profile/ProfileView";

export const dynamic = "force-dynamic";
export const metadata = { title: "Личный кабинет" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth?next=/profile");
  return <ProfileView initialUser={serializeUser(user)} />;
}
