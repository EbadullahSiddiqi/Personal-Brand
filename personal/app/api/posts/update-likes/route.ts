import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { postId } = await request.json();
  if (!postId) {
    return NextResponse.json({
      error: "Post ID is required",
    });
  }

  try {
    // Get the current like count
    const post = await db
      .select({ likes: posts.likes })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    const currentLikes = post[0]?.likes ?? 0;

    // Update the like count by incrementing it by 1
    await db
      .update(posts)
      .set({ likes: currentLikes + 1 })
      .where(eq(posts.id, postId));
    return NextResponse.json({
      message: "Likes updated successfully",
      likes: currentLikes + 1,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update likes",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
