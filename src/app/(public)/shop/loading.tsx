export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-[url('/shop_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <main className="px-6 py-10 pt-24 max-w-6xl mx-auto flex flex-col">
        {/* Header skeleton */}
        <div className="dashboard-header mb-8">
          <div className="h-8 w-32 rounded-lg bg-white/10 animate-pulse mb-2" />
          <div className="h-4 w-20 rounded-lg bg-white/5 animate-pulse" />
        </div>

        <div className="flex gap-6">
          {/* Filter sidebar skeleton */}
          <aside className="w-56 shrink-0 card-glass flex flex-col gap-5">
            <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 rounded bg-white/5 animate-pulse" />
              <div className="h-9 w-full rounded-lg bg-white/5 animate-pulse" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="h-7 w-full rounded-lg bg-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
              <div className="h-9 w-full rounded-lg bg-white/5 animate-pulse" />
            </div>
          </aside>

          {/* Product grid skeleton */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                className="card-glass p-0 overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="h-52 w-full bg-white/5" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-4 w-3/4 rounded bg-white/10" />
                  <div className="flex justify-between">
                    <div className="h-5 w-20 rounded bg-gold/20" />
                    <div className="h-4 w-16 rounded bg-white/5" />
                  </div>
                  <div className="h-9 w-full rounded-xl bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
