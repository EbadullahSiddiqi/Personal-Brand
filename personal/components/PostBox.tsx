"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface PostBoxProps {
  title?: string; // the issue is, I'm using server actions the wrong way. The error is because Drizzle ORM isn't allowed to be used in client components.
  content?: string;
  likes?: number;
  postId?: number;
}

function PostBox({ title, content, likes, postId }: PostBoxProps) {
  const [likesCount, setLikesCount] = useState(likes || 0);

  async function updateLikes() {
    if (postId) {
      setLikesCount((prevLikes) => prevLikes + 1);
      try {
        const response = await fetch("/api/posts/update-likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
        });
      } catch (error) {
        console.error("Failed to update likes:", error);
        setLikesCount((prevLikes) => prevLikes - 1);
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-7 p-5 border-2 w-[60rem] h-1/2 border-[#ffeca0] rounded-lg">
        <h1 className="text-4xl font-bold text-white self-start">{title}</h1>

        <p className="text-lg self-start">{content}</p>
        <div className="flex gap-3 self-start">
          <div className="flex items-center gap-1">
            <ThumbsUp
              onClick={updateLikes}
              className="hover:text-amber-600 transition-all duration-100 cursor-pointer"
            />
            {likesCount}
          </div>
          <MessageCircle className="hover:text-amber-600 transition-all duration-100 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default PostBox;
