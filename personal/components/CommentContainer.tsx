"use client";

import React, { useEffect, useState } from "react";
import Comment from "./Comment";

function CommentContainer({ postId }: { postId?: number }) {
  type CommentType = { content: string }; // Add other fields if needed
  const [postComments, setPostComments] = useState<CommentType[]>([]);

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

      const { comments } = await response.json(); // destructuring comments from the response
      setPostComments(comments);

      //   console.log(comments[0].content);
    } catch (error) {
      throw new Error("Frontend: Failed to fetch comments");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!postId) return;
      fetchComments();
    }, 5000);
  }, []);

  return (
    <div>
      {postComments.map((comment, idx) => {
        return (
          <div key={idx}>
            <Comment text={comment.content} />
          </div>
        );
      })}
    </div>
  );
}

export default CommentContainer;
