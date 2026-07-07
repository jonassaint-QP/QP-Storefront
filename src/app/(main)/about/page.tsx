import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Queer Pathways',
  description:
    'Queer Pathways is a dedicated, identity-fluent digital commerce ecosystem built for the queer, gay, trans, and neurodivergent kink communities.',
  robots: { index: false, follow: false },
};

const DIRECTIVES = [
  {
    label: 'Utility Over Ornament',
    body: 'The brand completely rejects sanitized, soft luxury aesthetics. Product presentation emphasizes load-bearing value, pressure tolerance, durable construction, and gear that earns its place through repeatable function under real conditions. If it doesn\'t serve a structural purpose, it doesn\'t belong here.',
  },
  {
    label: 'Industrial Heritage',
    body: 'Every product is graded on its functional architecture — not its visual appeal. The same quality standards that apply to industrial equipment apply here. Material purity is non-negotiable. Build integrity is documented. Performance is repeatable.',
  },
  {
    label: 'The Centaur Architecture',
    body: 'Digital assets, user journeys, and product categories are engineered to support the Centaur — the integration of raw somatic instinct with strategic executive focus. The platform externalizes logistics so the mind can stay present in the body.',
  },
];

const PRINCIPLES = [
  ['No Porous Materials', 'Jelly, low-grade PVC, and phthalate-containing compounds are categorically refused. Every material on this platform is body-safe certified.'],
  ['Data Minimization', 'We collect only what is strictly necessary to process your order. Zero behavioral tracking. No ad pixels. No third-party data brokers.'],
  ['Discreet by Default', 'Plain unbranded packaging. Non-descript return addresses. Your purchase is your business. This is structural — not optional.'],
  ['No Medical Framing', 'This platform rejects the clinical hygiene lens. Preparation and play are framed as gear and performance — not pathology and treatment.'],
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="border-b border-zinc-800 px-6 py-24 md:py-36 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 max-w-2xl">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ About This Project ]
          </p>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight uppercase leading-none text-white">
            Built for<br />Sovereign<br />Bodies.
          </h1>
          <p className="text-sm font-mono text-zinc-400 leading-8 max-w-lg">
            The friction of navigating a neurotypical world often manifests as a
            persistent, low-grade hum of overwhelm. Queer Pathways is a dedicated,
            identity-fluent digital commerce ecosystem built specifically for the
            queer, gay, trans, and neurodivergent kink communities.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ The Reframe ]
            </p>
            <h2 className="text-3xl font-black tracking-tight uppercase text-white">
              From Medicine<br />to Gear.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-sm font-mono text-zinc-500 leading-7">
              Historically, adult preparation and play have been pathologized through
              a clinical hygiene lens — treating the body like a medical patient rather
              than a sovereign architect of pleasure. This medicalization introduces
              severe cognitive overhead, frequently triggering executive shutdown or
              collapse before play even begins.
            </p>
            <p className="text-sm font-mono text-zinc-400 leading-7">
              This storefront directly reframes personal preparation and kink
              infrastructure from <strong className="text-white">&ldquo;medicine&rdquo;</strong> to{' '}
              <strong className="text-white">&ldquo;gear&rdquo;</strong>. By replacing
              low-fidelity instructions with high-fidelity, industrial-grade tactical
              solutions, the platform externalizes executive function and protects the
              user&rsquo;s somatic sovereignty.
            </p>
          </div>
        </div>
      </section>

      {/* Structural Directives */}
      <section className="border-b border-zinc-800 px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ Structural Design Directives ]
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">
            How We Build
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
          {DIRECTIVES.map(({ label, body }) => (
            <div key={label} className="bg-black p-8 flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] font-mono uppercase text-zinc-500 border-l-2 border-zinc-700 pl-3">
                {label}
              </p>
              <p className="text-sm font-mono text-zinc-500 leading-7">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Non-negotiable principles */}
      <section className="border-b border-zinc-800 px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ Non-Negotiable ]
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">
            Platform Standards
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
          {PRINCIPLES.map(([label, body]) => (
            <div key={label} className="bg-black p-8 flex flex-col gap-3">
              <p className="text-xs tracking-[0.2em] font-mono uppercase text-white">
                — {label}
              </p>
              <p className="text-sm font-mono text-zinc-600 leading-7">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ Who This Is For ]
            </p>
            <h2 className="text-3xl font-black tracking-tight uppercase text-white">
              The Community
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-sm font-mono text-zinc-500 leading-7">
              This platform is built specifically for queer, gay, trans, and
              neurodivergent kink communities. It is engineered with full
              awareness that executive dysfunction, sensory sensitivity, and
              identity-fluidity are not edge cases — they are the primary use case.
            </p>
            <p className="text-sm font-mono text-zinc-500 leading-7">
              The review system is pseudonymous by design. The navigation is
              scannable to prevent choice paralysis. The Sovereign Kit bundles
              are pre-assembled on a high-dopamine day to be ready on a
              low-dopamine one. Every structural decision on this platform is
              made in service of somatic sovereignty.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/shop"
                className="h-12 px-6 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:bg-zinc-100"
              >
                Enter the Shop
              </Link>
              <Link
                href="/prepare"
                className="h-12 px-6 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:border-zinc-400 hover:text-white"
              >
                The Curation Ritual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800">
          {[
            { label: 'General', email: 'hello@queerpathways.com' },
            { label: 'Privacy', email: 'privacy@queerpathways.com' },
            { label: 'Legal', email: 'legal@queerpathways.com' },
          ].map(({ label, email }) => (
            <div key={label} className="bg-black p-8 flex flex-col gap-2">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                {label}
              </p>
              <a
                href={`mailto:${email}`}
                className="text-sm font-mono text-zinc-500 hover:text-white transition-colors"
              >
                {email}
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
