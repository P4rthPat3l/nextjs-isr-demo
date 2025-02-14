import { createPost } from "@/app/lib/api";
import { CreatePostInput } from "@/app/types/post";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const input: CreatePostInput = await request.json();
    const post = await createPost(input);
    return NextResponse.json(post, { status: 201 });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
