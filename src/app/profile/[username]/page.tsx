import type { Metadata } from "next";
import { ProfileView } from "@/components/profile/ProfileView";
import { getProfile } from "@/server/users";

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  try {
    const p = await getProfile((await params).username, null);
    const who = p.name ?? p.username;
    return { title: who, description: p.bio ?? `${who} on be2gether`, openGraph: { title: `${who} on be2gether`, description: p.bio ?? undefined } };
  } catch {
    return {};
  }
}

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  return <ProfileView params={params} />;
}
