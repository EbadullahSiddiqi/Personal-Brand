"use client";

import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import BounceLoader from "react-spinners/BounceLoader";

function CommentContainer({ postId }: { postId?: number }) {
  type CommentType = { content: string; name: string };
  const [postComments, setPostComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchComments() {
    if (!postId) return;
    try {
      const response = await fetch("/api/posts/find-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const { comments } = await response.json();
      setPostComments(comments);
      console.log(comments[0]);
    } catch (error) {
      throw new Error("Frontend: Failed to fetch comments");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!postId) return;
      fetchComments().then(() => {
        setLoading(false);
      });
    }, 5000);
  }, [postId]); // ✅ Corrected dependency array to avoid infinite re-renders

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      {loading ? (
        <div className="p-8 flex items-center justify-center w-full">
          <BounceLoader color="#ffeca0" size={70} />
        </div>
      ) : (
        postComments.map((comment, idx) => (
          <div key={idx}>
            <Comment text={comment.content} name={comment.name} />
          </div>
        ))
      )}
    </div>
  );
}

export default CommentContainer;
