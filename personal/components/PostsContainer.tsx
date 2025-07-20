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
    // Handle the fetched posts as needed
    setPosts(refinedPosts.posts);
    console.log(posts);
  }

  useEffect(() => {
    fetchPosts().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 p-5">
      {loading && (
        <div className="p-8 flex items-center justify-center w-full">
          <BounceLoader color="#ffeca0" size={70} />
        </div>
      )}

      {!loading &&
        posts.map((post, idx) => (
          <PostBox
            key={idx}
            title={post.title}
            content={post.content}
            likes={post.likes}
            postId={post.id}
          />
        ))}
    </div>
  );
}

export default PostsContainer;
