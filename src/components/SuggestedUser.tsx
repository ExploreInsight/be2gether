'use client';

import { useEffect, useState } from "react";
import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import FollowButton from "./FollowButton";

// Defining the user interface
interface UserType{
    id:string;
    name: string| null;
    image: string | null;
    username: string;
    _count:{
        followers: number
    }
}

function SuggestedUser() {
  const [users, setUsers] = useState<UserType[]>([]);
 
//   Fetching random users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getRandomUsers();
      setUsers(res);
    };
    fetchUsers();
  }, []);
// Function to handle follow action 
  const handleFollow = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  if (users.length === 0) return null;

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-5 pt-5 pb-3">
        <CardTitle>Suggested Users</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Link href={`/profile/${user.username}`} className="shrink-0">
                  <Avatar className="size-9">
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="min-w-0">
                  <Link
                    href={`/profile/${user.username}`}
                    className="block truncate font-serif text-sm font-medium"
                  >
                    {user.name ?? user.username}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    {user._count.followers} {user._count.followers === 1 ? "follower" : "followers"}
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} onSuccess={() => handleFollow(user.id)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SuggestedUser;
