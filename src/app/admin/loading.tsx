export default function AdminLoading() {
  return (
    <div className="min-h-screen flex bg-[url('/admin-bg.png')] bg-cover bg-center bg-fixed">
      {/* Sidebar skeleton */}
      <aside className="fixed h-screen w-[270px] flex flex-col px-4 py-6 bg-navy/98 border-r border-gold/10">
        <div className="h-5 w-24 rounded bg-white/10 animate-pulse mb-8" />
        <div className="h-9 w-full rounded-xl bg-gold/10 animate-pulse mb-6" />
        <div className="flex flex-col gap-2 flex-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-10 w-full rounded-xl bg-white/5 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </aside>

      {/* Content skeleton */}
      <main className="flex-1 ml-[270px] px-8 py-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          {/* Header */}
          <div className="dashboard-header">
            <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse mb-2" />
            <div className="h-4 w-64 rounded-lg bg-white/5 animate-pulse" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="card-glass flex flex-col gap-3 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-3 w-24 rounded bg-white/5" />
                <div className="h-8 w-20 rounded bg-gold/10" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="card-glass animate-pulse">
            <div className="h-64 w-full rounded-xl bg-white/5" />
          </div>
        </div>
      </main>
    </div>
  );
}
