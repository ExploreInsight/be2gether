// 'use client';

// import { Loader2Icon } from "lucide-react";
// import { Button } from "./ui/button";
// import { useState } from "react";
// import { toggleFollow } from "@/actions/user.action";
// import toast from "react-hot-toast";


// function FollowButton({ userId }: { userId: string }) {
//     const [isLoading, setIsLoading] = useState(false);

//     const handleFollow = async () => {
//         setIsLoading(true);

//         try {
//             await toggleFollow(userId);
//             toast.success("Followed successfully");
//         } catch (error) {
//             toast.error("Error following user");
//         } finally {
//             setIsLoading(false);
//         }
//     }
//     return (
//         <Button size={'sm'} variant={'secondary'}
//             onClick={handleFollow} disabled={isLoading} className="w-20">
//             {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
//         </Button>
//     )
// }

// export default FollowButton
'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";

function FollowButton({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await toggleFollow(userId);
      toast.success("User followed successfully");
      onSuccess?.(); // <-- callback to parent
    } catch (error) {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
}

export default FollowButton;
