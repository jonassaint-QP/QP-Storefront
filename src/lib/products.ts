export type CategorySlug =
  | 'technical-toys'
  | 'lubes';

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
  image?: string; // path relative to /public
};

export const CATEGORIES: Category[] = [
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
];

export const PRODUCTS: Product[] = [
  {
    id: 'b-05',
    slug: 'h-style-flogger',
    category: 'technical-toys',
    name: 'H-Style Flogger',
    tagline: 'Short handle. Deep impact. Close-quarters regulation.',
    material: 'Premium leather falls / leather-wrapped handle',
    image: '/images/products/h-style-flogger.jpg',
    description:
      'Short handle. Deep impact. Built for close-quarters regulation when the internal courtroom won\'t shut up. A 16cm leather-wrapped grip anchors your hand, while 54cm leather falls deliver precise, grounding thud. It\'s not about punishment; it\'s about pulling your consciousness out of the executive archives and slamming it back into the present moment.',
    specs: [
      '16cm leather-wrapped grip with wrist loop',
      '54cm premium leather falls',
      'Precise, grounding thud profile',
      'Balanced weight for extended use',
    ],
    price: 55,
  },
  {
    id: 'b-06',
    slug: 'spartacus-leather-cane-24',
    category: 'technical-toys',
    name: 'Spartacus 24" Leather Wrapped Cane',
    tagline: 'Thud meets sting. Controlled, deliberate impact on your terms.',
    material: 'Leather-wrapped firm core / 24-inch',
    image: '/images/products/spartacus-leather-cane-24.jpg',
    description:
      'Thud meets sting. Twenty-four inches of controlled, deliberate impact wrapped in leather over a firm core. It lands heavier and softer than raw rattan, making it the perfect tool for building tolerance, processing somatic storage, and modulating sensory input on your own terms.',
    specs: [
      '24-inch leather-wrapped firm core',
      'Heavier, softer impact profile than raw rattan',
      'High control, versatile sensation',
      'Wrist safety loop included',
    ],
    price: 49,
  },
  {
    id: 'b-07',
    slug: 'leather-ankle-cuffs-chain',
    category: 'technical-toys',
    name: 'Leather Ankle Cuffs w/ Chain',
    tagline: 'All black. All business. Secure the perimeter. Adjourn the trial.',
    material: 'Adjustable leather / detachable black chain hardware',
    image: '/images/products/leather-ankle-cuffs-chain.jpg',
    description:
      'All black. All business. Fully adjustable buckle straps mated to a detachable double-trigger hook chain. When your brain spends all day running a marathon of code-switching and task-paralysis, being completely locked in is the only way to finally let your guard down. Secure the perimeter. Adjourn the trial.',
    specs: [
      'Fully adjustable buckle strap closures',
      'D-ring connections on each cuff',
      'Detachable double-trigger hook chain',
      'All-black hardware throughout',
    ],
    price: 59,
  },
  {
    id: 'b-08',
    slug: 'master-series-pup-arsenal-set',
    category: 'technical-toys',
    name: 'Master Series Pup Arsenal Set',
    tagline: 'Everything you need to surrender the crown. The ultimate cognitive off-ramp.',
    material: 'Vegan leather / neoprene / nickel-free hardware',
    image: '/images/products/master-series-pup-arsenal-set.jpg',
    description:
      'Everything you need to get on all fours and surrender the crown. For the visionary exhausted by executive function, this is the ultimate cognitive off-ramp. A complete neoprene hood with poseable ears, silicone bone gag, bulldog harness, mitts, and a wagging tail plug. No decisions to make. No boardroom to impress. Just pure, unadulterated, non-verbal play.',
    specs: [
      'Item XRAH275',
      'Neoprene puppy hood with poseable ears',
      'Silicone bone gag + bulldog harness',
      'Padded paw mitts + tail anal plug',
      'Vegan leather throughout, nickel-free hardware',
    ],
    price: 189,
  },
  {
    id: 'b-09',
    slug: 'spartacus-blown-large-realistic-glass',
    category: 'technical-toys',
    name: 'Spartacus Blown Large Realistic Glass',
    tagline: 'Clear. Clean. Unyielding. Temperature-responsive total presence.',
    material: 'Premium borosilicate glass — non-porous, temperature-responsive',
    image: '/images/products/spartacus-blown-large-realistic-glass.jpg',
    description:
      'Clear. Clean. Unyielding. Borosilicate glass engineered to hold temperature — run it under hot water to thaw out somatic freeze, or chill it to shock a hyper-aroused nervous system back to baseline. A massive, realistic profile anchored by a 3.75\" harness-compatible suction base. Zero compromise, total presence.',
    specs: [
      'Item BSPG-B3C',
      'Premium borosilicate glass — non-porous',
      'Temperature-responsive (hot and cold play)',
      '3.75" harness-compatible suction base',
      'Realistic profile, dishwasher-safe',
    ],
    price: 69,
  },
  {
    id: 'b-10',
    slug: 'spartacus-blown-medium-realistic-glass',
    category: 'technical-toys',
    name: 'Spartacus Blown Medium Realistic Glass',
    tagline: 'Raw grit. Flawless craft. Targeted, sustainable intensity.',
    material: 'Premium borosilicate glass — non-porous, temperature-responsive',
    image: '/images/products/spartacus-blown-medium-realistic-glass.jpg',
    description:
      'The same raw grit and flawless craftsmanship as its larger counterpart, scaled down for targeted, sustainable intensity. Built with a 2.5\" harness-compatible base, this medium borosilicate piece delivers the same temperature-shifting, non-porous grounding without overwhelming the system.',
    specs: [
      'Item BSPG-B4C',
      'Premium borosilicate glass — non-porous',
      'Temperature-responsive (hot and cold play)',
      '2.5" harness-compatible suction base',
      'Limited stock — immediate discrete dispatch',
    ],
    price: 59,
  },
  {
    id: 'b-11',
    slug: 'blush-au-naturel-daddy-14',
    category: 'technical-toys',
    name: 'Blush Au Naturel "Daddy" 14"',
    tagline: 'Fourteen inches of dual-density authority. Stop running the world.',
    material: 'Dual-density phthalate-free TPE with FlexiShaft™ technology',
    image: '/images/products/blush-au-naturel-daddy-14.jpg',
    description:
      'Fourteen inches of dual-density authority. Engineered with Sensa Feel® layers — a soft, human-like exterior wrapped around an unyielding, rigid core. Complete with a tapered head and an iron-clad suction cup that anchors to any flat surface or locks into a harness. This is big, protective energy for when you need to stop running the world and let something else take control.',
    specs: [
      'Item BL26643',
      '14" dual-density phthalate-free TPE',
      'Sensa Feel® exterior / FlexiShaft™ rigid core',
      'Tapered head for progressive entry',
      'Iron-clad suction cup — flat surface and harness compatible',
    ],
    price: 79,
  },

  // ── Category C ───────────────────────────────────────────────────────────
  {
    id: 'c-03',
    slug: 'spunk-lube-pure-silicone',
    category: 'lubes',
    name: 'SPUNK Lube Pure Silicone',
    tagline: 'Zero sticky. Infinite shelf life. Medical-grade glide for sensory sensitivity.',
    material: '100% pure silicone — paraben-free, glycerin-free, chemical-free',
    image: '/images/products/spunk-lube-pure-silicone.jpg',
    description:
      'Zero sticky. Infinite shelf life. When your nervous system is constantly short-circuiting from cognitive friction, your bedroom shouldn\'t add to the drag. This is pure, low-stimulation, medical-grade glide designed for sensory sensitivity and endless endurance. No parabens, no glycerin, no chemical noise. Just a smooth, non-drying boundary that outlasts the longest day in the boardroom.',
    specs: [
      '16 fl oz / 473 ml',
      '100% pure silicone — no parabens, no glycerin',
      'Non-staining, non-drying formula',
      'Safe with non-silicone toys',
      'Made in USA',
    ],
    price: 28,
  },
  {
    id: 'c-04',
    slug: 'trojan-bareskin-raw',
    category: 'lubes',
    name: 'Trojan BareSkin Raw',
    tagline: 'Maximum somatic feedback. Minimal interference. The thinnest safety net.',
    material: 'Ultra-thin latex — natural rubber',
    image: '/images/products/trojan-bareskin-raw.jpg',
    description:
      'The closest you can get without the noise. For the hyper-vigilant mind that overthinks every layer of separation, Raw strips away the armor while keeping the safety net intact. Maximum somatic feedback, minimal interference. Stop managing the friction and start feeling the impact.',
    specs: [
      'Thinnest latex protection Trojan makes',
      'Ultra-sensitive natural rubber latex',
      'Lubricated with reservoir tip',
      'Secure, reliable protection',
    ],
    price: 14,
  },
  {
    id: 'c-05',
    slug: 'kama-sutra-sex-magnet-candle',
    category: 'lubes',
    name: 'Kama Sutra Sex Magnet Candle',
    tagline: 'Light it. Melt it. Ground it. Pheromone-infused nervous system reset.',
    material: 'Pheromone-infused body-safe massage oil wax — leather and cedar blend',
    image: '/images/products/kama-sutra-sex-magnet-candle.jpg',
    description:
      'Light it. Melt it. Ground it. A pheromone-infused blend of leather and cedar that warms down into a body-safe massage oil. It adapts to your skin chemistry, shifting the atmosphere from high-alert performance to low-lighting intimacy. It\'s never too hot, always inviting, and deeply grounding for an exhausted nervous system.',
    specs: [
      'Item KS12084',
      'Leather and cedar pheromone profile',
      'Clean-melting body-safe massage oil formula',
      'Never too hot — safe for direct skin contact',
      'Custom pheromone blend adapts to skin chemistry',
    ],
    price: 24,
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
