import Link from 'next/link';
import type { Metadata } from 'next';
import { CATEGORIES, PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Shop — Queer Pathways',
  description: 'High-fidelity kink infrastructure across four categories: somatic scaffolding, material discipline, the frictionless suite, and metabolic recovery.',
  robots: { index: false, follow: false },
};

export default function ShopPage() {
  return (
    <div className="flex flex-col">

      {/* Page header */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 max-w-xl">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Full Catalog ]
          </p>
          <h1 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
            The Shop
          </h1>
          <p className="text-sm font-mono text-zinc-500 leading-7 mt-2">
            {PRODUCTS.length} products across {CATEGORIES.length} categories. Organized by
            structural, load-bearing, or metabolic function.
          </p>
        </div>
      </div>

      {/* Category jump nav */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 sticky top-14 z-30">
        <div className="mx-auto max-w-7xl flex items-center gap-6 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(({ slug, tag, title }) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="flex items-center gap-2 shrink-0 group"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors">
                {tag}
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-400 group-hover:text-white transition-colors">
                {title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="mx-auto w-full max-w-7xl px-6">
        {CATEGORIES.map((cat) => {
          const products = PRODUCTS.filter((p) => p.category === cat.slug);
          return (
            <section
              key={cat.slug}
              id={cat.slug}
              className="py-20 border-b border-zinc-800 last:border-b-0 scroll-mt-28"
            >
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div className="flex flex-col gap-2">
                  <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
                    {cat.tag} — {cat.subtitle}
                  </p>
                  <h2 className={`text-3xl font-black tracking-tight uppercase ${cat.color}`}>
                    {cat.title}
                  </h2>
                  <p className="text-sm font-mono text-zinc-500 leading-7 max-w-lg mt-1">
                    {cat.description}
                  </p>
                </div>
                <Link
                  href={`/shop/${cat.slug}`}
                  className="shrink-0 text-xs font-mono font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors"
                >
                  View Category →
                </Link>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
}
