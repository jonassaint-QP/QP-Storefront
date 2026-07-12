import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  CATEGORIES,
  PRODUCTS,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
  formatPrice,
  type CategorySlug,
} from '@/lib/products';
import ProductActions from '@/components/ProductActions';
import ReviewSection from '@/components/ReviewSection';

interface PageProps {
  params: Promise<{ category: string; product: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product: productSlug, category: categorySlug } = await params;
  const product = getProductBySlug(productSlug);
  const category = getCategoryBySlug(categorySlug);
  if (!product || !category) return { title: 'Not Found' };
  return {
    title: `${product.name} — Queer Pathways`,
    description: product.description,
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { product: productSlug, category: categorySlug } = await params;
  const product = getProductBySlug(productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category || product.category !== categorySlug) notFound();

  // Related products — same category, different product
  const related = getProductsByCategory(product.category as CategorySlug).filter(
    (p) => p.id !== product.id
  );

  return (
    <div className="flex flex-col">

      {/* Breadcrumb */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-3 text-xs font-mono uppercase tracking-[0.15em]">
          <Link href="/shop" className="text-zinc-600 hover:text-zinc-400 transition-colors">
            Shop
          </Link>
          <span className="text-zinc-800">›</span>
          <Link
            href={`/shop/${category.slug}`}
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            {category.title}
          </Link>
          <span className="text-zinc-800">›</span>
          <span className="text-zinc-500">{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — product image + gallery */}
          <div className="space-y-4">
            {/* The Big Hero Shot */}
            {product.image ? (
              <div className="relative border border-zinc-800 aspect-square overflow-hidden bg-zinc-950">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="border border-zinc-800 aspect-square flex flex-col items-center justify-center gap-3 bg-zinc-950">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                  {category.tag}
                </p>
                <p className="text-4xl font-black text-zinc-800 uppercase tracking-tight text-center px-8 leading-tight">
                  {product.name}
                </p>
              </div>
            )}

            {/* The "No-Reading-Required" Gallery Grid */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-transparent hover:border-[#CBB26A] transition-all"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — details */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
                {category.tag} — {category.subtitle}
              </p>
              <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
                {product.name}
              </h1>
              <p className="text-sm font-mono text-zinc-500">{product.tagline}</p>
            </div>

            <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700 border border-zinc-800 px-3 py-2 w-fit">
              {product.material}
            </p>

            <p className="text-sm font-mono text-zinc-400 leading-7">
              {product.description}
            </p>

            {/* Specs */}
            <div className="border border-zinc-800 p-6 flex flex-col gap-3">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-600 mb-1">
                Specifications
              </p>
              {product.specs.map((spec) => (
                <div key={spec} className="flex items-start gap-3">
                  <span className="text-zinc-800 shrink-0 mt-0.5 font-mono">—</span>
                  <span className="text-sm font-mono text-zinc-400 leading-6">{spec}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <ProductActions
              id={product.id}
              slug={product.slug}
              category={product.category as CategorySlug}
              name={product.name}
              price={product.price}
              hasSizing={false}
            />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <ReviewSection category={product.category as CategorySlug} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-3 mb-10">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ Same Category ]
            </p>
            <h2 className="text-2xl font-black tracking-tight uppercase text-white">
              Related Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.category}/${p.slug}`}
                className="bg-black p-6 flex flex-col gap-2 group hover:bg-zinc-950 transition-colors"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
                  {p.material}
                </p>
                <p className="text-sm font-black uppercase text-white group-hover:text-zinc-200 transition-colors leading-tight">
                  {p.name}
                </p>
                <p className="text-xs font-mono text-zinc-600">{p.tagline}</p>
                <p className="text-base font-black text-white mt-2 tabular-nums">
                  {formatPrice(p.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
