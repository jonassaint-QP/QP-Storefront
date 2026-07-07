export type CategorySlug =
  | 'slings-anchors'
  | 'technical-toys'
  | 'lubes'
  | 'metabolic';

export type Category = {
  slug: CategorySlug;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  category: CategorySlug;
  name: string;
  tagline: string;
  material: string;
  description: string;
  specs: string[];
  price: number; // USD
};

export const CATEGORIES: Category[] = [
  {
    slug: 'slings-anchors',
    tag: 'Category A',
    title: 'Slings & Anchors',
    subtitle: 'Somatic Scaffolding',
    description:
      'Load-bearing infrastructure that builds a secure physical base — freeing the mind to explore without the distraction of physical vulnerability or bodily discomfort.',
  },
  {
    slug: 'technical-toys',
    tag: 'Category B',
    title: 'Technical Toys',
    subtitle: 'Material Discipline',
    description:
      'Zero tolerance for porous, unsafe materials. Every piece is body-safe, premium-grade, and engineered to anchor the nervous system through grounded sensation.',
  },
  {
    slug: 'lubes',
    tag: 'Category C',
    title: 'The Frictionless Suite',
    subtitle: 'Specialized Lubes',
    description:
      'Heavy-viscosity profiles that protect tissue and safely manage mechanical tension. Formulated for advanced play — no compromises, no guesswork.',
  },
  {
    slug: 'metabolic',
    tag: 'Category D',
    title: 'Metabolic Recovery',
    subtitle: 'Maintenance & Recovery',
    description:
      'Targeting the exact point of performance where executive functions usually fail. Streamlined protocols that require zero lab-experiment overhead.',
  },
];

