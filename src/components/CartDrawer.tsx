'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart, removeItem, setQuantity } =
    useCart();
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Trap / restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      firstFocusRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={[
          'fixed inset-0 z-50 bg-black/70 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        aria-hidden="true"
        onClick={closeCart}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={[
          'fixed top-0 right-0 z-50 h-full w-full max-w-md bg-black border-l border-zinc-800',
          'flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Drawer header */}
        <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ Cart ]
            </p>
            {totalItems > 0 && (
              <span className="text-xs font-mono text-zinc-500">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            ref={firstFocusRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="text-zinc-600 hover:text-white transition-colors p-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-700">
                [ Empty ]
              </p>
              <p className="text-sm font-mono text-zinc-600 leading-7">
                No items in the cart yet.
              </p>
              <button
                onClick={closeCart}
                className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {items.map((item) => (
                <li key={item.id} className="px-6 py-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1 min-w-0">
                      <Link
                        href={`/shop/${item.category}/${item.slug}`}
                        onClick={closeCart}
                        className="text-sm font-black font-mono uppercase text-white hover:text-zinc-300 transition-colors leading-tight truncate"
                      >
                        {item.name}
                      </Link>
                      <span className="text-xs font-mono text-zinc-600">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 text-zinc-700 hover:text-zinc-400 transition-colors mt-0.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity + line total */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center border border-zinc-800">
                      <button
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-mono text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-black font-mono text-white tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 px-6 py-6 flex flex-col gap-4 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                Total
              </span>
              <span className="text-2xl font-black text-white tabular-nums">
                {totalPrice}
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-700 leading-5">
              Shipping calculated at checkout. All orders ship in plain, unbranded packaging.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="h-12 flex items-center justify-center bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100"
            >
              Review Cart →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
