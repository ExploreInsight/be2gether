import { ProfileView } from "@/components/profile/ProfileView";

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  return <ProfileView params={params} />;
}
