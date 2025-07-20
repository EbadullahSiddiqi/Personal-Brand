"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
    setContent("");
    setLoading(false);
    router.refresh(); // refresh data on server
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-semibold">Create New Post</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border p-2 rounded min-h-[120px]"
        placeholder="Write something amazing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-[#ffeca0] text-[#1c1b1b] font-medium cursor-pointer px-4 py-2 rounded hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
