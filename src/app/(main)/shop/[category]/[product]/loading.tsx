function Skeleton({ className }: { className: string }) {
  return <div className={`bg-zinc-900 animate-pulse ${className}`} />;
}

export default function ProductLoading() {
  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-3">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Skeleton className="aspect-square" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-8 w-40" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="border border-zinc-800 p-6 flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
            </div>
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
