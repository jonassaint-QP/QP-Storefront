import Link from 'next/link';
import { STOREFRONT_ROUTES } from '../lib/products';

// Shop links are derived from the shared storefront route registry
// (STOREFRONT_ROUTES) rather than hard-coded, so a footer target can never
// drift from a route that actually exists.
//
// Retired 2026-09-10: the previous hard-coded targets /shop/slings-anchors,
// /shop/technical-toys, /shop/lubes, and /shop/metabolic never existed in
// STOREFRONT_ROUTES and returned 404 to customers and crawlers. They are now
// closed at the edge with 410 Gone in public/_redirects.
//
// `loop-subscription` is deliberately excluded — it is the non-buyable
// membership panel, not a product-backed route.
const SHOP_LINKS = STOREFRONT_ROUTES.filter(
  (route) => route.slug !== 'loop-subscription'
).map((route) => ({
  label: route.descriptor,
  href: `/shop/${route.slug}`,
}));

const INFO_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-black mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col leading-none">
            <span className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ QP ]
            </span>
            <span className="text-sm font-black tracking-tight uppercase text-white">
              Queer Pathways
            </span>
          </div>
          <p className="text-xs font-mono text-zinc-600 leading-6 max-w-xs">
            High-fidelity kink infrastructure for the queer, gay, trans, and
            neurodivergent communities. Built for sovereign bodies.
          </p>
          <p className="text-xs font-mono text-zinc-700">
            All shipments are 100% discrete.
          </p>
          <a
            href="mailto:support@queerpathways.com"
            className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            support@queerpathways.com
          </a>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-600">
            Shop
          </p>
          <nav aria-label="Shop navigation" className="flex flex-col gap-3">
            {SHOP_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-600">
            Info
          </p>
          <nav aria-label="Info navigation" className="flex flex-col gap-3">
            {INFO_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-zinc-900 px-6 py-6 mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs font-mono text-zinc-700">
          © {new Date().getFullYear()} Queer Pathways. All rights reserved.
        </p>
        <p className="text-xs font-mono text-zinc-800">
          Adults only — 18+
        </p>
      </div>
    </footer>
  );
}
