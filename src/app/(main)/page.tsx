import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queer Pathways — High-Fidelity Kink Infrastructure',
  description:
    'Industrial-grade gear, somatic scaffolding, and tactical kink infrastructure for the queer, gay, trans, and neurodivergent communities.',
  robots: { index: false, follow: false },
};

const CATEGORIES = [
  {
    tag: 'Category A',
    title: 'Slings & Anchors',
    subtitle: 'Somatic Scaffolding',
    description:
      'Heavy-duty, load-bearing play slings and industrial hardware anchors engineered for absolute containment and pelvic alignment.',
    href: '/shop/slings-anchors',
    cta: 'View Hardware',
  },
  {
    tag: 'Category B',
    title: 'Technical Toys',
    subtitle: 'Material Discipline',
    description:
      'Platinum-cured silicone, weighted surgical steel, and high-fidelity sensation hardware. Zero compromise on material quality.',
    href: '/shop/technical-toys',
    cta: 'View Toys',
  },
  {
    tag: 'Category C',
    title: 'Frictionless Suite',
    subtitle: 'Specialized Lubes',
    description:
      'Heavy-viscosity concentrates and medical-grade silicones formulated for advanced play. Custom-mix precision, zero cognitive overhead.',
    href: '/shop/lubes',
    cta: 'View Lubes',
  },
  {
    tag: 'Category D',
    title: 'Metabolic Recovery',
    subtitle: 'Maintenance & Recovery',
    description:
      'Streamlined fiber protocols and post-play electrolyte packs that stabilize your system and clear the post-play dopamine crash.',
    href: '/shop/metabolic',
    cta: 'View Recovery',
  },
];

const KIT_ITEMS = [
  'Tactical Containment Unit',
  'Sensory Grounding Apparel',
  'Frictionless Duo Pack',
  'Metabolic Recovery Pack',
  'Tactile Hygiene Essentials',
  'Sovereign Body Harm-Reduction Guide',
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="border-b border-zinc-800 px-6 py-24 md:py-36 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-8 max-w-2xl">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Somatic Scaffolding & High-Fidelity Kink Infrastructure ]
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase leading-none text-white">
            Equip<br />the Body<br />Like an<br />Athlete.
          </h1>
          <p className="text-zinc-400 text-base leading-8 font-mono max-w-lg">
            Industrial-grade gear engineered for the queer, gay, trans, and
            neurodivergent kink communities. Built to externalize executive
            function and protect somatic sovereignty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/shop"
              className="h-12 px-6 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:bg-zinc-100"
            >
              Enter the Shop
            </Link>
            <Link
              href="/bundles"
              className="h-12 px-6 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:border-zinc-400 hover:text-white"
            >
              View the Sovereign Kit
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reframe Bar ── */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          <div className="flex flex-col gap-2 py-6 md:py-0 md:pr-12">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-700">
              [ Clinical Hygiene ]
            </p>
            <p className="text-sm font-mono text-zinc-600 leading-7">
              Treating the body like a patient.<br />
              <span className="line-through text-zinc-800">&ldquo;Fixing a broken leak.&rdquo;</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 py-6 md:py-0 md:pl-12">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-400">
              [ Erotic Empowerment ]
            </p>
            <p className="text-sm font-mono text-zinc-300 leading-7">
              Equipping the body like an athlete.<br />
              <span className="text-white font-bold">&ldquo;Fortifying the perimeter.&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Grid ── */}
      <section className="border-b border-zinc-800 px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 mb-12">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ Product Taxonomy ]
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">
            The Catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-800">
          {CATEGORIES.map(({ tag, title, subtitle, description, href, cta }) => (
            <div
              key={href}
              className="bg-black p-8 flex flex-col gap-4 group"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-700">
                  {tag}
                </p>
                <h3 className="text-xl font-black tracking-tight uppercase text-white">
                  {title}
                </h3>
                <p className="text-xs font-mono uppercase text-zinc-600 tracking-widest">
                  {subtitle}
                </p>
              </div>
              <p className="text-sm font-mono text-zinc-500 leading-7">
                {description}
              </p>
              <Link
                href={href}
                className="mt-auto text-xs font-bold font-mono tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sovereign Kit Feature ── */}
      <section className="border-b border-zinc-800 px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
                [ Primary Commercial Focus ]
              </p>
              <h2 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
                The Sovereign<br />Maintenance Kit
              </h2>
            </div>
            <p className="text-sm font-mono text-zinc-400 leading-7">
              Engineered to eliminate the ADHD Tax — the logistical and financial
              cost of executive dysfunction during post-play transitions. Pre-packed
              on a high-dopamine day. Ready when you need it most.
            </p>
            <div className="border-l-2 border-zinc-800 pl-4 flex flex-col gap-1">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                [ The Point of Performance ]
              </p>
              <p className="text-xs font-mono text-zinc-600 leading-6">
                Pre-packaged hardware, built to cushion your post-play landing.
              </p>
            </div>
            <Link
              href="/bundles"
              className="w-fit h-12 px-6 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center transition-colors hover:bg-zinc-100"
            >
              Build the Kit
            </Link>
          </div>

          {/* Right: kit manifest */}
          <div className="border border-zinc-800 p-8 flex flex-col gap-4">
            <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-600 mb-2">
              Bundle Manifest
            </p>
            {KIT_ITEMS.map((item, i) => (
              <div key={item} className="flex items-start gap-4 group">
                <span className="text-xs font-mono text-zinc-700 mt-0.5 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors leading-6">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Directives ── */}
      <section className="px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
          {[
            {
              label: 'Utility Over Ornament',
              body: 'The brand completely rejects sanitized, soft luxury aesthetics. Every product earns its place through repeatable function under real conditions.',
            },
            {
              label: 'Industrial Heritage',
              body: 'Load-bearing value. Pressure tolerance. Durable construction. This is gear, not decoration.',
            },
            {
              label: 'The Centaur Architecture',
              body: 'Engineered to support the integration of raw somatic instinct with strategic executive focus. Built for sovereign bodies.',
            },
          ].map(({ label, body }) => (
            <div key={label} className="bg-black p-8 flex flex-col gap-4">
              <p className="text-xs tracking-[0.2em] font-mono uppercase text-zinc-600">
                — {label}
              </p>
              <p className="text-sm font-mono text-zinc-500 leading-7">{body}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
