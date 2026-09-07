export type CategorySlug =
  | 'black-sm'
  | 'blue-dark-anal'
  | 'blue-light-oral'
  | 'green-hustler-sugar'
  | 'grey-bondage'
  | 'red-fisting'
  | 'yellow-watersports';

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
    slug: 'black-sm',
    tag: 'Hanky: Black',
    title: 'Black',
    subtitle: 'Heavy Impact & Discipline',
    description:
      'Heavy impact gear, whips, canes, and S&M hardware engineered for intense sensation and physical discipline.',
    color: 'text-zinc-100', // Black hanky
  },
  {
    slug: 'blue-dark-anal',
    tag: 'Hanky: Dark Blue',
    title: 'Blue (Dark)',
    subtitle: 'Specialized Lubes & Deep Play',
    description:
      'Heavy-viscosity lubricants, plugs, probes, and specialized gear designed for safe anal exploration.',
    color: 'text-blue-700', // Dark Blue hanky
  },
  {
    slug: 'blue-light-oral',
    tag: 'Hanky: Light Blue',
    title: 'Blue (Light)',
    subtitle: 'Flavored Play & Enhancement',
    description:
      'Flavored lubricants, oral stimulation tools, dams, and accessories for heightened oral play.',
    color: 'text-sky-400', // Light Blue hanky
  },
  {
    slug: 'green-hustler-sugar',
    tag: 'Hanky: Green',
    title: 'Green',
    subtitle: 'Commercial & Power Dynamics',
    description:
      'Gear, hardware, and accessories curated for commercial, hustler, and sugar dynamics.',
    color: 'text-emerald-500', // Green hanky
  },
  {
    slug: 'grey-bondage',
    tag: 'Hanky: Grey',
    title: 'Grey',
    subtitle: 'Restraint & Control',
    description:
      'Cuffs, ropes, harnesses, and body restraints engineered to secure the perimeter and anchor control.',
    color: 'text-zinc-400', // Grey hanky
  },
  {
    slug: 'red-fisting',
    tag: 'Hanky: Red',
    title: 'Red',
    subtitle: 'Heavy Sensation & Dilators',
    description:
      'High-viscosity sling lubes, heavy-capacity dilators, gloves, and expansion hardware.',
    color: 'text-red-700', // Red hanky
  },
  {
    slug: 'yellow-watersports',
    tag: 'Hanky: Yellow',
    title: 'Yellow',
    subtitle: 'Waterproof & Specialty Hardware',
    description:
      'Waterproof sheets, catheters, play suits, and specialized hardware for watersports.',
    color: 'text-yellow-400', // Yellow hanky
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'ec720',
    slug: 'strict-leather-two-strap-dildo-harness',
    category: 'grey-bondage',
    name: 'The Strict Leather Two-Strap Dildo Harness',
    tagline: 'Attuned pacing. Adjustable structure. Command the room.',
    material: 'Leather, metal, and rubber',
    image: '/images/products/ec720-1.jpg',
    images: [
      '/images/products/ec720-1.jpg',
      '/images/products/ec720-2.jpg',
      '/images/products/ec720-3.jpg',
    ],
    description:
      'An adjustable two-strap leather harness built for deliberate, present play. Open-crotch design with a snap-in O-ring system and three interchangeable rubber rings (1", 1.5", and 1.75"), so the fit and the attachment can meet you where you are. Fits waists up to 44 inches. Harness only — attachments sold separately and sized to the O-ring system.',
    specs: [
      'SKU: EC720',
      'UPC: 848518001542',
      'Brand: Strict Leather / XR Brands',
      'Open-crotch two-strap soft leather front',
      'Snap-in O-ring system',
      'Three stretchy rubber O-rings: 1 inch, 1.5 inches, and 1.75 inches',
      'Adjustable side and back straps',
      'Fits waists up to 44 inches',
      'Care: wipe clean only; do not machine-wash',
      'Dildo not included',
      'Fulfillment: Sex Toy Distributing / STD Manual Portal',
      'Discreet plain-brown-box shipping',
    ],
    price: 94.95,
    sku: 'EC720',
    stock: 27,
  },
  {
    id: 'b-05',
    slug: 'h-style-flogger',
    category: 'black-sm',
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
    category: 'black-sm',
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
    category: 'black-sm',
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
    category: 'black-sm',
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
    category: 'black-sm',
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
    category: 'black-sm',
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
    category: 'black-sm',
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
    id: 'c-05',
    sku: 'KS12084',
    slug: 'kama-sutra-sex-magnet-candle',
    category: 'blue-dark-anal',
    name: 'Kama Sutra Sex Magnet Leather Candle 2 oz',
    tagline: 'Light it. Melt it. Ground it. Pheromone-infused nervous system reset.',
    material: 'Pheromone-infused body-safe massage oil wax — leather and cedar blend',
    image: '/images/products/kama-sutra-sex-magnet-candle-ks12084.jpg',
    description:
      'Light it. Melt it. Ground it. A pheromone-infused blend of leather and cedar that warms down into a body-safe massage oil. It adapts to your skin chemistry, shifting the atmosphere from high-alert performance to low-lighting intimacy. It\'s never too hot, always inviting, and deeply grounding for an exhausted nervous system.',
    specs: [
      '2 oz',
      'Leather and cedar pheromone profile',
      'Clean-melting body-safe massage oil formula',
      'Never too hot — safe for direct skin contact',
      'Custom pheromone blend adapts to skin chemistry',
    ],
    price: 24,
  },
  {
    id: 'c-11',
    sku: 'SNSL32',
    slug: 'swiss-navy-silicone-32oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone 32 oz',
    tagline: 'The Professional Standard.',
    material: 'Highest-grade pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/SwissNavySilicone32oz-snsl32.jpg',
    description:
      'Velvet-smooth, medical-grade silicone in the high-capacity 32 oz cylinder. Satiny glide that is non-absorbable and contributes to greater personal intimacy. Locking pump included.',
    specs: [
      '32 fl oz / 946.3 ml',
      'Highest-grade silicone formula',
      'Satiny smooth, non-absorbable glide',
      'Locking pump dispenser included',
      'Not safe with silicone toys',
    ],
    price: 189.99,
  },
  {
    id: 'c-13',
    sku: 'SNSL16',
    slug: 'swiss-navy-silicone-16oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone Lube 16 oz',
    tagline: 'Reliable. Slick. Unstoppable.',
    material: 'Highest-grade pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/SwissNavySilicone16oz-snsl16.jpg',
    description:
      '16 ounces of pure Swiss Navy silicone. Perfect for frequent users who need a mid-sized anchor — all the premium glide of the full line in a grab-and-go format with pump dispenser.',
    specs: [
      '16 fl oz / 473 ml',
      'Highest-grade silicone formula',
      'Satiny smooth, non-absorbable glide',
      'Pump dispenser included',
      'Not safe with silicone toys',
    ],
    price: 94.99,
  },
  {
    id: 'c-15',
    sku: 'IE04960',
    slug: 'intimate-earth-velvet-2oz',
    category: 'blue-dark-anal',
    name: 'Intimate Earth Velvet Touch Silicone Glide 2 oz',
    tagline: 'Silk-Smooth Presence.',
    material: 'Pure silicone enriched with organic extracts — paraben-free, glycerin-free',
    image: '/images/products/intimate-earth-velvet-2oz-ie04960.jpg',
    description:
      'A silk-smooth silicone glide enriched with organic extracts. Designed for skin-to-skin presence and long-duration somatic exploration.',
    specs: [
      '2 fl oz / 59 ml',
      'Pure silicone with organic botanical extracts',
      'Paraben-free, glycerin-free',
      'Long-lasting, non-drying formula',
      'Not safe with silicone toys',
    ],
    price: 20.99,
  },
  {
    id: 'c-16',
    sku: 'WIC91205',
    slug: 'wicked-hybrid-jelle-4oz',
    category: 'blue-dark-anal',
    name: 'Wicked Simply Hybrid Jelle 4 oz',
    tagline: 'The High-Intensity Cushion.',
    material: 'Water and silicone hybrid — thick jelle formula, paraben-free',
    image: '/images/products/wicked-hybrid-jelle-4oz-wic91205.jpg',
    description:
      'A thick, hybrid cushion for high-intensity sessions. Bridges the gap between water-based safety and silicone endurance.',
    specs: [
      '4 fl oz / 118 ml',
      'Thick hybrid jelle formula',
      'Water-based safety with silicone endurance',
      'Paraben-free, condom-compatible',
      'Toy-safe — compatible with most materials',
    ],
    price: 21.99,
  },
  {
    id: 'c-17',
    sku: 'IDMLL02',
    slug: 'id-millennium-2-2oz',
    category: 'blue-dark-anal',
    name: 'ID Millennium 2.2 oz',
    tagline: 'High-Performance Barrier.',
    material: 'Pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/id-millennium-2-2oz-idmll02.jpg',
    description:
      'The high-performance standard. Pure silicone that won\'t absorb or evaporate, perfect for water-based play or marathon solo work.',
    specs: [
      '2.2 fl oz / 65 ml',
      '100% pure silicone formula',
      'Non-absorbable, non-evaporating',
      'Waterproof — safe for water-based play',
      'Not safe with silicone toys',
    ],
    price: 21.99,
  },
  {
    id: 'c-18',
    sku: 'BA012',
    slug: 'body-action-xtreme-4-8oz',
    category: 'blue-dark-anal',
    name: 'Body Action Xtreme 4.8 oz',
    tagline: 'Maximum Barrier. Zero Friction.',
    material: 'Concentrated high-viscosity silicone — heavy-duty formula',
    image: '/images/products/body-action-xtreme-4-8oz-ba012.jpg',
    description:
      'Concentrated, high-viscosity silicone. A heavy-duty glide for those who need maximum barrier protection and zero friction.',
    specs: [
      '4.8 fl oz / 142 ml',
      'Concentrated high-viscosity formula',
      'Maximum barrier protection',
      'Long-lasting, non-drying',
      'Not safe with silicone toys',
    ],
    price: 42.99,
  },
  {
    id: 'c-19',
    sku: 'JO40036',
    slug: 'jo-h2o-personal-lube-8oz',
    category: 'blue-dark-anal',
    name: 'JO H2O Personal Lube 8 oz',
    tagline: 'The Clean Slate Standard.',
    material: 'Water-based — glycerin-free, paraben-free',
    image: '/images/products/jo-h2o-personal-lube-8oz-jo40036.jpg',
    description:
      'The "Clean Slate" standard. Glycerin-free, paraben-free water-based glide that feels natural and rinses clean with zero residue.',
    specs: [
      '8 fl oz / 237 ml',
      'Water-based, glycerin-free, paraben-free',
      'Fully toy-safe — all materials',
      'Condom-compatible',
      'Rinses clean with no residue',
    ],
    price: 30.99,
  },
  {
    id: 'c-20',
    sku: 'IE060240',
    slug: 'intimate-earth-moonbloom-8oz',
    category: 'blue-dark-anal',
    name: 'Intimate Earth Moonbloom Hybrid 8 oz',
    tagline: 'Calming. Natural. High-Anxiety Approved.',
    material: 'Hybrid formula with Moonbloom botanical extracts — paraben-free',
    image: '/images/products/intimate-earth-moonbloom-8oz-ie060240.jpg',
    description:
      'A premium hybrid enriched with Moonbloom extracts. Formulated for high-anxiety clients who need a calming, natural-feeling slide.',
    specs: [
      '8 fl oz / 240 ml',
      'Hybrid formula with Moonbloom botanical extracts',
      'Paraben-free, glycerin-free',
      'Calming, natural-feeling glide',
      'Toy-safe — compatible with most materials',
    ],
    price: 34.99,
  },

  // ── Category IX: Internal Expansion — Alex's Kit ──────────────────────────
  {
    id: 'c-21',
    slug: 'belladonnas-bitch-fist',
    category: 'blue-dark-anal',
    name: "Belladonna's Bitch Fist",
    tagline: 'The Fisting Curriculum, Step One.',
    material: 'Body-safe Sil-A-Gel formula',
    image: '/images/products/DJ5079-03.jpg',
    images: [
      '/images/products/DJ5079-03.jpg',
      '/images/products/DJ5079-03a.jpg',
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
    id: 'c-23',
    slug: 'bvibe-fists-14-5',
    category: 'blue-dark-anal',
    name: 'b-Vibe Fists 14.5" Fist-Style Dildo',
    tagline: 'Full Fist Geometry, Controlled Pace.',
    material: 'Platinum-cured silicone',
    image: '/images/products/BV-162.jpg',
    images: [
      '/images/products/BV-162.jpg',
      '/images/products/BV-162a.jpg',
      '/images/products/BV-162b.jpg',
      '/images/products/BV-162c.jpg',
      '/images/products/BV-162d.jpg',
      '/images/products/BV-162e.jpg',
      '/images/products/BV-162f.jpg',
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
    category: 'blue-dark-anal',
    name: 'Dick Rambone Cock',
    tagline: '17 Inches of Grounded Reality.',
    material: 'Phthalate-free vinyl',
    image: '/images/products/DJ0268-00___1712379784.jpg',
    images: [
      '/images/products/DJ0268-00___1712379784.jpg',
      '/images/products/DJ0268-00a.jpg',
      '/images/products/DJ0268-00b.jpg',
      '/images/products/DJ0268-00c.jpg',
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
    category: 'blue-dark-anal',
    name: 'b-Vibe Weighted Snug Plug 6 — 515g Black',
    tagline: '515 Grams of Presence.',
    material: 'Seamless silicone',
    image: '/images/products/BV-029BLK.jpg',
    images: [
      '/images/products/BV-029BLK.jpg',
      '/images/products/BV-029BLKb___1617332410.jpg',
      '/images/products/BV-029BLKc___1617332415.jpg',
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
    category: 'grey-bondage',
    name: 'Lovense Ridge Bumpy Anal Plug — Black',
    tagline: 'Tech-Enabled Depth.',
    material: 'Premium Silicone',
    image: '/images/products/LOV0142___1694754140.jpg',
    images: [
      '/images/products/LOV0142___1694754140.jpg',
      '/images/products/LOV0142a___1694754142.jpg',
      '/images/products/LOV0142b___1694754144.jpg',
      '/images/products/LOV0142c___1694754147.jpg',
      '/images/products/LOV0142d___1694754150.jpg',
      '/images/products/LOV0142e___1741410074.jpg',
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
    id: 'c-58',
    slug: 'swiss-navy-silicone-lube-1-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone Lube 1 oz',
    tagline: 'Compact bottle. Silky silicone glide.',
    material: 'Silicone-based lubricant',
    image: '/images/products/SNSL1-swiss-navy-silicone-lube-1oz.jpg',
    description:
      'A silky silicone formula in a compact 1 fl oz bottle, sized for travel or a bedside kit.',
    specs: [
      '1 fl oz',
      'Silicone-based formula',
      'SKU: SNSL1',
      'UPC: 699439004149',
    ],
    price: 12.99,
    sku: 'SNSL1',
    stock: 134,
  },
  {
    id: 'c-59',
    slug: 'swiss-navy-silicone-lube-4-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone Lube 4 oz',
    tagline: 'Everyday size. Smooth silicone glide.',
    material: 'Silicone-based lubricant',
    image: '/images/products/SNSL4-swiss-navy-silicone-lube-4oz.jpg',
    description:
      'A smooth silicone formula with a low-drag feel in a practical 4 fl oz bottle.',
    specs: [
      '4 fl oz',
      'Silicone-based formula',
      'SKU: SNSL4',
      'UPC: 699439009021',
    ],
    price: 34.99,
    sku: 'SNSL4',
    stock: 23,
  },
  {
    id: 'c-60',
    slug: 'swiss-navy-silicone-lube-8-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone Lube 8 oz',
    tagline: 'More volume. Silky silicone glide.',
    material: 'Silicone-based lubricant',
    image: '/images/products/SNSL8-swiss-navy-silicone-lube-8oz.jpg',
    description:
      'A silky silicone formula with an easy-flowing feel in an 8 fl oz bottle.',
    specs: [
      '8 fl oz',
      'Silicone-based formula',
      'SKU: SNSL8',
      'UPC: 699439009038',
    ],
    price: 54.99,
    sku: 'SNSL8',
    stock: 101,
  },
  {
    id: 'c-61',
    slug: 'swiss-navy-water-based-lube-2-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Water Based Lube 2 oz',
    tagline: 'Compact bottle. Light water-based glide.',
    material: 'Water-based lubricant',
    image: '/images/products/SNWL2-swiss-navy-water-based-lube-2oz.jpg',
    description:
      'A smooth water-based formula in a compact 2 fl oz bottle for a light, straightforward glide.',
    specs: [
      '2 fl oz',
      'Water-based formula',
      'SKU: SNWL2',
      'UPC: 699439009106',
    ],
    price: 12.99,
    sku: 'SNWL2',
    stock: 471,
  },
  {
    id: 'c-62',
    slug: 'swiss-navy-water-based-lube-4-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Water Based Lube 4 oz',
    tagline: 'Smooth glide in a versatile 4 oz size.',
    material: 'Water-based lubricant',
    image: '/images/products/SNWL4-swiss-navy-water-based-lube-4oz.jpg',
    description:
      'A smooth water-based formula with a light feel in a versatile 4 fl oz bottle.',
    specs: [
      '4 fl oz',
      'Water-based formula',
      'SKU: SNWL4',
      'UPC: 699439009113',
    ],
    price: 19.99,
    sku: 'SNWL4',
    stock: 279,
  },
  {
    id: 'c-63',
    slug: 'swiss-navy-water-based-lube-8-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Water Based Lube 8 oz',
    tagline: 'Light feel. More water-based glide on hand.',
    material: 'Water-based lubricant',
    image: '/images/products/SNWL8-swiss-navy-water-based-lube-8oz.jpg',
    description:
      'A light, smooth water-based formula in an 8 fl oz bottle for a larger ready-to-use supply.',
    specs: [
      '8 fl oz',
      'Water-based formula',
      'SKU: SNWL8',
      'UPC: 699439009120',
    ],
    price: 27.99,
    sku: 'SNWL8',
    stock: 154,
  },
  {
    id: 'c-64',
    slug: 'swiss-navy-water-based-lube-16-oz',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Water Based Lube 16 oz',
    tagline: 'Smooth water-based glide in a generous size.',
    material: 'Water-based lubricant',
    image: '/images/products/SNWL16-swiss-navy-water-based-lube-16oz.jpg',
    description:
      'A smooth water-based formula in a generous 16 fl oz bottle for keeping more glide within reach.',
    specs: [
      '16 fl oz',
      'Water-based formula',
      'SKU: SNWL16',
      'UPC: 699439009137',
    ],
    price: 44.99,
    sku: 'SNWL16',
    stock: 27,
  },
  {
    id: 'c-65',
    slug: 'swiss-navy-silicone-based-lube-1-gal',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Silicone Based Lube 1 Gal',
    tagline: 'Silky silicone glide in a full-gallon format.',
    material: 'Silicone-based lubricant',
    image: '/images/products/SNSL1G-swiss-navy-silicone-based-lube-1gal.jpeg',
    description:
      'A smooth silicone-based formula in a 1 gal jug for keeping a high-volume supply on hand.',
    specs: [
      '1 gal',
      'Silicone-based formula',
      'SKU: SNSL1G',
      'UPC: 699439004231',
    ],
    price: 399.99,
    sku: 'SNSL1G',
    stock: 14,
  },
  {
    id: 'c-66',
    slug: 'swiss-navy-water-based-lube-1-gal',
    category: 'blue-dark-anal',
    name: 'Swiss Navy Water Based Lube 1 Gal',
    tagline: 'Smooth water-based glide in a full-gallon format.',
    material: 'Water-based lubricant',
    image: '/images/products/SNWB1G-swiss-navy-water-based-lube-1gal.jpeg',
    description:
      'A smooth water-based formula in a 1 gal jug for keeping a high-volume supply on hand.',
    specs: [
      '1 gal',
      'Water-based formula',
      'SKU: SNWB1G',
      'UPC: 699439004224',
    ],
    price: 209.99,
    sku: 'SNWB1G',
    stock: 8,
  },
  {
    id: 'c-67',
    slug: 'id-glide-1oz',
    category: 'blue-dark-anal',
    name: 'Id Glide 1 oz',
    tagline: 'Travel-size natural-feel glide.',
    material: 'Water-based lubricant — natural feel formula',
    image: '/images/products/IDGLD01-id-glide-1oz.jpg',
    description:
      'A pocket-size bottle with a smooth, natural-feel glide for on-the-go play.',
    specs: [
      '1 fl oz / 30 ml',
      'Water-based formula',
      'Flip-cap travel bottle',
      'SKU: IDGLD01',
      'UPC: 761236900525',
    ],
    price: 8.99,
    sku: 'IDGLD01',
    stock: 196,
  },
  {
    id: 'c-68',
    slug: 'id-glide-2-2oz',
    category: 'blue-dark-anal',
    name: 'Id Glide 2.2 oz',
    tagline: 'Everyday natural-feel glide.',
    material: 'Water-based lubricant — natural feel formula',
    image: '/images/products/IDGLD02-id-glide-2-2oz.jpeg',
    description:
      'A nightstand-size bottle with a smooth, natural-feel glide for everyday play.',
    specs: [
      '2.2 fl oz / 65 ml',
      'Water-based formula',
      'Flip-cap bottle',
      'SKU: IDGLD02',
      'UPC: 761236900532',
    ],
    price: 13.99,
    sku: 'IDGLD02',
    stock: 292,
  },
  {
    id: 'c-69',
    slug: 'id-glide-4-4oz',
    category: 'blue-dark-anal',
    name: 'Id Glide 4.4 oz',
    tagline: 'Double the glide, same smooth feel.',
    material: 'Water-based lubricant — natural feel formula',
    image: '/images/products/IDGLD04-id-glide-4-4oz.jpeg',
    description:
      'A larger flip-cap bottle of the natural-feel water-based glide, sized for longer sessions without reaching for a refill.',
    specs: [
      '4.4 fl oz / 130 ml',
      'Water-based formula',
      'Flip-cap bottle',
      'SKU: IDGLD04',
      'UPC: 761236900549',
    ],
    price: 18.99,
    sku: 'IDGLD04',
    stock: 191,
  },
  {
    id: 'c-70',
    slug: 'id-glide-8-5oz',
    category: 'blue-dark-anal',
    name: 'Id Glide 8.5 oz',
    tagline: 'Bedside-size natural-feel glide.',
    material: 'Water-based lubricant — natural feel formula',
    image: '/images/products/IDGLD08-id-glide-8-5oz.jpeg',
    description:
      'A bedside-size flip-cap bottle of the natural-feel water-based glide, for couples or solo sessions that want it on hand without running out.',
    specs: [
      '8.5 fl oz / 250 ml',
      'Water-based formula',
      'Flip-cap bottle',
      'SKU: IDGLD08',
      'UPC: 761236900556',
    ],
    price: 27.99,
    sku: 'IDGLD08',
    stock: 87,
  },
  {
    id: 'c-71',
    slug: 'id-glide-17oz',
    category: 'blue-dark-anal',
    name: 'Id Glide 17 oz',
    tagline: 'The full-size natural-feel glide.',
    material: 'Water-based lubricant — natural feel formula',
    image: '/images/products/IDGLD17-id-glide-17oz.jpg',
    description:
      'The largest bottle in the natural-feel glide lineup — smooth, water-based, and built for high-volume use.',
    specs: [
      '17 fl oz / 500 ml',
      'Water-based formula',
      'Flip-cap bottle',
      'SKU: IDGLD17',
      'UPC: 761236900723',
    ],
    price: 46.99,
    sku: 'IDGLD17',
    stock: 78,
  },
  {
    id: 'c-72',
    slug: 'id-pleasure-2-2oz',
    category: 'blue-dark-anal',
    name: 'Id Pleasure Tingling 2.2 oz',
    tagline: 'Tingling glide with a little extra buzz.',
    material: 'Water-based lubricant — tingling sensation formula',
    image: '/images/products/IDPLS02-id-pleasure-2-2oz.jpeg',
    description:
      'The same smooth glide as our natural-feel formula, with a light tingling sensation for extra sensory feedback during play.',
    specs: [
      '2.2 fl oz / 65 ml',
      'Water-based, tingling-sensation formula',
      'Flip-cap bottle',
      'SKU: IDPLS02',
      'UPC: 761236900570',
    ],
    price: 14.99,
    sku: 'IDPLS02',
    stock: 220,
  },
  {
    id: 'c-73',
    slug: 'id-millennium-8-5oz',
    category: 'blue-dark-anal',
    name: 'Id Millennium 8.5 oz',
    tagline: 'Limited stock — premium pure-silicone glide, bulk format.',
    material: 'Pure silicone — non-absorbable, fragrance-free',
    image: '/images/products/IDMLL08-id-millennium-8-5oz.jpeg',
    description:
      'Limited availability with only two in stock. This premium test size offers a silky, long-lasting glide for extended play.',
    specs: [
      '8.5 fl oz / 250 ml',
      '100% pure silicone formula',
      'Not safe with silicone toys',
      'Low stock — premium test run, while supplies last',
      'SKU: IDMLL08',
      'UPC: 761236900631',
    ],
    price: 54.99,
    sku: 'IDMLL08',
    stock: 2,
  },
  {
    id: 'c-74',
    slug: 'sex-grease-silicone-8-5oz',
    category: 'blue-dark-anal',
    name: 'Sex Grease Silicone 8.5 oz',
    tagline: 'Concentrated silicone glide, zero friction.',
    material: 'Pure silicone — concentrated formula',
    image: '/images/products/IDDGSB08C2-sex-grease-silicone-8-5oz.jpg',
    description:
      'A concentrated silicone glide with a silky feel designed to stay slick through long sessions.',
    specs: [
      '8.5 fl oz / 250 ml',
      '100% silicone formula',
      'Long-lasting glide',
      'Not safe with silicone toys',
      'SKU: IDDGSB08C2',
      'UPC: 761236903311',
    ],
    price: 45.99,
    sku: 'IDDGSB08C2',
    stock: 21,
  },
  {
    id: 'c-75',
    slug: 'astroglide-2-0-water-1-2oz',
    category: 'blue-dark-anal',
    name: 'Astroglide 2.0 Water 1.2 oz',
    tagline: 'Compact size. Cushioned water-based glide.',
    material: 'Water-based lubricant — gel formula',
    image: '/images/products/AG71607-astroglide-2-0-water-1-2oz.jpg',
    description:
      'A compact tube of water-based gel with a plush, stay-put feel and a smooth glide that rinses away with water.',
    specs: [
      '1.2 fl oz',
      'Water-based gel formula',
      'SKU: AG71607',
      'UPC: 015594011486',
    ],
    price: 11.99,
    sku: 'AG71607',
    stock: 233,
  },
  {
    id: 'c-76',
    slug: 'astroglide-glycerin-free-2-5oz',
    category: 'blue-dark-anal',
    name: 'Astroglide Glycerin Free 2.5 oz',
    tagline: 'Smooth water-based glide without glycerin.',
    material: 'Water-based lubricant — glycerin-free formula',
    image: '/images/products/AG71605-astroglide-glycerin-free-2-5oz.jpg',
    description:
      'A light, smooth water-based formula with an easy glide and a clean, non-sticky finish.',
    specs: [
      '2.5 fl oz',
      'Water-based, glycerin-free formula',
      'SKU: AG71605',
      'UPC: 015594010632',
    ],
    price: 20.99,
    sku: 'AG71605',
    stock: 18,
  },
  {
    id: 'c-77',
    slug: 'astroglide-strawberry-2-5oz',
    category: 'blue-dark-anal',
    name: 'Astroglide Strawberry 2.5 oz',
    tagline: 'Sweet strawberry flavor. Silky water-based glide.',
    material: 'Water-based lubricant — strawberry flavored',
    image: '/images/products/AG71604-astroglide-strawberry-2-5oz.jpg',
    description:
      'A strawberry-flavored water-based formula with a sweet aroma and a silky, smooth glide in a compact bottle.',
    specs: [
      '2.5 fl oz',
      'Water-based, strawberry-flavored formula',
      'SKU: AG71604',
      'UPC: 015594010540',
    ],
    price: 18.99,
    sku: 'AG71604',
    stock: 9,
  },
  {
    id: 'c-78',
    slug: 'astroglide-strawberry-8-5oz',
    category: 'blue-dark-anal',
    name: 'Astroglide Strawberry 8.5 oz',
    tagline: 'Sweet strawberry flavor in a generous size.',
    material: 'Water-based lubricant — strawberry flavored',
    image: '/images/products/AG101519-astroglide-strawberry-8-5oz.jpg',
    description:
      'A larger bottle of strawberry-flavored water-based formula with a sweet aroma and a silky glide.',
    specs: [
      '8.5 fl oz',
      'Water-based, strawberry-flavored formula',
      'SKU: AG101519',
      'UPC: 015594000015',
    ],
    price: 27.99,
    sku: 'AG101519',
    stock: 18,
  },
  {
    id: 'c-79',
    slug: 'astroglide-silicone-2-5oz',
    category: 'blue-dark-anal',
    name: 'Astroglide Silicone 2.5 oz',
    tagline: 'Silky silicone glide with a smooth finish.',
    material: 'Silicone-based lubricant',
    image: '/images/products/AG81600-astroglide-silicone-2-5oz.jpg',
    description:
      'A silicone-based formula with a silky, easy-flowing feel and a smooth glide that stays slick through longer sessions.',
    specs: [
      '2.5 fl oz',
      'Silicone-based formula',
      'SKU: AG81600',
      'UPC: 015594010861',
    ],
    price: 29.99,
    sku: 'AG81600',
    stock: 7,
  },
  {
    id: 'c-80',
    slug: 'astroglide-get-flirty-wipes-20-ct',
    category: 'yellow-watersports',
    name: 'Astroglide Get Flirty Wipes 20 ct',
    tagline: 'Quick cleanup for a fresh reset.',
    material: 'Pre-moistened cleanup wipes — 20-count pack',
    image: '/images/products/AG101913-astroglide-get-flirty-wipes-20ct.jpg',
    description:
      'Pre-moistened disposable wipes for quick, mess-free cleanup of common residue from skin and toys, leaving the scene fresh and ready.',
    specs: [
      '20 pre-moistened wipes',
      'No-rinse cleanup format',
      'Disposable — do not flush',
      'SKU: AG101913',
      'UPC: 015594000169',
    ],
    price: 13.99,
    sku: 'AG101913',
    stock: 43,
  },
  {
    id: 'c-81',
    slug: 'king-cock-6-inch-uncut-light',
    category: 'blue-dark-anal',
    name: 'King Cock 6 Inch Uncut Light',
    tagline: 'The First Rung. Lifelike detail for a measured beginning.',
    material: 'PVC',
    image: '/images/products/PD556021-king-cock-6-inch-uncut-light.jpg',
    images: [
      '/images/products/PD556021-king-cock-6-inch-uncut-light.jpg',
      '/images/products/PD556021-king-cock-6-inch-uncut-light-2.jpg',
      '/images/products/PD556021-king-cock-6-inch-uncut-light-3.jpg',
      '/images/products/PD556021-king-cock-6-inch-uncut-light-4.jpg',
    ],
    description:
      'The First Rung of the Jasper collection brings a six-inch profile, dual-density Slide Skin, and retractable foreskin detail to a measured starting point with a lifelike, contained feel. It is supplier-verified as compatible with the Strict Leather Two-Strap Dildo Harness O-ring system.',
    specs: [
      '6.5-inch total length',
      '6-inch insertable length',
      '1.5-inch width',
      '4.75-inch girth',
      'Suction-cup base',
      'SKU: PD556021',
      'UPC: 603912750775',
    ],
    price: 53.99,
    sku: 'PD556021',
    stock: 12,
  },
  {
    id: 'c-82',
    slug: 'king-cock-8-inch-with-balls-brown',
    category: 'blue-dark-anal',
    name: 'King Cock 8 Inch with Balls Brown',
    tagline: 'The Workhorse Rung. Grounded weight with deliberate presence.',
    material: 'PVC',
    image: '/images/products/PD550729-king-cock-8-inch-with-balls-brown.jpg',
    images: [
      '/images/products/PD550729-king-cock-8-inch-with-balls-brown.jpg',
      '/images/products/PD550729-king-cock-8-inch-with-balls-brown-2.jpg',
      '/images/products/PD550729-king-cock-8-inch-with-balls-brown-3.jpg',
      '/images/products/PD550729-king-cock-8-inch-with-balls-brown-4.jpg',
    ],
    description:
      'The Workhorse Rung of the Jasper collection adds the visual weight and grounded presence of an eight-inch profile with attached balls for a bold next step in the progression. It is supplier-verified as compatible with the Strict Leather Two-Strap Dildo Harness O-ring system.',
    specs: [
      '8.5-inch total length',
      '5.75-inch insertable length',
      '2-inch width',
      '6.25-inch girth',
      'Suction-cup base',
      'SKU: PD550729',
      'UPC: 603912350241',
    ],
    price: 45.99,
    sku: 'PD550729',
    stock: 20,
  },
  {
    id: 'c-83',
    slug: 'king-cock-9-inch-cock',
    category: 'blue-dark-anal',
    name: 'King Cock 9 Inch Cock',
    tagline: 'The Command Rung. Added reach with steady intention.',
    material: 'PVC',
    image: '/images/products/PD5504-21-king-cock-9-inch-cock.jpg',
    images: [
      '/images/products/PD5504-21-king-cock-9-inch-cock.jpg',
      '/images/products/PD5504-21-king-cock-9-inch-cock-2.jpg',
      '/images/products/PD5504-21-king-cock-9-inch-cock-3.jpg',
      '/images/products/PD5504-21-king-cock-9-inch-cock-4.jpg',
    ],
    description:
      'The Command Rung of the Jasper collection extends the progression with a longer nine-inch profile and added reach for a wearer choosing more projection at a steady pace. It is supplier-verified as compatible with the Strict Leather Two-Strap Dildo Harness O-ring system.',
    specs: [
      '9-inch total length',
      '8.25-inch insertable length',
      '2-inch width',
      '6.5-inch girth',
      'Suction-cup base',
      'SKU: PD5504-21',
      'UPC: 603912349979',
    ],
    price: 48.99,
    sku: 'PD5504-21',
    stock: 23,
  },
  {
    id: 'c-84',
    slug: 'king-cock-14-inch-with-balls-brown',
    category: 'blue-dark-anal',
    name: 'King Cock 14 Inch with Balls Brown',
    tagline: 'The Monster Rung. Maximum presence, approached with patience.',
    material: 'PVC',
    image: '/images/products/PD553429-king-cock-14-inch-with-balls-brown.jpg',
    images: [
      '/images/products/PD553429-king-cock-14-inch-with-balls-brown.jpg',
      '/images/products/PD553429-king-cock-14-inch-with-balls-brown-2.jpg',
      '/images/products/PD553429-king-cock-14-inch-with-balls-brown-3.jpg',
      '/images/products/PD553429-king-cock-14-inch-with-balls-brown-4.jpg',
      '/images/products/PD553429-king-cock-14-inch-with-balls-brown-5.jpg',
    ],
    description:
      'The Monster Rung of the Jasper collection marks the far end of the progression with a fourteen-inch profile, attached balls, and unmistakable presence for experienced users choosing patience and preparation. It is supplier-verified as compatible with the Strict Leather Two-Strap Dildo Harness O-ring system.',
    specs: [
      '14.75-inch total length',
      '12-inch insertable length',
      '2.5-inch width',
      '7.5-inch circumference',
      'Suction-cup base',
      'SKU: PD553429',
      'UPC: 603912746679',
    ],
    price: 96.99,
    sku: 'PD553429',
    stock: 9,
  },
];

// ─────────────────────────────────────────────────────────────────────────
// SHELVED PRODUCTS — NOT PUBLIC
//
// These records are intentionally withheld from the public `PRODUCTS`
// catalog above and are NOT rendered on the storefront, included in
// `getProductsByCategory`/`getProductBySlug` lookups, sitemap generation,
// or `scripts/validateCatalog.ts` (which only scans `PRODUCTS`).
//
// Full product data, image references, and specs are preserved verbatim
// here — untouched — for provenance/history. Nothing was deleted: no
// image files, no SKU registry entries. Do not merge these into
// `PRODUCTS` without re-running `npm run validate:catalog`.
//
// Shelved 2026-09-05: b-12, b-13, b-14 priced above the $224 storefront
// ceiling (Big Ticket / dungeon furniture + machines); b-15 likewise
// above the ceiling; c-09 and c-14 were bulk-gallon lube SKUs priced
// above the ceiling as well.
// ─────────────────────────────────────────────────────────────────────────
export const SHELVED_PRODUCTS: Product[] = [
  {
    id: 'b-12',
    slug: 'king-size-dungeon-bed-canopy',
    category: 'black-sm',
    name: 'King Size Dungeon Bed w/ Suspension Canopy',
    tagline: 'Structural sovereignty. The ultimate anchor for the Harbor.',
    material: 'Industrial-grade powder-coated steel / reinforced slats',
    image: '/images/products/king-size-dungeon-bed.jpg',
    description:
      'The ultimate structural anchor for the Sovereign Harbor. This King Size steel frame features an integrated suspension canopy and reinforced slats designed for zero-deflection play. It is not a bed; it is a modular laboratory for testing the limits of authority and surrender. Matte black finish, industrial-grade hardware, and infinite anchor points for total containment and somatic reset.',
    specs: [
      'SKU: AJ098',
      'Integrated suspension canopy with 8 anchor points',
      'Heavy-duty steel construction (94 lbs)',
      'Reinforced slats for zero-deflection play',
      'Matte black industrial finish',
    ],
    price: 5995,
  },
  {
    id: 'b-13',
    slug: 'ultimate-obedience-chair-sex-machine',
    category: 'black-sm',
    name: 'Ultimate Obedience Chair with Sex Machine',
    tagline: 'Mechanical precision. Cognitive off-ramp.',
    material: 'Steel frame / vegan leather padding / 110V motor',
    image: '/images/products/ultimate-obedience-chair.jpg',
    description:
      'Cognitive off-ramp through mechanical precision. This integrated station pairs a heavy-duty restraint chair with a 110V sex machine, creating a closed-loop environment where the only task is presence. Designed for submissive tie-down and systematic penetration, it eliminates the noise of the outside world and forces a complete nervous system reset via mechanical authority.',
    specs: [
      'SKU: AH155',
      'Integrated 110V sex machine with variable speed',
      '4-point restraint system included',
      'Adjustable seat and headrest height',
      'Wipe-clean vegan leather upholstery',
    ],
    price: 1969.95,
  },
  {
    id: 'b-14',
    slug: 'obedience-bench-sex-machine',
    category: 'black-sm',
    name: 'Obedience Bench with Sex Machine',
    tagline: 'High-capacity utility. Adjourn the trial.',
    material: 'Reinforced steel / high-density foam / 110V motor',
    image: '/images/products/obedience-bench.jpg',
    description:
      'Dungeon-grade utility. A reinforced bondage bench equipped with an integrated sex machine and modular restraint points. Built for the practitioner who requires stable, heavy-duty hardware to manage mechanical tension and sensory overload. All black, all business, and engineered for high-capacity endurance during extended somatic work.',
    specs: [
      'SKU: AH298',
      'Integrated heavy-duty sex machine',
      'Multiple modular D-ring anchor points',
      'High-density foam padding for extended play',
      'All-black industrial aesthetic',
    ],
    price: 1749.28,
  },
  {
    id: 'b-15',
    slug: 'milker-automatic-deluxe-stroker',
    category: 'black-sm',
    name: 'The Milker Automatic Deluxe Stroker Machine',
    tagline: 'Pneumatic authority. 110V pneumatic pump architecture.',
    material: 'Industrial-grade plastic / pneumatic pump / 110V',
    image: '/images/products/milker-deluxe-stroker.jpg',
    images: [
      '/images/products/milker-deluxe-stroker.jpg',
      '/images/products/milker-deluxe-stroker-b.jpg',
      '/images/products/milker-deluxe-stroker-c.jpg',
      '/images/products/milker-deluxe-stroker-d.jpg',
      '/images/products/milker-deluxe-stroker-e.jpg',
      '/images/products/milker-deluxe-stroker-box.jpg',
    ],
    description:
      'Pneumatic authority for the North American practitioner. This is the Deluxe Milker — a high-capacity, 110V automatic stroker machine built around a dual-cylinder pneumatic pump system. Designed for extended somatic training and radical surrender, it delivers a relentless, systematic rhythm that bypasses executive overthinking and forces a total physiological reset. Includes a lockable travel case for secure, sovereign storage.',
    specs: [
      'SKU: AE371',
      'Industrial-grade pneumatic pump system',
      'Dual-cylinder architecture',
      '110V only (US/Canada voltage)',
      'Includes lockable travel case',
    ],
    price: 1569.95,
  },
  {
    id: 'c-09',
    slug: 'wet-platinum-gallon',
    category: 'blue-dark-anal',
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
    id: 'c-14',
    slug: 'swiss-navy-silicone-gallon',
    category: 'blue-dark-anal',
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
    id: 'c-06',
    slug: 'wet-platinum-3oz',
    category: 'blue-dark-anal',
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
    id: 'c-03',
    slug: 'spunk-lube-pure-silicone',
    category: 'blue-dark-anal',
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
    category: 'blue-dark-anal',
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
    id: 'c-07',
    slug: 'wet-gold-hybrid-3oz',
    category: 'blue-dark-anal',
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
    category: 'blue-dark-anal',
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
    id: 'c-10',
    slug: 'wet-original-gallon',
    category: 'blue-dark-anal',
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
    id: 'c-57',
    slug: 'cleanstream-relax-anal-lube-4oz',
    category: 'blue-dark-anal',
    name: 'CleanStream Relax Anal Lube 4 oz',
    tagline: 'Lower the Signal. Unlock the Work.',
    material: 'Water-based desensitizing formula',
    image: '/images/products/XRAC323-01.jpg',
    images: [
      '/images/products/XRAC323-01.jpg',
      '/images/products/XRAC323-02.jpg',
      '/images/products/XRAC323-03.jpg',
      '/images/products/XRAC323-04.jpg',
      '/images/products/XRAC323-05.jpg',
    ],
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
    stock: 0,
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
