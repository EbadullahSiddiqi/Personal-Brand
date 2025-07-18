"use client";

import React from "react";
import { useState } from "react";

function page() {
  return <div>page</div>;
}

type Post = {
  id: number;
  title: string;
  content: string;
};

function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      setPosts([
        ...posts,
        { id: Date.now(), title: form.title, content: form.content },
      ]);
    } else {
      setPosts(
        posts.map((post) =>
          post.id === editingId
            ? { ...post, title: form.title, content: form.content }
            : post
        )
      );
      setEditingId(null);
    }
    setForm({ title: "", content: "" });
  };

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setForm({ title: post.title, content: post.content });
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ title: "", content: "" });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8, padding: 8, minHeight: 80 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          {editingId === null ? "Create Post" : "Update Post"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", content: "" });
            }}
            style={{ marginLeft: 8, padding: "8px 16px" }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleEdit(post)} style={{ marginRight: 8 }}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
