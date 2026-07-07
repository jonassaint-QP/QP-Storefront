'use client';

import { useCart } from '@/lib/cart';
import type { CartItem } from '@/lib/cart';

type Props = Omit<CartItem, 'quantity'> & {
  className?: string;
  label?: string;
};

export default function AddToCartButton({
  id,
  slug,
  category,
  name,
  price,
  className,
  label = 'Add to Cart',
}: Props) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem({ id, slug, category, name, price })}
      className={
        className ??
        'h-9 px-5 bg-white text-black text-xs font-bold tracking-[0.15em] uppercase transition-colors hover:bg-zinc-100 shrink-0'
      }
    >
      {label}
    </button>
  );
}
