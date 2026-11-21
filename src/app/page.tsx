import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import SuggestedUser from "@/components/SuggestedUser";
import { EmptyFeed, GuestPrompt } from "@/components/feed/FeedPrompts";

import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : posts.length > 0 ? <GuestPrompt /> : null}

        <div className="space-y-5">
          {posts.length === 0 ? (
            <EmptyFeed signedIn={!!user} />
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))
          )}
        </div>
       </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-[4.5rem]">
       {/* {user ? <SuggestedUser /> : null} */}
       <SuggestedUser />
      </div>
    </div>
  );
}