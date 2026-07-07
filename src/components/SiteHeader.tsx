'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/cart';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Bundles', href: '/bundles' },
  { label: 'Prepare', href: '/prepare' },
  { label: 'About', href: '/about' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-8">

        {/* Wordmark */}
        <Link
          href="/"
          className="flex flex-col leading-none group"
          aria-label="Queer Pathways — home"
        >
          <span className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">
            [ QP ]
          </span>
          <span className="text-sm font-black tracking-tight uppercase text-white group-hover:text-zinc-200 transition-colors">
            Queer Pathways
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href.split('#')[0]));
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'text-xs tracking-[0.2em] font-mono uppercase transition-colors',
                  active
                    ? 'text-white'
                    : 'text-zinc-500 hover:text-zinc-200',
                ].join(' ')}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            className="relative h-8 w-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2.5l1.8 8.5h8.4l1.5-6H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7.5" cy="15" r="1" fill="currentColor" />
              <circle cx="13.5" cy="15" r="1" fill="currentColor" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-black flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <Link
            href="/shop"
            className="h-8 px-4 bg-white text-black text-xs font-bold tracking-[0.15em] uppercase transition-colors hover:bg-zinc-100 flex items-center"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            className="relative h-8 w-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2.5l1.8 8.5h8.4l1.5-6H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7.5" cy="15" r="1" fill="currentColor" />
              <circle cx="13.5" cy="15" r="1" fill="currentColor" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] font-black flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block h-px w-5 bg-zinc-400 transition-all origin-center ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block h-px w-5 bg-zinc-400 transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-px w-5 bg-zinc-400 transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-zinc-800 bg-black px-6 py-6 flex flex-col gap-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-[0.2em] font-mono uppercase text-zinc-400 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="h-11 px-4 bg-white text-black text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center"
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  );
}
