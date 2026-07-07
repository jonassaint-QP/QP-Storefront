'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 gap-8 text-center">
        <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-700">
          [ Critical Error ]
        </p>
        <h2 className="text-5xl font-black tracking-tight uppercase leading-none">
          Fatal Failure.
        </h2>
        <p className="text-sm font-mono text-zinc-600 leading-7 max-w-xs">
          A critical error has occurred. Please try reloading the page.
        </p>
        <button
          onClick={reset}
          className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100"
        >
          Reload
        </button>
      </body>
    </html>
  );
}
