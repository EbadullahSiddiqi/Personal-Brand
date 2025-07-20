import CreateForm from "@/components/CreateForm";
import { db } from "../../../../../db/db";
import { posts } from "@/db/schema";

export default async function AdminPage() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel 🛠</h1>

      <CreateForm />

      <h2 className="text-xl font-semibold mt-10 mb-4">Recent Posts</h2>
      <ul className="space-y-4">
        {allPosts.map((post) => (
          <li
            key={post.id}
            className="border p-4 rounded-md shadow-sm"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt!).toLocaleString()}
            </p>
            <p className="mt-2 line-clamp-3">
              {post.content}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
