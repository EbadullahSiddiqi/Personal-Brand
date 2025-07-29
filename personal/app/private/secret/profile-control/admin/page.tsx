"use client";

import { useEffect, useState } from "react";
import CreateForm from "@/components/CreateForm";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [error, setError] = useState("");

  const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE;

  // Check localStorage for existing access

  async function fetchPosts() {
    const rawPosts = await fetch("/api/posts");
    const refinedPosts = await rawPosts.json();
    setAllPosts(refinedPosts.posts);
    console.log(allPosts);
  }

  useEffect(() => {
    const savedCode = localStorage.getItem("admin-code");
    if (savedCode && savedCode === ADMIN_CODE) {
      setAuthenticated(true);
      fetchPosts();
    }
  }, []);

  const handleSubmit = () => {
    if (enteredCode === ADMIN_CODE) {
      localStorage.setItem("admin-code", enteredCode);
      setAuthenticated(true);
      fetchPosts();
    } else {
      setError("Incorrect code. Try again.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-[#1c1b1b] p-8 rounded-xl border border-[#ffeca0]/20 shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-[#ffeca0]">
            Enter Admin Code
          </h2>
          <input
            type="password"
            className="w-full p-3 rounded-md bg-[#2a2a2a] border border-[#ffeca0]/10 text-white mb-4"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="Admin Code"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2a2a2a]/80 backdrop-blur-sm text-[#ffeca0] px-6 py-3 rounded-xl font-semibold hover:bg-[#333]/80 transition-all duration-200 border border-[#ffeca0]/30"
          >
            Unlock Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Admin Panel 🛠
      </h1>

      <section className="mb-10">
        <CreateForm />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>

        {allPosts.length > 0 ? (
          <ul className="space-y-5">
            {allPosts.map((post) => (
              <li
                key={post.id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt!).toLocaleString()}
                </p>
                <p className="mt-3 text-sm line-clamp-3">{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No posts yet.</p>
        )}
      </section>
    </main>
  );
}
