import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { postId } = await request.json();
  try {
    const postComments = await db
      .select({ content: comments.content, name: comments.name })
      .from(comments)
      .where(eq(comments.postId, postId));
    return NextResponse.json(
      {
        comments: postComments,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch comments" + error,
      },
      { status: 500 }
    );
  }
}
