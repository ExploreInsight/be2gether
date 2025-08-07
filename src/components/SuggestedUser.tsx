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
    <Card>
      <CardHeader>
        <CardTitle>Suggested Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link href={`/profile/${user.username}`} className="font-medium">
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">{user._count.followers} followers</p>
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
