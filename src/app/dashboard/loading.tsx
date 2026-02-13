/**
 * Dashboard Loading State - Displayed while dashboard content is loading.
 * Uses skeleton UI pattern for better perceived performance.
 */

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header Skeleton */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-7 w-32 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-48 bg-slate-100 rounded-md animate-pulse" />
          </div>
          <div className="flex space-x-3">
            <div className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-20 bg-slate-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Card Skeleton */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
          {/* Card Header Skeleton */}
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="h-6 w-36 bg-slate-200 rounded-md animate-pulse" />
          </div>

          {/* Card Content Skeleton - Task Items */}
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-slate-100 rounded-xl p-4 flex justify-between items-start animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 bg-slate-200 rounded" />
                    <div className="h-5 w-48 bg-slate-200 rounded-md" />
                  </div>
                  <div className="h-4 w-64 bg-slate-100 rounded-md ml-8" />
                  <div className="h-3 w-32 bg-slate-100 rounded-md ml-8" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 w-16 bg-slate-200 rounded-lg" />
                  <div className="h-8 w-16 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Loading Indicator Overlay */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-600 border-t-transparent" />
          <span className="text-sm text-slate-600 font-medium">Loading tasks...</span>
        </div>
      </div>
    </div>
  );
}
