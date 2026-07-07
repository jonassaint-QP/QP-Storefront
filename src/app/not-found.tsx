import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Queer Pathways',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 gap-10 text-center">
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-700">
          [ 404 ]
        </p>
        <h1 className="text-8xl font-black tracking-tight uppercase leading-none text-zinc-800">
          Not<br />Found
        </h1>
      </div>
      <p className="text-sm font-mono text-zinc-600 leading-7 max-w-xs">
        The route you followed does not exist or has moved. This is not an error
        — it is a redirect to somewhere more useful.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop"
          className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:bg-zinc-100"
        >
          Enter the Shop
        </Link>
        <Link
          href="/"
          className="h-12 px-8 border border-zinc-800 text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
