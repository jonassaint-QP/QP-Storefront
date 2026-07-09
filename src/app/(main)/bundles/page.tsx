import type { Metadata } from 'next';
import AddToCartButton from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Sovereign Maintenance Kit — Queer Pathways',
  description:
    'A high-fidelity product bundle engineered to eliminate the ADHD Tax during post-play transitions. Pre-packed on a high-dopamine day. Ready when you need it most.',
  robots: { index: false, follow: false },
};

const BUNDLE_PRICE = 299;
const BUNDLE_RETAIL = 388;
const BUNDLE_SAVING = BUNDLE_RETAIL - BUNDLE_PRICE;

const KIT_ITEMS = [
  {
    index: '01',
    name: 'Tactical Containment Unit',
    subtitle: 'The Overnight Bag',
    description:
      'A dedicated, permanent overnight bag acting as a somatic scaffold that lives by the door. Heavy-duty ballistic nylon, lockable zipper pulls, and modular internal pockets. Removing the cognitive load of repeat packing — permanently.',
    specs: ['Ballistic nylon exterior', 'Lockable YKK zipper pulls', 'Modular interior organizer system', 'Shoulder strap + grip handle', 'Dimensions: 20" × 12" × 10"'],
  },
  {
    index: '02',
    name: 'Sensory Grounding Apparel',
    subtitle: 'Jockstrap 2-Pack',
    description:
      'High-quality jockstraps built to provide immediate tactile feedback and anchor the user in their queer identity within unfamiliar or mundane environments. Heavy-duty elastic waistband, reinforced pouch construction.',
    specs: ['2-pack (black)', 'Heavy-duty 1.5" elastic waistband', 'Reinforced double-layer pouch', 'Sizes XS–3XL', 'Machine-washable'],
  },
  {
    index: '03',
    name: 'Frictionless Duo Pack',
    subtitle: 'Water-Soluble + Silicone',
    description:
      'Pre-packed X-Lube water-soluble concentrate and ultra-thick silicone hybrid formula — the two essential viscosity profiles for every advanced play scenario. Both options. Zero scrambling.',
    specs: ['X-Lube 100g travel pouch (makes up to 2L)', 'Silicone hybrid 100ml travel bottle', 'Both pH-balanced', 'Toy-safe and latex-safe', 'Discreet unbranded packaging'],
  },
  {
    index: '04',
    name: 'Metabolic Recovery Pack',
    subtitle: 'Electrolytes + Glucose',
    description:
      'Pre-packaged electrolyte tabs and glucose-restoring gummies to cushion the nervous system drop. Formulated to clear the chemical malware of a post-play dopamine crash. Open and consume — no measuring, no preparation.',
    specs: ['5× electrolyte tabs (sodium, potassium, magnesium)', '5× glucose gummy packs (20g fast-acting carbs)', 'Pedialyte-equivalent electrolyte profile', 'Travel-safe individually sealed', 'No artificial colors'],
  },
  {
    index: '05',
    name: 'Tactile Hygiene Essentials',
    subtitle: 'Permanently Archived Duplicates',
    description:
      'Permanently archived duplicate sets — toothbrush, travel mouthwash, dark microfiber sheet, 32oz water bottle, and douching nozzle set. Packed once and never unpacked. Personal hygiene that never relies on memory.',
    specs: ['Soft-bristle toothbrush', 'Travel mouthwash (alcohol-free)', 'Dark microfiber sheet (queen)', '32oz insulated water bottle', '2× stainless steel douching nozzle tips'],
  },
  {
    index: '06',
    name: "The 'Sovereign Body' Harm-Reduction Guide",
    subtitle: 'Printed Protocol',
    description:
      'The critical software for the brain — a highly legible, step-by-step printed framework on aftercare, boundary adjustments, and sensory calibration. Laminated cards in a rigid sleeve. When the brain is drained, you only have to read, not think.',
    specs: ['12 laminated protocol cards', 'Rigid waterproof card sleeve', 'Topics: aftercare, boundary reset, sensory calibration, emergency contacts', 'Large-print format for low-executive-function states', 'Designed by neurodivergent practitioners'],
  },
];

