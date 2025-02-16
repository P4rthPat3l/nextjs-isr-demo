import { deletePost } from "@/lib/api";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const p = await params;

    await deletePost(p.id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error
  ) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
