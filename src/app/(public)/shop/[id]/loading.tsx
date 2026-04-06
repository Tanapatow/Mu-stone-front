export default function ProductDetailLoading() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url('/shop_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed" />
      <main className="min-h-screen px-6 pt-24 pb-10 max-w-5xl mx-auto">
        {/* Back button skeleton */}
        <div className="h-4 w-28 rounded bg-white/10 animate-pulse mb-8" />

        <div className="card-glass flex flex-col md:flex-row gap-8">
          {/* Image skeleton */}
          <div className="w-full md:w-96 shrink-0">
            <div className="aspect-square w-full rounded-xl bg-white/5 animate-pulse" />
            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-3">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg bg-white/5 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Badge */}
            <div className="h-5 w-24 rounded-full bg-gold/10 animate-pulse" />
            {/* Title */}
            <div className="h-8 w-3/4 rounded-lg bg-white/10 animate-pulse" />
            {/* Price */}
            <div className="h-10 w-32 rounded-lg bg-gold/20 animate-pulse" />
            {/* Divider */}
            <div className="h-px w-full bg-white/5" />
            {/* Description lines */}
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="h-4 rounded bg-white/5 animate-pulse"
                  style={{
                    width: i === 3 ? "60%" : "100%",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            {/* Stock */}
            <div className="h-4 w-28 rounded bg-white/5 animate-pulse" />
            {/* Button */}
            <div className="h-11 w-full rounded-xl bg-gold/10 animate-pulse mt-auto" />
          </div>
        </div>
      </main>
    </>
  );
}
