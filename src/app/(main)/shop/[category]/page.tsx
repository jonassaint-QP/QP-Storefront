import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  STOREFRONT_ROUTES,
  getStorefrontRouteBySlug,
  getProductsByStorefrontRoute,
  type CategorySlug,
  type StorefrontRouteSlug,
} from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ReviewSection from '@/components/ReviewSection';
import SubscriptionPanel from '@/components/SubscriptionPanel';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return STOREFRONT_ROUTES.map((r) => ({ category: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const route = getStorefrontRouteBySlug(category);
  if (!route) return { title: 'Not Found' };
  return {
    title: `${route.title} — Queer Pathways`,
    description: route.description,
  };
}

// `loop` and `anal-sex` are both drawn from the internal `blue-dark-anal`
// review corpus (the two public routes were split from that one internal
// category). `loop-subscription` has no reviews at all.
function reviewCategoryForRoute(slug: StorefrontRouteSlug): CategorySlug | null {
  if (slug === 'loop' || slug === 'anal-sex') return 'blue-dark-anal';
  if (slug === 'loop-subscription') return null;
  return slug;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const route = getStorefrontRouteBySlug(category);

  if (!route) notFound();

  const products = getProductsByStorefrontRoute(route.slug);
  const reviewCategory = reviewCategoryForRoute(route.slug);

  // Adjacent routes for prev/next nav
  const routeIndex = STOREFRONT_ROUTES.findIndex((r) => r.slug === route.slug);
  const prev = routeIndex > 0 ? STOREFRONT_ROUTES[routeIndex - 1] : null;
  const next = routeIndex < STOREFRONT_ROUTES.length - 1 ? STOREFRONT_ROUTES[routeIndex + 1] : null;

  return (
    <div className="flex flex-col">

      {/* Breadcrumb */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-3 text-xs font-mono uppercase tracking-[0.15em]">
          <Link href="/shop" className="text-zinc-600 hover:text-zinc-400 transition-colors">
            Shop
          </Link>
          <span className="text-zinc-800">›</span>
          <span className="text-zinc-400">{route.title}</span>
        </div>
      </div>

      {/* Page header */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 max-w-xl">
          <p className={`text-xs tracking-[0.35em] font-mono uppercase ${route.color ?? 'text-zinc-600'}`}>
            {route.descriptor}
          </p>
          <h1 className={`text-5xl font-black tracking-tight uppercase leading-none ${route.color ?? 'text-white'}`}>
            {route.title}
          </h1>
          <p className="text-sm font-mono text-zinc-500 leading-7 mt-2 max-w-lg">
            {route.description}
          </p>
        </div>
      </div>

      {route.slug === 'loop-subscription' ? (
        <SubscriptionPanel />
      ) : (
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {reviewCategory && <ReviewSection category={reviewCategory} />}
        </div>
      )}

      {/* Route nav */}
      <div className="border-t border-zinc-800 px-6 py-8 mx-auto w-full max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            {prev && (
              <Link
                href={`/shop/${prev.slug}`}
                className="flex flex-col gap-1 group"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors">
                  ← {prev.descriptor}
                </span>
                <span className="text-sm font-mono uppercase tracking-[0.15em] text-zinc-500 group-hover:text-white transition-colors">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700 hover:text-zinc-400 transition-colors"
          >
            All Products
          </Link>
          <div className="text-right">
            {next && (
              <Link
                href={`/shop/${next.slug}`}
                className="flex flex-col gap-1 group items-end"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-700 group-hover:text-zinc-500 transition-colors">
                  {next.descriptor} →
                </span>
                <span className="text-sm font-mono uppercase tracking-[0.15em] text-zinc-500 group-hover:text-white transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
