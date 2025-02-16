import Link from "next/link";
import { type Post } from "../../../types/post";
import { notFound } from "next/navigation";



export const revalidate = 60;

async function getPost(id: string) {
  const API_KEY = process.env.JSONBIN_API_KEY;
  const BIN_ID = process.env.JSONBIN_BIN_ID;

  if (!API_KEY || !BIN_ID) {
    throw new Error("Missing API configuration");
  }

  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    // next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  const post = data.record.posts.find((p: Post) => p.id === id);

  if (!post) {
    throw notFound()
  }

  return post;
}

interface PageProps {
  params: Promise<{ id: string }>;

}

export default async function Post({ params }: PageProps) {
  const p = await params;

  const post = await getPost(p.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <Link
            href="/posts"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Posts
          </Link>
        </nav>

        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {post.body}
            </p>
            <div className="text-sm text-gray-500 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Created at: {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
