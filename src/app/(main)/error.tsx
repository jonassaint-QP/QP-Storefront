'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-32 gap-10 text-center">
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-700">
          [ Error ]
        </p>
        <h2 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
          Something<br />Failed.
        </h2>
      </div>
      <p className="text-sm font-mono text-zinc-600 leading-7 max-w-xs">
        An unexpected error occurred. This has been logged. You can try again or
        return to the shop.
      </p>
      {error.digest && (
        <p className="text-xs font-mono text-zinc-800">
          ref: {error.digest}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100"
        >
          Try Again
        </button>
        <a
          href="/shop"
          className="h-12 px-8 border border-zinc-800 text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          Back to Shop
        </a>
      </div>
    </div>
  );
}
