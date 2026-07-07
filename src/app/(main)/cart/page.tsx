'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeItem, setQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col">
        <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
              [ Cart ]
            </p>
            <h1 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
              Your Cart
            </h1>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 py-32 flex flex-col items-center text-center gap-6">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-700">
            [ Empty ]
          </p>
          <p className="text-sm font-mono text-zinc-600 leading-7 max-w-xs">
            No items in your cart. Add something from the shop to get started.
          </p>
          <Link
            href="/shop"
            className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center transition-colors hover:bg-zinc-100"
          >
            Enter the Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      {/* Page header */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
              [ Cart ]
            </p>
            <h1 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
              Your Cart
            </h1>
            <p className="text-sm font-mono text-zinc-500">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-700 hover:text-zinc-400 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Cart body */}
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

          {/* Line items */}
          <div className="flex flex-col divide-y divide-zinc-800 border-t border-zinc-800">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <Link
                    href={`/shop/${item.category}/${item.slug}`}
                    className="text-base font-black font-mono uppercase text-white hover:text-zinc-300 transition-colors leading-tight"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs font-mono text-zinc-600">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {/* Quantity control */}
                  <div className="flex items-center border border-zinc-800">
                    <button
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-white transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-mono text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 flex items-center justify-center text-zinc-500 hover:text-white transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Line total */}
                  <span className="text-base font-black text-white tabular-nums w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-zinc-700 hover:text-zinc-400 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="border border-zinc-800 p-8 flex flex-col gap-6 sticky top-20">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ Order Summary ]
            </p>

            <div className="flex flex-col gap-3 text-sm font-mono">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="tabular-nums">{totalPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <hr className="border-zinc-800" />
              <div className="flex justify-between text-white font-black text-base">
                <span>Total</span>
                <span className="tabular-nums">{totalPrice}</span>
              </div>
            </div>

            {/* Discreet shipping note */}
            <div className="border-l-2 border-zinc-800 pl-3">
              <p className="text-xs font-mono text-zinc-700 leading-6">
                All orders ship in plain, unbranded packaging. Non-descript return address. Nothing on the label reveals contents.
              </p>
            </div>

            <Link
              href="/checkout"
              className="h-12 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100 flex items-center justify-center"
            >
              Proceed to Checkout →
            </Link>

            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-600 hover:text-zinc-300 transition-colors text-center"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
