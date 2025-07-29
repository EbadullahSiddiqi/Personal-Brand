"use client";

import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import CommentContainer from "./CommentContainer";
import { BounceLoader } from "react-spinners";

interface PostBoxProps {
  title?: string;
  content?: string;
  likes?: number;
  postId?: number;
}

function PostBox({ title, content, likes, postId }: PostBoxProps) {
  const [likesCount, setLikesCount] = useState(likes || 0);
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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
          throw new Error("Failed to add like");
        }
      } catch (error) {
        console.error("Failed to update likes:", error);
        setLikesCount((prevLikes) => prevLikes - 1);
      }
    }
  }

  async function addComment(postId: number, comment: string, name: string) {
    setLoading(true);
    try {
      const response = await fetch("/api/posts/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, comment, name }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      setLoading(false);
      setCommentSectionOpen(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] via-[#333] to-[#2a2a2a] px-4 py-8 rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-7 w-full max-w-4xl border-2 border-[#3a3a3a] rounded-lg p-5 sm:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold self-start text-white">
          {title}
        </h1>

        <p className="text-base sm:text-lg self-start">{content}</p>

        <div className="flex gap-5 self-start">
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
          <div className="self-start w-full space-y-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                className="border-2 border-[#ffeca0] rounded-xl px-3 py-2 w-full sm:w-1/3"
              />
            </div>
            <textarea
              value={comment}
              placeholder="Add a comment..."
              onChange={(e) => setComment(e.target.value)}
              className="border-2 border-[#ffeca0] w-full rounded-xl px-3 py-2"
            />
            <button
              onClick={() => {
                if (postId) {
                  addComment(postId, comment, name);
                }
              }}
              className="border-1 bg-[#ffeca0] cursor-pointer text-[#1c1b1b] px-4 py-2 rounded-lg hover:bg-[#1c1b1b] hover:text-[#ffeca0] hover:rounded-2xl hover:border-[#ffeca0] transition-all duration-150"
            >
              {loading ? <BounceLoader size={30} /> : "Add Comment"}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 self-start w-full">
          <CommentContainer postId={postId} />
        </div>
      </div>
    </div>
  );
}

export default PostBox;
