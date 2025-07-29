import CreateForm from "@/components/CreateForm";
import { db } from "../../../../../db/db";
import { posts } from "@/db/schema";

export default async function AdminPage() {
  const allPosts = await db.select().from(posts).orderBy(posts.createdAt);

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
