import { NextResponse } from "next/server";
import { db } from "../../../db/db";
import { posts } from "../../../db/schema";

export async function GET() {
  const allPosts = await db.select().from(posts);
  return NextResponse.json({
    posts: allPosts
  });
}

export async function POST(req: Request) {
  const { title, content } = await req.json();

  try {
    const newPost = await db.insert(posts).values({ title, content });
    return NextResponse.json(
      { post: newPost, msg: "Post Created" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { msg: `Error creating post: ${error}` },
      {
        status: 500,
      }
    );
  }
}
