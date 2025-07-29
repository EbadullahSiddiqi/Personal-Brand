"use client";

import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";
import { BounceLoader } from "react-spinners";

function PostsContainer() {
  const [posts, setPosts] = useState<
    {
      title: string;
      content: string;
      likes: number;
      id: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const rawPosts = await fetch("/api/posts");
    const refinedPosts = await rawPosts.json();
    setPosts(refinedPosts.posts);
    console.log(posts);
  }

  useEffect(() => {
    fetchPosts().then(() => {
      setLoading(false);
    });
  });

  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-8 py-10 max-w-5xl mx-auto w-full">
      {loading ? (
        <div className="p-8 flex items-center justify-center w-full">
          <BounceLoader color="#ffeca0" size={70} />
        </div>
      ) : (
        posts.map((post, idx) => (
          <PostBox
            key={idx}
            title={post.title}
            content={post.content}
            likes={post.likes}
            postId={post.id}
          />
        ))
      )}
    </div>
  );
}

export default PostsContainer;
