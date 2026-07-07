function Skeleton({ className }: { className: string }) {
  return <div className={`bg-zinc-900 animate-pulse ${className}`} />;
}

function CardSkeleton() {
  return (
    <div className="border border-zinc-800 bg-black flex flex-col">
      <div className="border-b border-zinc-800 p-6 flex flex-col gap-3">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex flex-col gap-2 mt-2">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-3 w-full" />)}
        </div>
      </div>
      <div className="border-t border-zinc-800 p-6 flex items-center justify-between">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}

export default function CategoryLoading() {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 max-w-xl">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}
