'use client';

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import toast from "react-hot-toast";
import { createPost } from "@/actions/post.action";

function CreatePost() {
  const {user} = useUser();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        // reset form
        setContent('');
        setImageUrl('');
        setIsPosting(false);

        toast.success("Post created successfully!");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsPosting(false);
    }
  };


return (
  <Card className="mb-4">
    <CardContent>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.imageUrl || "/avatar.png"} />
          </Avatar>
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[50px] resize-none border-none focus-visible:ring-0 p-2 text-base"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            disabled={isPosting}
          />
        </div>
        {(showImageUpload || imageUrl) && (
          <div className="border rounded-lg">
            {/* <ImageUpload */} ImageUplaod
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-2">
          <div className="flex">
            <Button
              type="button"
              variant='ghost'
              size='sm'
              className="text-muted-foreground hover:text-primary" 
              onClick={()=> setShowImageUpload(!showImageUpload)}
              disabled={isPosting}
              >
              <ImageIcon className="size-4 mr-2" />
              Image
            </Button>
          </div>
          <Button className="flex items-center"  onClick={handleSubmit} disabled={!content.trim() && !imageUrl || isPosting}>
            {isPosting ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <SendIcon className="size-4 mr-1" />
                Post
              </>
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)
}

export default CreatePost;