import { createPost } from "@/lib/api";
import { CreatePostInput } from "@/types/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
