import { db } from "@/db/db";
import { comments } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { postId, comment, name } = await request.json();

  if (!postId || !comment) {
    return new Response("Invalid input", { status: 400 });
  }

  try {
    // console.log(`Comment added to post ${postId}: ${comment}`);
    await db.insert(comments).values({
      postId: postId,
      content: comment,
      name: name || "Anonymous", // Default to "Anonymous" if no name is provided
    });

    return NextResponse.json({
      message: "Comment added successfully",
      options: {
        status: 200,
      },
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({
      error: "Failed to add comment",
      options: {
        status: 500,
      },
    });
  }
}
