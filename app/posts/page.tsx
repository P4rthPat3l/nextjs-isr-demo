import Link from "next/link";
import { getPosts } from "@/lib/api";
import CreatePostForm from "@/components/CreatePostForm";
import DeletePostButton from "@/components/DeletePostButton";
import { Post } from "@/types/post";

export const revalidate = 60;

export default async function Posts() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await getPosts();
    // Sort posts by creation date, newest first
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e) {
    error = e instanceof Error ? e.message : "An unexpected error occurred";
    console.error("Error loading posts:", e);
  }

  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Info Card */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page generated at: <span className="font-mono">{timestamp}</span>
            </p>
            <p className="text-sm text-gray-600">
              Auto-updates every: <span className="font-mono">60 seconds</span>
            </p>
          </div>
        </div>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600">
              Create and view posts with automatic updates
            </p>
            <p className="text-sm text-gray-600">
              Total posts: <span className="font-mono">{posts.length}</span>
            </p>
          </div>
        </header>

        <CreatePostForm />
        {error ? (
          <div className="p-6 mb-8 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error Loading Posts</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <>

            {posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 
                             hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-semibold text-gray-900">
                            <Link
                              href={`/posts/${post.id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h2>
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-3">{post.body}</p>
                        <div className="flex items-center space-x-4">
                          <Link
                            href={`/posts/${post.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Read more →
                          </Link>
                        </div>
                      </div>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
