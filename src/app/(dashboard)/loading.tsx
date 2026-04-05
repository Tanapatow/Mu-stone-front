export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[url('/user-background.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header skeleton */}
        <div className="dashboard-header">
          <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse mb-2" />
          <div className="h-4 w-64 rounded-lg bg-white/5 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="card-glass flex flex-col gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
              <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
            </div>
          ))}
          <div className="h-10 w-full rounded-xl bg-gold/10 animate-pulse mt-2" />
        </div>
      </div>
    </div>
  );
}
