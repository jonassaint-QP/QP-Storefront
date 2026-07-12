export type CategorySlug =
  | 'technical-toys'
  | 'lubes'
  | 'internal-expansion'
  | 'double-outsider';

export type Category = {
  slug: CategorySlug;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  /** Tailwind text-color class derived from the hanky code */
  color: string;
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
  image?: string;   // Main/Hero shot — path relative to /public
  images?: string[]; // Full gallery list
  sku?: string;
  stock?: number;
  protocol?: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'technical-toys',
    tag: 'Category B',
    title: 'Technical Toys',
    subtitle: 'Material Discipline',
    description:
      'Zero tolerance for porous, unsafe materials. Every piece is body-safe, premium-grade, and engineered to anchor the nervous system through grounded sensation.',
    color: 'text-zinc-400', // grey hanky — bondage / SM
  },
  {
    slug: 'lubes',
    tag: 'Category C',
    title: 'The Frictionless Suite',
    subtitle: 'Specialized Lubes',
    description:
      'Heavy-viscosity profiles that protect tissue and safely manage mechanical tension. Formulated for advanced play — no compromises, no guesswork.',
    color: 'text-blue-700', // dark navy hanky — anal / fucking
  },
  {
    slug: 'internal-expansion',
    tag: 'Category IX',
    title: 'Internal Expansion',
    subtitle: "Alex's Kit",
    description:
      'Heavy sensation and systematic training gear designed for capacity building and presence.',
    color: 'text-purple-600', // purple hanky — piercing / heavy sensation / gaping
  },
  {
    slug: 'double-outsider',
    tag: 'Category III',
    title: 'Double-Outsider Supply Co.',
    subtitle: 'Identity & Hardware',
    description:
      'The essential uniform and technical hardware of the Sovereign Harbor.',
    color: 'text-red-700', // red hanky — fisting / heavy duty
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
    images: [
      '/images/products/master-series-pup-arsenal-set.jpg',
      '/images/products/XRAH275a___1699938258.jpg',
      '/images/products/XRAH275b___1699938261.jpg',
      '/images/products/XRAH275c___1699938264.jpg',
      '/images/products/XRAH275d___1699938267.jpg',
    ],
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
    images: [
      '/images/products/spartacus-blown-medium-realistic-glass.jpg',
      '/images/products/BSPG-B4Ca___1701493477.jpg',
    ],
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
    images: [
      '/images/products/blush-au-naturel-daddy-14.jpg',
      '/images/products/BL26643a.jpg',
      '/images/products/BL26643b.jpg',
      '/images/products/BL26643c.jpg',
      '/images/products/BL26643d.jpg',
    ],
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
  {
    id: 'c-06',
    slug: 'wet-platinum-3oz',
    category: 'lubes',
    name: 'Wet Platinum Silicone Lube (3.0 oz)',
    tagline: 'The gold standard for long-haul sessions. Pure silicone that never quits.',
    material: '100% medical-grade pure silicone — paraben-free, fragrance-free',
    image: '/images/products/wet-platinum-3oz.jpg',
    description:
      'The gold standard for long-haul sessions. This is pure, medical-grade silicone that doesn\'t evaporate, doesn\'t migrate, and doesn\'t quit. Waterproof, non-sticky, and designed for those who need their glide to last longer than the conversation about it.',
    specs: [
      '3.0 fl oz / 89 ml',
      '100% pure medical-grade silicone',
      'Waterproof — safe for water-based play',
      'Non-sticky, non-staining formula',
      'Not safe with silicone toys',
    ],
    price: 13.30,
  },
  {
    id: 'c-07',
    slug: 'wet-gold-hybrid-3oz',
    category: 'lubes',
    name: 'Wet Gold Hybrid Lube (3.0 oz)',
    tagline: 'The Best of Both Worlds protocol. Silicone glide, water-based cleanup.',
    material: 'Silicone-water hybrid blend — paraben-free, glycerin-free',
    image: '/images/products/wet-gold-hybrid-3oz.jpg',
    description:
      'The Best of Both Worlds protocol. We\'ve blended the unyielding glide of silicone with the easy, one-wash cleanup of water. It\'s a high-performance hybrid for the brain that wants the slickness without the logistical commitment.',
    specs: [
      '3.0 fl oz / 89 ml',
      'Silicone-water hybrid formula',
      'Long-lasting glide with easy soap-and-water cleanup',
      'Non-sticky, non-staining',
      'Toy-safe — compatible with most materials',
    ],
    price: 13.30,
  },
  {
    id: 'c-08',
    slug: 'wet-hybrid-3-1oz',
    category: 'lubes',
    name: 'Wet Hybrid Lube (3.1 oz)',
    tagline: 'Light-touch architecture. Silky, water-forward, completely toy-safe.',
    material: 'Water and silicone hybrid blend — pH-balanced, fragrance-free',
    image: '/images/products/wet-hybrid-3-1oz.jpg',
    description:
      'Light-touch architecture. Silky, water-forward, and completely toy-safe. It provides an immediate, natural-feeling slide that bridges the gap between clinical safety and somatic pleasure. Clean, reliable, and perfectly frictionless.',
    specs: [
      '3.1 fl oz / 93 ml',
      'Water-forward silicone-blend formula',
      'pH-balanced, fragrance-free',
      'Fully toy-safe — compatible with all materials',
      'Easy water-based cleanup',
    ],
    price: 13.30,
  },
  {
    id: 'c-09',
    slug: 'wet-platinum-gallon',
    category: 'lubes',
    name: 'Wet Platinum Silicone Lube (1 Gallon)',
    tagline: 'The Gallon Gap: Professional Bulk Infrastructure.',
    material: '100% medical-grade pure silicone — paraben-free, fragrance-free',
    image: '/images/products/wet-platinum-gallon.webp',
    description:
      'The ultimate bulk infrastructure. One full gallon (128 oz) of pure, medical-grade silicone. This is the heavy-duty anchor for high-volume environments where "running out" is not an option. Pure glide, zero noise, total sovereignty.',
    specs: [
      '128 fl oz / 3.78 L (1 gallon)',
      '100% pure medical-grade silicone',
      'Waterproof — safe for water-based play',
      'Non-sticky, non-staining, non-drying',
      'Not safe with silicone toys',
    ],
    price: 259.95,
  },
  {
    id: 'c-10',
    slug: 'wet-original-gallon',
    category: 'lubes',
    name: 'Wet Original Water-Based Lube (1 Gallon)',
    tagline: 'High-Capacity Somatic Glide.',
    material: 'Premium water-based formula — condom-compatible, toy-safe',
    image: '/images/products/wet-original-gallon.webp',
    description:
      'High-capacity water-based glide. 128 ounces of our clean, toy-safe, and easy-cleanup formula. Perfect for high-frequency somatic reset or studio-scale play.',
    specs: [
      '128 fl oz / 3.78 L (1 gallon)',
      'Water-based, condom-compatible formula',
      'Fully toy-safe — all materials',
      'Long-lasting and hydro-slippy',
      'Easy soap-and-water cleanup',
    ],
    price: 129.00,
  },
  {
    id: 'c-11',
    slug: 'swiss-navy-silicone-32oz',
    category: 'lubes',
    name: 'Swiss Navy Silicone Lubricant (32 oz)',
    tagline: 'The Professional Standard.',
    material: 'Highest-grade pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/SwissNavySilicone32oz.webp',
    description:
      'Velvet-smooth, medical-grade silicone in the high-capacity 32 oz cylinder. Satiny glide that is non-absorbable and contributes to greater personal intimacy. Locking pump included.',
    specs: [
      '32 fl oz / 946.3 ml',
      'Highest-grade silicone formula',
      'Satiny smooth, non-absorbable glide',
      'Locking pump dispenser included',
      'Not safe with silicone toys',
    ],
    price: 79.99,
  },
  {
    id: 'c-13',
    slug: 'swiss-navy-silicone-16oz',
    category: 'lubes',
    name: 'Swiss Navy Silicone Lubricant (16 oz)',
    tagline: 'Reliable. Slick. Unstoppable.',
    material: 'Highest-grade pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/SwissNavySilicone16oz.webp',
    description:
      '16 ounces of pure Swiss Navy silicone. Perfect for frequent users who need a mid-sized anchor — all the premium glide of the full line in a grab-and-go format with pump dispenser.',
    specs: [
      '16 fl oz / 473 ml',
      'Highest-grade silicone formula',
      'Satiny smooth, non-absorbable glide',
      'Pump dispenser included',
      'Not safe with silicone toys',
    ],
    price: 44.99,
  },
  {
    id: 'c-14',
    slug: 'swiss-navy-silicone-gallon',
    category: 'lubes',
    name: 'Swiss Navy Silicone Lubricant (1 Gallon)',
    tagline: 'The Gallon Gap: Maximum Infrastructure.',
    material: 'Highest-grade pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/SwissNavySiliconeGallon.webp',
    description:
      '128 ounces of pure silicone for high-volume operations. The gold-standard Swiss Navy formula scaled to full gallon capacity. Includes a bonus 2 oz travel bottle.',
    specs: [
      '128 fl oz / 3.8 L (1 gallon)',
      'Highest-grade silicone formula',
      'Satiny smooth, non-absorbable glide',
      'Pump dispenser included',
      'Bonus 2 oz travel bottle',
    ],
    price: 259.95,
  },
  {
    id: 'c-15',
    slug: 'intimate-earth-velvet-2oz',
    category: 'lubes',
    name: 'Intimate Earth Velvet Touch Silicone (2 oz)',
    tagline: 'Silk-Smooth Presence.',
    material: 'Pure silicone enriched with organic extracts — paraben-free, glycerin-free',
    image: '/images/products/intimate-earth-velvet-2oz.webp',
    description:
      'A silk-smooth silicone glide enriched with organic extracts. Designed for skin-to-skin presence and long-duration somatic exploration.',
    specs: [
      '2 fl oz / 59 ml',
      'Pure silicone with organic botanical extracts',
      'Paraben-free, glycerin-free',
      'Long-lasting, non-drying formula',
      'Not safe with silicone toys',
    ],
    price: 18.01,
  },
  {
    id: 'c-16',
    slug: 'wicked-hybrid-jelle-4oz',
    category: 'lubes',
    name: 'Wicked Simply Hybrid Jelle (4 oz)',
    tagline: 'The High-Intensity Cushion.',
    material: 'Water and silicone hybrid — thick jelle formula, paraben-free',
    image: '/images/products/wicked-hybrid-jelle-4oz.webp',
    description:
      'A thick, hybrid cushion for high-intensity sessions. Bridges the gap between water-based safety and silicone endurance.',
    specs: [
      '4 fl oz / 118 ml',
      'Thick hybrid jelle formula',
      'Water-based safety with silicone endurance',
      'Paraben-free, condom-compatible',
      'Toy-safe — compatible with most materials',
    ],
    price: 18.68,
  },
  {
    id: 'c-17',
    slug: 'id-millennium-2-2oz',
    category: 'lubes',
    name: 'ID Millennium Silicone (2.2 oz)',
    tagline: 'High-Performance Barrier.',
    material: 'Pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/7315-01___1620702054.jpg',
    images: [
      '/images/products/7315-01___1620702054.jpg',
      '/images/products/7315-01a___1619728756.jpg',
    ],
    description:
      'The high-performance standard. Pure silicone that won\'t absorb or evaporate, perfect for water-based play or marathon solo work.',
    specs: [
      '2.2 fl oz / 65 ml',
      '100% pure silicone formula',
      'Non-absorbable, non-evaporating',
      'Waterproof — safe for water-based play',
      'Not safe with silicone toys',
    ],
    price: 18.39,
  },
  {
    id: 'c-18',
    slug: 'body-action-xtreme-4-8oz',
    category: 'lubes',
    name: 'Body Action Xtreme Silicone (4.8 oz)',
    tagline: 'Maximum Barrier. Zero Friction.',
    material: 'Concentrated high-viscosity silicone — heavy-duty formula',
    image: '/images/products/body-action-xtreme-4-8oz.webp',
    description:
      'Concentrated, high-viscosity silicone. A heavy-duty glide for those who need maximum barrier protection and zero friction.',
    specs: [
      '4.8 fl oz / 142 ml',
      'Concentrated high-viscosity formula',
      'Maximum barrier protection',
      'Long-lasting, non-drying',
      'Not safe with silicone toys',
    ],
    price: 36.92,
  },
  {
    id: 'c-19',
    slug: 'jo-h2o-personal-lube-8oz',
    category: 'lubes',
    name: 'Jo H2O Personal Lube (8 oz)',
    tagline: 'The Clean Slate Standard.',
    material: 'Water-based — glycerin-free, paraben-free',
    image: '/images/products/jo-h2o-personal-lube-8oz.webp',
    description:
      'The "Clean Slate" standard. Glycerin-free, paraben-free water-based glide that feels natural and rinses clean with zero residue.',
    specs: [
      '8 fl oz / 237 ml',
      'Water-based, glycerin-free, paraben-free',
      'Fully toy-safe — all materials',
      'Condom-compatible',
      'Rinses clean with no residue',
    ],
    price: 26.62,
  },
  {
    id: 'c-20',
    slug: 'intimate-earth-moonbloom-8oz',
    category: 'lubes',
    name: 'Intimate Earth Moonbloom Hybrid (8 oz)',
    tagline: 'Calming. Natural. High-Anxiety Approved.',
    material: 'Hybrid formula with Moonbloom botanical extracts — paraben-free',
    image: '/images/products/intimate-earth-moonbloom-8oz.webp',
    description:
      'A premium hybrid enriched with Moonbloom extracts. Formulated for high-anxiety clients who need a calming, natural-feeling slide.',
    specs: [
      '8 fl oz / 237 ml',
      'Hybrid formula with Moonbloom botanical extracts',
      'Paraben-free, glycerin-free',
      'Calming, natural-feeling glide',
      'Toy-safe — compatible with most materials',
    ],
    price: 32.00,
  },

  // ── Category IX: Internal Expansion — Alex's Kit ──────────────────────────
  {
    id: 'c-21',
    slug: 'belladonnas-bitch-fist',
    category: 'internal-expansion',
    name: "Belladonna's Bitch Fist",
    tagline: 'The Fisting Curriculum, Step One.',
    material: 'Body-safe Sil-A-Gel formula',
    image: '/images/products/belladonnas-bitch-fist.jpg',
    images: [
      '/images/products/belladonnas-bitch-fist.jpg',
      '/images/products/belladonnas-bitch-fist-a.jpg',
      '/images/products/belladonnas-bitch-fist-b.jpg',
    ],
    description:
      'The definitive fisting trainer. A graduated wedge shape that builds confidence and capacity through controlled, stepwise internal expansion. Molded directly from Belladonna.',
    specs: [
      '11.5" length',
      'Harness-compatible base',
      'Graduated wedge shape',
    ],
    price: 52.31,
    sku: 'DJ5079-03',
    stock: 12,
  },
  {
    id: 'c-22',
    slug: 'belladonnas-magic-hand',
    category: 'internal-expansion',
    name: "Belladonna's Magic Hand",
    tagline: 'The Hand That Teaches Presence.',
    material: 'Body-safe TPE',
    image: '/images/products/belladonnas-magic-hand.jpg',
    images: [
      '/images/products/belladonnas-magic-hand.jpg',
      '/images/products/belladonnas-magic-hand-a.jpg',
      '/images/products/belladonnas-magic-hand-b.jpg',
    ],
    description:
      'Fisting-specific geometry designed to simulate the hand shape entering the body. The knuckle-like contour and tapered wrist train the muscles for full-hand acceptance.',
    specs: [
      'Hand-configured shape',
      'Flexible wrist',
      'Suction base',
    ],
    price: 46.38,
    sku: 'DJ5079-01',
    stock: 8,
  },
  {
    id: 'c-23',
    slug: 'bvibe-fists-14-5',
    category: 'internal-expansion',
    name: 'b-Vibe Fists 14.5" Fist-Style Dildo',
    tagline: 'Full Fist Geometry, Controlled Pace.',
    material: 'Platinum-cured silicone',
    image: '/images/products/bvibe-fists-14-5.jpg',
    images: [
      '/images/products/bvibe-fists-14-5.jpg',
      '/images/products/bvibe-fists-14-5-a.jpg',
      '/images/products/bvibe-fists-14-5-b.jpg',
    ],
    description:
      'A full 14.5 inches of fist-style contour designed for deep internal mapping. Mimics the sensation of a fist opening inside the body.',
    specs: [
      '14.5" length',
      'Fist-style bulbous head',
      'Suction cup base',
    ],
    price: 47.50,
    sku: 'BV-162',
    stock: 15,
  },
  {
    id: 'c-33',
    slug: 'dick-rambone-cock',
    category: 'internal-expansion',
    name: 'Dick Rambone Cock',
    tagline: '17 Inches of Grounded Reality.',
    material: 'Phthalate-free vinyl',
    image: '/images/products/dick-rambone-cock.jpg',
    images: [
      '/images/products/dick-rambone-cock.jpg',
      '/images/products/dick-rambone-cock-a.jpg',
      '/images/products/dick-rambone-cock-b.jpg',
      '/images/products/dick-rambone-cock-c.jpg',
    ],
    description:
      'Molded from the eponymous porn star, this 17-inch monster is the definitive tool for deep internal mapping. Heavy, veined, and uncompromising.',
    specs: [
      '15.75" total length',
      '13.25" insertable',
      '2.5" diameter',
      '7.75" circumference',
    ],
    price: 73.40,
    sku: 'DJ0268-00',
    stock: 16,
  },
  {
    id: 'c-52',
    slug: 'bvibe-weighted-snug-plug-6-black',
    category: 'internal-expansion',
    name: 'b-Vibe Weighted Snug Plug 6 — 515g Black',
    tagline: '515 Grams of Presence.',
    material: 'Seamless silicone',
    image: '/images/products/bvibe-snug-plug-6-black.jpg',
    images: [
      '/images/products/bvibe-snug-plug-6-black.jpg',
      '/images/products/bvibe-snug-plug-6-black-a.jpg',
      '/images/products/bvibe-snug-plug-6-black-b.jpg',
    ],
    description:
      'The world\'s heaviest weighted butt plug. 515 grams of internal presence designed for total sensory grounding and extended wear.',
    specs: [
      '515g weight',
      '2.2" diameter',
      '6.3" insertable',
      '1cm flexible neck',
    ],
    price: 85.50,
    sku: 'BV-029BLK',
    stock: 6,
  },

  // ── Category III: Double-Outsider Supply Co. ──────────────────────────────
  {
    id: 'c-49',
    slug: 'lovense-ridge-bumpy-anal-plug',
    category: 'double-outsider',
    name: 'Lovense Ridge Bumpy Anal Plug — Black',
    tagline: 'Tech-Enabled Depth.',
    material: 'Premium Silicone',
    image: '/images/products/lovense-ridge.jpg',
    images: [
      '/images/products/lovense-ridge.jpg',
      '/images/products/lovense-ridge-a.jpg',
      '/images/products/lovense-ridge-b.jpg',
      '/images/products/lovense-ridge-c.jpg',
      '/images/products/lovense-ridge-d.jpg',
    ],
    description:
      'App-controlled rotating and vibrating anal beads. High-torque rotation meets precision vibration for local or long-distance presence.',
    specs: [
      'App-controlled',
      'IPX7 waterproof',
      'USB-C rechargeable',
      '116 RPM rotation',
    ],
    price: 139.00,
    sku: 'LOV0142',
    stock: 48,
  },
  {
    id: 'c-50',
    slug: 'double-outsider-socks-black-white',
    category: 'double-outsider',
    name: 'Double-Outsider Signature Socks — Black/White',
    tagline: 'Grounding From the Feet Up.',
    material: 'Cotton/Nylon/Spandex Blend',
    image: '/images/products/socks-black-white.jpg',
    description:
      'High-compression grounding socks. The sharp, minimalist aesthetic of the sovereignty-minded uniform.',
    specs: [
      'Crew length',
      'Arch support',
      'Cushioned sole',
      'High-compression',
    ],
    price: 24.00,
    sku: 'QP-SOCK-BW',
    stock: 50,
  },
  {
    id: 'c-51',
    slug: 'double-outsider-socks-navy-white',
    category: 'double-outsider',
    name: 'Double-Outsider Signature Socks — Navy/White',
    tagline: 'The Legacy Aesthetic.',
    material: 'Cotton/Nylon/Spandex Blend',
    image: '/images/products/socks-navy-white.jpg',
    description:
      'The original Queer Pathways classic. High-compression grounding with legacy clinical branding.',
    specs: [
      'Crew length',
      'Arch support',
      'Cushioned sole',
      'High-compression',
    ],
    price: 24.00,
    sku: 'QP-SOCK-NW',
    stock: 35,
  },

  // ── Deep Forest Green Protocol — The Loop ─────────────────────────────────
  {
    id: 'c-53',
    slug: 'loop-i-source',
    category: 'lubes',
    name: 'Loop I (Source) — Water-Based',
    tagline: 'Primary Source. Zero Friction.',
    material: 'Premium water-based formula',
    image: '/images/products/loop-i-source.jpg',
    images: ['/images/products/loop-i-source.jpg'],
    description:
      'The lightweight anchor. A high-fidelity, toy-safe water-based formula designed for daily presence and effortless cleanup. Roman Numeral I identifies the primary source of your somatic kit.',
    specs: [
      'Roman Numeral I',
      'Deep Forest Green Protocol',
      'Toy-safe',
      'Discreet shipping',
    ],
    price: 24.00,
    sku: 'LP-01-SRC',
    stock: 100,
    protocol: 'Deep Forest Green',
  },
  {
    id: 'c-54',
    slug: 'loop-ii-baseline',
    category: 'lubes',
    name: 'Loop II (Baseline) — Silicone',
    tagline: 'The Baseline of Endurance.',
    material: '100% Platinum-cured silicone',
    image: '/images/products/loop-ii-baseline.jpg',
    images: ['/images/products/loop-ii-baseline.jpg'],
    description:
      'The standard for extended presence. Our high-viscosity, platinum-cured silicone formula provides an unbreakable slick barrier for long-form exploration. Roman Numeral II marks the baseline of your arsenal.',
    specs: [
      'Roman Numeral II',
      'Deep Forest Green Protocol',
      'Waterproof',
      'Discreet shipping',
    ],
    price: 48.00,
    sku: 'LP-02-BSL',
    stock: 100,
    protocol: 'Deep Forest Green',
  },
  {
    id: 'c-55',
    slug: 'loop-iii-tension',
    category: 'lubes',
    name: 'Loop III (Tension) — Heavy Sensation',
    tagline: 'Engineered for Tension.',
    material: 'Ultra-viscous silicone blend',
    image: '/images/products/loop-iii-tension.jpg',
    images: ['/images/products/loop-iii-tension.jpg'],
    description:
      'Maximum cushion for high-tension work. A cushion-heavy, ultra-viscous silicone designed for internal expansion and fisting territory. Roman Numeral III is for when the work requires absolute structural support.',
    specs: [
      'Roman Numeral III',
      'Deep Forest Green Protocol',
      'Cushion-heavy',
      'Discreet shipping',
    ],
    price: 72.00,
    sku: 'LP-03-TNS',
    stock: 50,
    protocol: 'Deep Forest Green',
  },
  {
    id: 'c-56',
    slug: 'loop-x-composite',
    category: 'lubes',
    name: 'Loop X (Composite) — Hybrid',
    tagline: 'The Composite Protocol.',
    material: 'Water/Silicone Hybrid',
    image: '/images/products/loop-x-composite.jpg',
    images: ['/images/products/loop-x-composite.jpg'],
    description:
      'The tactical hybrid. A precision blend of water and silicone for those who demand the glide of the source with the endurance of the baseline. Roman Numeral X — the composite solution for the versatile practitioner.',
    specs: [
      'Roman Numeral X',
      'Deep Forest Green Protocol',
      'Versatile glide',
      'Discreet shipping',
    ],
    price: 120.00,
    sku: 'LP-10-CMP',
    stock: 25,
    protocol: 'Deep Forest Green',
  },
  {
    id: 'c-57',
    slug: 'cleanstream-relax-anal-lube-4oz',
    category: 'lubes',
    name: 'CleanStream Relax Desensitizing Anal Lube (4 oz)',
    tagline: 'Lower the Signal. Unlock the Work.',
    material: 'Water-based desensitizing formula',
    image: '/images/products/XRAC323.jpg',
    description:
      'Discomfort is just interference on the line. Relax uses a targeted desensitizing agent to quiet the noise at the entry point so the rest of your nervous system can stay fully online. Four ounces of water-based formula that gives you permission to go further without fighting your own architecture.',
    specs: [
      '4 fl oz / 118 ml',
      'Desensitizing water-based formula',
      'Anal-specific — designed for entry-point tension',
      'Toy-safe',
      'Easy water-based cleanup',
    ],
    price: 14.49,
    sku: 'XRAC323',
    stock: 38,
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
