import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/products';
import { formatPrice } from '@/lib/products';
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {
  const { id, slug, category, name, tagline, material, description, specs, price, image } = product;

  return (
    <article className="border border-zinc-800 bg-black flex flex-col group hover:border-zinc-600 transition-colors">
      {/* Product image */}
      <Link
        href={`/shop/${category}/${slug}`}
        aria-hidden="true"
        tabIndex={-1}
        className="relative aspect-[4/3] bg-zinc-950 border-b border-zinc-800 group-hover:border-zinc-600 transition-colors overflow-hidden flex flex-col items-center justify-center gap-3"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="w-10 h-10 border border-zinc-800 group-hover:border-zinc-700 transition-colors rotate-45" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-800">
              {id.toUpperCase()}
            </span>
          </>
        )}
      </Link>

      {/* Header */}
      <Link
        href={`/shop/${category}/${slug}`}
        className="border-b border-zinc-800 group-hover:border-zinc-600 transition-colors p-6 flex flex-col gap-2"
      >
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700">
          {material}
        </p>
        <h3 className="text-lg font-black tracking-tight uppercase text-white leading-tight group-hover:text-zinc-200 transition-colors">
          {name}
        </h3>
        <p className="text-xs font-mono text-zinc-500 leading-5">{tagline}</p>
      </Link>

      {/* Body */}
      <div className="p-6 flex flex-col gap-5 flex-1">
        <p className="text-sm font-mono text-zinc-500 leading-7">{description}</p>

        {/* Specs */}
        <ul className="flex flex-col gap-1.5">
          {specs.map((spec) => (
            <li
              key={spec}
              className="flex items-start gap-3 text-xs font-mono text-zinc-600"
            >
              <span className="mt-0.5 shrink-0 text-zinc-800">—</span>
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 group-hover:border-zinc-600 transition-colors p-6 flex items-center justify-between gap-4">
        <span className="text-xl font-black text-white tabular-nums">
          {formatPrice(price)}
        </span>
        <AddToCartButton id={id} slug={slug} category={category} name={name} price={price} />
      </div>
    </article>
  );
}
