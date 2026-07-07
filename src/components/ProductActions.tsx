'use client';

import { useState } from 'react';
import Link from 'next/link';
import SizeSelector from './SizeSelector';
import AddToCartButton from './AddToCartButton';
import type { CategorySlug } from '@/lib/products';
import { formatPrice } from '@/lib/products';

type Props = {
  id: string;
  slug: string;
  category: CategorySlug;
  name: string;
  price: number;
  hasSizing: boolean;
};

export default function ProductActions({
  id, slug, category, name, price, hasSizing,
}: Props) {
  const [size, setSize] = useState<string | null>(null);
  const sizeReady = !hasSizing || size !== null;

  // Append size to cart item name so it appears in cart/checkout
  const cartName = hasSizing && size ? `${name} — ${size}` : name;

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex items-baseline gap-4">
        <span className="text-4xl font-black text-white tabular-nums">
          {formatPrice(price)}
        </span>
      </div>

      {hasSizing && (
        <SizeSelector onSelect={setSize} />
      )}

      <div className="flex gap-3">
        <AddToCartButton
          id={id}
          slug={slug}
          category={category}
          name={cartName}
          price={price}
          label={hasSizing && !size ? 'Select a Size' : 'Add to Cart'}
          className={[
            'h-12 px-8 text-xs font-bold tracking-[0.2em] uppercase flex items-center transition-colors',
            sizeReady
              ? 'bg-white text-black hover:bg-zinc-100'
              : 'bg-zinc-900 text-zinc-600 cursor-not-allowed pointer-events-none',
          ].join(' ')}
        />
        <Link
          href="/cart"
          className="h-12 px-6 border border-zinc-700 text-zinc-400 text-xs font-bold tracking-[0.2em] uppercase flex items-center transition-colors hover:border-zinc-500 hover:text-white"
        >
          View Cart
        </Link>
      </div>

      <p className="text-xs font-mono text-zinc-700 leading-6">
        Ships in plain, unbranded packaging. Non-descript return address.
      </p>
    </div>
  );
}
