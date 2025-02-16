import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="min-h-[80vh] flex flex-col justify-center">
          <div className="py-16">
            {/* Hero Section */}
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Next.js ISR Demo
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mb-8">
                Experience the power of Incremental Static Regeneration in Next.js App Router.
                This demo showcases dynamic content updates with optimal performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium text-white 
                           bg-blue-600 rounded-lg hover:bg-blue-700 
                           transition-colors duration-200 shadow-sm
                           hover:shadow-md active:transform active:scale-95"
                >
                  View All Posts
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/posts"
                  className="inline-flex items-center px-6 py-3 text-lg font-medium 
                           text-blue-600 bg-blue-50 rounded-lg
                           hover:bg-blue-100 transition-colors duration-200
                           border-2 border-blue-100 hover:border-blue-200
                           shadow-sm hover:shadow-md active:transform active:scale-95"
                >
                  Create Post
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 
                            hover:shadow-md transition-all duration-200 hover:-translate-y-1">
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

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 
                            hover:shadow-md transition-all duration-200 hover:-translate-y-1">
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

              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 
                            hover:shadow-md transition-all duration-200 hover:-translate-y-1">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Secure & Reliable
                </h2>
                <p className="text-gray-600">
                  Built with modern security practices and reliable infrastructure for consistent uptime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