export const PRODUCTS: Product[] = [
  // ── Category A ───────────────────────────────────────────────────────────
  {
    id: 'a-01',
    slug: 'ballistic-nylon-play-sling',
    category: 'slings-anchors',
    name: 'Ballistic Nylon Play Sling',
    tagline: 'Absolute containment. Pelvic alignment. Repeatable function.',
    material: 'Military-grade ballistic nylon / double-stitched',
    description:
      'Heavy-duty play sling engineered for absolute containment and pelvic alignment. Double-stitched seams and powder-coated steel hardware rated to withstand immense stress under real conditions.',
    specs: [
      '600 lb rated load capacity',
      'Double-stitched reinforced seams',
      'Adjustable multi-position straps',
      'Powder-coated steel suspension hardware',
      'Machine-washable nylon shell',
    ],
    price: 289,
  },
  {
    id: 'a-02',
    slug: 'industrial-hardware-anchor-kit',
    category: 'slings-anchors',
    name: 'Industrial Hardware Anchor Kit',
    tagline: 'Mechanical clarity. Supported presence. Zero flex.',
    material: 'Premium locking surgical steel / zinc-plated chain',
    description:
      'Premium ceiling-mount anchor system built for mechanical clarity and a supported presence. Locking carabiners, heavy-duty ceiling plate, and adjustable chain — everything needed to establish a fixed, load-bearing point.',
    specs: [
      '3× locking steel carabiners (5,000 lb rated each)',
      'Heavy-duty ceiling mount plate with anchor bolts',
      '6 ft adjustable steel chain with 3" links',
      'Full installation hardware included',
      'Compatible with standard joist and concrete anchor',
    ],
    price: 189,
  },
  {
    id: 'a-03',
    slug: 'heavy-leather-tactical-vest',
    category: 'slings-anchors',
    name: 'Heavy Leather Tactical Vest',
    tagline: 'Pressure regulation. Concrete structural boundaries for the body.',
    material: 'Full-grain cowhide leather / industrial riveted hardware',
    description:
      'Industrial heritage garment providing direct somatic feedback and pressure regulation. Hand-finished full-grain leather with front buckle closure and D-ring mounting points — a wearable somatic scaffold.',
    specs: [
      'Full-grain cowhide, 4–5 oz weight',
      'Front buckle closure system',
      '6× D-ring attachment points',
      'Hand-finished and burnished edges',
      'Sizes XS–3XL (size chart included)',
    ],
    price: 349,
  },

  // ── Category B ───────────────────────────────────────────────────────────
  {
    id: 'b-01',
    slug: 'platinum-cured-silicone-expander-set',
    category: 'technical-toys',
    name: 'Platinum-Cured Silicone Expander Set',
    tagline: 'Progressive sizing. Glass-smooth finish. Zero compromise.',
    material: '100% platinum-cured body-safe silicone',
    description:
      'Seven-piece progressive sizing set ranging from entry-level profiles to advanced expanders. Flawless glass-smooth finish delivers uniform pressure tolerance at every size. Autoclave-safe, body-safe certified — the only acceptable standard.',
    specs: [
      '7 pieces, 1"–4.5" diameter progression',
      '100% platinum-cured silicone — no fillers',
      'Flared safety base on all pieces',
      'Autoclave-safe and dishwasher-safe',
      'Body-safe certified, phthalate-free',
    ],
    price: 179,
  },
  {
    id: 'b-02',
    slug: 'surgical-steel-weighted-insertable',
    category: 'technical-toys',
    name: 'Surgical Steel Weighted Insertable',
    tagline: 'Distinct mechanical clarity. Direct sensory grounding.',
    material: '316L surgical-grade stainless steel, mirror polish',
    description:
      'High-density surgical steel insertable designed for distinct mechanical clarity and direct sensory grounding. Mirror-polished finish enables temperature play. The weight alone anchors the nervous system.',
    specs: [
      '316L surgical-grade stainless steel',
      'Mirror-polished smooth finish',
      '480g high-density construction',
      'Temperature play capable (hot and cold)',
      'Flared safety base, dishwasher-safe',
    ],
    price: 119,
  },
  {
    id: 'b-03',
    slug: 'elk-hide-precision-flogger',
    category: 'technical-toys',
    name: 'Elk Hide Precision Flogger',
    tagline: 'Hard-wearing somatic anchor. Interrupt executive loops.',
    material: 'Premium elk hide / industrial rubber-wrapped handle',
    description:
      'Hand-cut premium elk hide tails on an industrial rubber-wrapped handle. Balanced for extended use — functions as a somatic anchor that interrupts executive loops and calibrates sensory intensity with precision.',
    specs: [
      '24 hand-cut elk hide tails',
      '18" fall length, 12" rubber-wrapped handle',
      'Balanced weight distribution for extended use',
      'Stainless steel handle core',
      'Individually hand-finished',
    ],
    price: 159,
  },
  {
    id: 'b-04',
    slug: 'latigo-leather-wrist-ankle-cuffs',
    category: 'technical-toys',
    name: 'Latigo Leather Wrist/Ankle Cuffs',
    tagline: '1.75" Black Latigo. Industrial rubber grip. Somatic sovereignty.',
    material: '1.75" Black Latigo leather / rubber-wrapped D-ring hardware',
    description:
      '1.75" Black Latigo leather cuffs with industrial rubber-wrapped handles — hard-wearing somatic anchors that establish concrete physical boundaries and regulate sensory intensity. Sold as a pair.',
    specs: [
      '1.75" Black Latigo full-grain leather',
      'Adjustable 6"–10" circumference',
      '3 adjustment positions',
      'Locking D-ring closure, rubber-wrapped',
      'Sold as a pair (2 cuffs)',
    ],
    price: 89,
  },

  // ── Category C ───────────────────────────────────────────────────────────
  {
    id: 'c-01',
    slug: 'x-lube-water-soluble-concentrate',
    category: 'lubes',
    name: 'X-Lube Water-Soluble Concentrate',
    tagline: 'Custom-mixed. Hyper-slick. Zero cognitive overhead.',
    material: 'Water-soluble polymer — no glycerin, no parabens',
    description:
      'Powder-to-gel formulation that removes gritty textures and allows custom-mixed, hyper-slick slurries without toxic additives. One pouch makes up to 5 liters of gel at your chosen viscosity. No measuring cups required.',
    specs: [
      '250g powder, makes up to 5L of gel',
      'Adjustable viscosity — thin to ultra-thick',
      'pH-balanced (7.0–7.4)',
      'Toy-safe and latex-safe',
      'No glycerin, no parabens, no glycol',
    ],
    price: 39,
  },
  {
    id: 'c-02',
    slug: 'ultra-thick-silicone-hybrid-formula',
    category: 'lubes',
    name: 'Ultra-Thick Silicone Hybrid Formula',
    tagline: 'Medical-grade. Long-lasting. A resilient, frictionless barrier.',
    material: 'Medical-grade dimethicone / silicone-hybrid base',
    description:
      'Medical-grade long-lasting hybrid silicone formula that establishes a resilient, frictionless barrier. Heavy viscosity that stays where you put it. Compatible with non-silicone toys. Honoring the two-way street of consent and somatic presence.',
    specs: [
      '500ml pump bottle',
      'Heavy viscosity — does not thin with use',
      'Compatible with non-silicone toys',
      'Heat stable to 150°C',
      'No water-based degradation',
    ],
    price: 59,
  },

  // ── Category D ───────────────────────────────────────────────────────────
  {
    id: 'd-01',
    slug: 'bottom-fiber-capsules',
    category: 'metabolic',
    name: 'BOTTOM Fiber Capsules',
    tagline: 'Streamlined. Predictable. Zero lab-experiment overhead.',
    material: 'Psyllium husk, flaxseed, inulin — Friend of Dorothy formula',
    description:
      'Pre-measured capsule line blending psyllium, flaxseed, and inulin that eliminates the messy, frustrating lab-experiment ritual of weighing bulk powders. Streamlined and predictable — four capsules, once daily.',
    specs: [
      '60-day supply (240 capsules)',
      '4 capsules daily dose',
      'Psyllium husk + flaxseed + inulin blend',
      'No artificial additives or fillers',
      'Travel-safe resealable packaging',
    ],
    price: 49,
  },
  {
    id: 'd-02',
    slug: 'post-play-recovery-pack',
    category: 'metabolic',
    name: 'Post-Play Recovery Pack',
    tagline: 'Cushion the nervous system drop. Clear the dopamine crash.',
    material: 'Electrolyte complex / glucose recovery blend',
    description:
      'Formulated electrolyte and glucose hydration packages explicitly designed to stabilize the system and clear the chemical malware of a post-play dopamine crash. Pre-portioned. No measuring. Open and consume.',
    specs: [
      '10-session supply per pack',
      '10× electrolyte tabs (sodium, potassium, magnesium)',
      '10× glucose gummy packs (20g fast-acting carbs)',
      'Pedialyte-equivalent electrolyte profile',
      'Travel-safe, individually sealed',
    ],
    price: 34,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}
