import Link from "next/link";
import { getPosts } from "../lib/api";
import CreatePostForm from "../components/CreatePostForm";
import DeletePostButton from "../components/DeletePostButton";
import { Post } from "../types/post";

export const revalidate = 60;

export default async function Posts() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await getPosts();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
    console.error("Error loading posts:", e);
  }

  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600">
            Page generated at: <span className="font-mono">{timestamp}</span>
          </p>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-lg text-gray-600">
            Create and view posts with automatic updates every 60 seconds
          </p>
        </header>

        {error ? (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <>
            <CreatePostForm />
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/posts/${post.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600">{post.body}</p>
                    </div>
                    <DeletePostButton postId={post.id} />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
