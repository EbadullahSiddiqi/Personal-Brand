"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import CommentContainer from "./CommentContainer";

interface PostBoxProps {
  title?: string; // the issue is, I'm using server actions the wrong way. The error is because Drizzle ORM isn't allowed to be used in client components.
  content?: string;
  likes?: number;
  postId?: number;
}

function PostBox({ title, content, likes, postId }: PostBoxProps) {
  const [likesCount, setLikesCount] = useState(likes || 0);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const [comment, setComment] = useState("");

  function increaseLike() {
    setLikesCount((prevLikes) => prevLikes + 1);
    localStorage.setItem("likedState", true.toString());
  }

  async function updateLikes() {
    if (postId) {
      increaseLike();
      try {
        const response = await fetch("/api/posts/update-likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
        });
        if (!response.ok) {
          throw new Error("Failed to add comment");
        }
      } catch (error) {
        console.error("Failed to update likes:", error);
        setLikesCount((prevLikes) => prevLikes - 1);
      }
    }
  }

  async function addComment(postId: number, comment: string) {
    try {
      const response = await fetch("/api/posts/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, comment }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      // Handle successful comment addition
    } catch (error) {
      console.error("Error adding comment:", error);
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
              className={`hover:text-amber-600 transition-all duration-100 cursor-pointer ${
                localStorage.getItem("likedState") === "true"
                  ? "text-amber-600"
                  : ""
              }`}
            />
            {likesCount}
          </div>
          <MessageCircle
            onClick={() => setCommentSectionOpen((prev) => !prev)}
            className="hover:text-amber-600 transition-all duration-100 cursor-pointer"
          />
        </div>
        {commentSectionOpen && (
          <div className="self-start p-5 w-full">
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="border-2 border-[#ffeca0] text-white w-full rounded-xl px-2 py-2"
            />
            <button
              onClick={() => {
                if (postId) {
                  addComment(postId, comment);
                }
              }}
              className="border-1 bg-[#ffeca0] cursor-pointer text-[#1c1b1b] px-4 py-2 rounded-lg mt-2 hover:bg-[#1c1b1b] hover:text-[#ffeca0] hover:rounded-2xl hover:border-[#ffeca0] transition-all duration-150"
            >
              Submit Comment
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 self-start">
          {/* Placeholder for comments, can be replaced with actual comment rendering logic */}
          <CommentContainer postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default PostBox;
