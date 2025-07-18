"use client";

import React, { useEffect, useState } from "react";
import PostBox from "./PostBox";

function PostsContainer() {
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([]);

  async function fetchPosts() {
    const rawPosts = await fetch("/api/posts");
    const refinedPosts = await rawPosts.json();
    // Handle the fetched posts as needed
    setPosts(refinedPosts.posts);
    console.log(posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, idx) => (
        <PostBox key={idx} title={post.title} content={post.content} />
      ))}
    </div>
  );
}

export default PostsContainer;
