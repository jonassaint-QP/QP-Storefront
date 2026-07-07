import Link from 'next/link';

export default function LegalLayout({
  tag,
  title,
  lastUpdated,
  children,
}: {
  tag: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-400 hover:text-white transition-colors"
        >
          ← Queer Pathways
        </Link>
        <span className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-700">
          Legal
        </span>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-20">
        {/* Document header */}
        <div className="flex flex-col gap-4 mb-12">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ {tag} ]
          </p>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
            {title}
          </h1>
          <p className="text-xs font-mono text-zinc-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        <hr className="border-zinc-800 mb-12" />

        {/* Body */}
        <div className="legal-body flex flex-col gap-10">{children}</div>
      </main>

      <footer className="border-t border-zinc-800 px-6 py-8 text-center">
        <p className="text-xs font-mono text-zinc-700">
          © {new Date().getFullYear()} Queer Pathways. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-400 border-l-2 border-zinc-700 pl-3">
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-7 text-zinc-400 font-mono">
        {children}
      </div>
    </section>
  );
}
