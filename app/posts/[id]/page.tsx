import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

export const revalidate = 120;

async function getPost(id: string) {
  console.log(`Fetching post ${id} at ${new Date().toISOString()}`);
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 30, // revalidate every 30 seconds
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json() as Promise<Post>;
}

async function getComments(id: string) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    {
      next: {
        // rvalidate: 30,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json() as Promise<Comment[]>;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }].map(
    (post) => ({
      id: String(post.id),
    })
  );
}

export default async function Post({ params }: PageProps) {
  const p = await params;
  const [post, comments] = await Promise.all([
    getPost(p.id),
    getComments(p.id),
  ]);


  console.log("revalidate post detail");
  

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
              Updates every 30 seconds
            </div>
          </div>
        </article>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Comments ({comments.length})
          </h2>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {comment.name[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      {comment.name}
                    </h3>
                    <p className="text-gray-700 mb-2 leading-relaxed">
                      {comment.body}
                    </p>
                    <p className="text-sm text-gray-500">{comment.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