export default function BundlesPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="border-b border-zinc-800 px-6 py-24 md:py-36 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
                [ Primary Commercial Focus ]
              </p>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight uppercase leading-none text-white">
                The Sovereign<br />Maintenance<br />Kit
              </h1>
            </div>
            <p className="text-sm font-mono text-zinc-400 leading-7 max-w-lg">
              A high-fidelity product bundle explicitly engineered to eliminate
              the <strong className="text-white">ADHD Tax</strong> — the
              logistical and financial cost of executive dysfunction during
              post-play transitions.
            </p>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white">
                  {formatPrice(BUNDLE_PRICE)}
                </span>
                <span className="text-sm font-mono text-zinc-700 line-through">
                  {formatPrice(BUNDLE_RETAIL)} separately
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-500">
                You save{' '}
                <span className="text-zinc-300">{formatPrice(BUNDLE_SAVING)}</span> — and
                the cognitive overhead of building this yourself.
              </p>
            </div>
            <AddToCartButton
              id="bundle-sovereign-kit"
              slug="sovereign-maintenance-kit"
              category="technical-toys"
              name="The Sovereign Maintenance Kit"
              price={BUNDLE_PRICE}
              label="Add Bundle to Cart"
              className="w-fit h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100 flex items-center"
            />
          </div>

          {/* Fulfillment callouts */}
          <div className="flex flex-col gap-3">
            {[
              ['Discreet Shipping', 'Plain, unbranded packaging. Non-descript return address. No brand name on the label.'],
              ['Pre-Packed by Design', 'Assembled on a high-dopamine day. Ready to deploy on a low-dopamine morning.'],
              ['Executive Function Externalized', 'Six categories of need resolved in a single purchase decision.'],
            ].map(([label, body]) => (
              <div key={label} className="border border-zinc-800 p-5 flex flex-col gap-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                  — {label}
                </p>
                <p className="text-xs font-mono text-zinc-600 leading-6">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The ADHD Tax ── */}
      <section className="border-b border-zinc-800 bg-zinc-950 px-6 py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ The Problem ]
            </p>
            <h2 className="text-3xl font-black tracking-tight uppercase text-white">
              The ADHD Tax
            </h2>
            <p className="text-sm font-mono text-zinc-500 leading-7">
              The logistical and financial cost of executive dysfunction. The
              scrambling for forgotten supplies. The last-minute purchases at
              triple the price. The play session that collapses before it begins
              because the body wasn&apos;t set up for success.
            </p>
            <p className="text-sm font-mono text-zinc-500 leading-7">
              This kit externalizes executive function on a high-dopamine day to
              protect and reward the user on a low-dopamine morning.
            </p>
          </div>
          <div className="border border-zinc-800 p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                [ The Point of Performance ]
              </p>
              <p className="text-xs font-mono text-zinc-600 leading-6">
                The exact location where a skill must be deployed.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-zinc-800">
              <div className="bg-zinc-950 p-4 flex flex-col gap-2">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                  Executive Collapse
                </p>
                <p className="text-xs font-mono text-zinc-700 leading-6">
                  Scrambling for forgotten supplies, feeding the Auditor&apos;s
                  narrative.
                </p>
              </div>
              <div className="bg-zinc-950 p-4 flex flex-col gap-2">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  Tactical Readiness
                </p>
                <p className="text-xs font-mono text-zinc-400 leading-6">
                  Pre-packaged hardware, built to cushion your post-play
                  landing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bundle Manifest ── */}
      <section className="border-b border-zinc-800 px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 mb-16">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ Bundle Hardware Blueprint ]
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">
            What&apos;s Included
          </h2>
        </div>

        <div className="flex flex-col gap-px bg-zinc-800">
          {KIT_ITEMS.map(({ index, name, subtitle, description, specs }) => (
            <div key={index} className="bg-black p-8 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-6 md:gap-12 group hover:bg-zinc-950 transition-colors">
              {/* Index */}
              <div className="flex items-start">
                <span className="text-3xl font-black text-zinc-800 tabular-nums group-hover:text-zinc-700 transition-colors leading-none">
                  {index}
                </span>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                  {subtitle}
                </p>
                <h3 className="text-lg font-black tracking-tight uppercase text-white leading-tight">
                  {name}
                </h3>
                <p className="text-sm font-mono text-zinc-500 leading-7 mt-1">
                  {description}
                </p>
              </div>

              {/* Specs */}
              <ul className="flex flex-col gap-2">
                {specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-3 text-xs font-mono text-zinc-600"
                  >
                    <span className="shrink-0 text-zinc-800 mt-0.5">—</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 mx-auto w-full max-w-7xl">
        <div className="border border-zinc-800 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ One Decision. Six Categories Resolved. ]
            </p>
            <h2 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
              Deploy the Kit.
            </h2>
            <p className="text-sm font-mono text-zinc-500 leading-7">
              Assembled once. Permanently ready. All shipments arrive in plain,
              unbranded packaging with a non-descript return address. Nothing on
              the label reveals its contents.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">
                {formatPrice(BUNDLE_PRICE)}
              </span>
              <span className="text-sm font-mono text-zinc-700 line-through">
                {formatPrice(BUNDLE_RETAIL)}
              </span>
            </div>
            <AddToCartButton
              id="bundle-sovereign-kit"
              slug="sovereign-maintenance-kit"
              category="technical-toys"
              name="The Sovereign Maintenance Kit"
              price={BUNDLE_PRICE}
              label="Add Bundle to Cart"
              className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100 flex items-center"
            />
            <p className="text-xs font-mono text-zinc-700 text-center">
              Discreet. Unbranded. Delivered.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
