import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="min-h-[80vh] flex flex-col justify-center">
          <div className="py-16">
            {/* Hero Section */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Next.js ISR Demo
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
                Experience the power of Incremental Static Regeneration in Next.js App Router. 
                This demo showcases dynamic content updates with optimal performance.
              </p>
              <div className="space-x-4">
                <Link
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white 
                           bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Posts
                </Link>
                <Link
                  href="/posts/1"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-blue-600 
                           border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  Sample Post
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-16">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Lightning Fast
                </h2>
                <p className="text-gray-600">
                  Static generation with dynamic updates ensures optimal performance and SEO.
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Always Fresh
                </h2>
                <p className="text-gray-600">
                  Content automatically updates at intervals, keeping data fresh without sacrificing performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
