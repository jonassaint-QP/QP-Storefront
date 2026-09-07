import Link from 'next/link';  
import Image from 'next/image';  
import type { Product } from '@/lib/products';  
import { formatPrice, getStorefrontRouteBySlug, getStorefrontRouteForProduct } from '@/lib/products';  
import AddToCartButton from './AddToCartButton';

export default function ProductCard({ product }: { product: Product }) {  
  const { id, slug, name, tagline, material, description, specs, price, image } = product;  
  const route = getStorefrontRouteForProduct(product);  
  const routeConfig = getStorefrontRouteBySlug(route);  
  const headerColor = routeConfig?.color ?? 'text-antique-gold';

  return (  
    <article className="border border-deep-green bg-near-black flex flex-col group hover:border-antique-gold transition-colors">  
      {/* Header — name */}  
      <Link  
        href={`/shop/${route}/${slug}`}  
        className="border-b border-deep-green group-hover:border-antique-gold transition-colors p-6 flex flex-col gap-2"  
      >  
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-antique-gold/50">  
          {material}  
        </p>  
        <h3 className={`text-lg font-black tracking-tight uppercase leading-tight transition-colors ${headerColor} group-hover:opacity-80`}>  
          {name}  
        </h3>  
        <p className="text-xs font-mono text-antique-gold/60 leading-5">{tagline}</p>  
      </Link>

      {/* Product image */}  
      <Link  
        href={`/shop/${route}/${slug}`}  
        aria-hidden="true"  
        tabIndex={-1}  
        className="relative aspect-[4/3] bg-near-black border-b border-deep-green group-hover:border-antique-gold transition-colors overflow-hidden flex flex-col items-center justify-center gap-3"  
      >  
        {image ? (  
          <Image  
            src={image}  
            alt={name}  
            fill  
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
            className="object-contain group-hover:scale-105 transition-transform duration-500"  
          />  
        ) : (  
          <>  
            <div className="w-10 h-10 border border-deep-green group-hover:border-antique-gold/40 transition-colors rotate-45" />  
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-antique-gold/40">  
              {id.toUpperCase()}  
            </span>  
          </>  
        )}  
      </Link>

      {/* Body — description */}  
      <div className="p-6 flex flex-col gap-5 flex-1">  
        <p className="text-sm font-mono text-antique-gold/60 leading-7">{description}</p>

        {/* Specs */}  
        <ul className="flex flex-col gap-1.5">  
          {specs.map((spec) => (  
            <li  
              key={spec}  
              className="flex items-start gap-3 text-xs font-mono text-antique-gold/50"  
            >  
              <span className="mt-0.5 shrink-0 text-antique-gold/40">—</span>  
              <span>{spec}</span>  
            </li>  
          ))}  
        </ul>  
      </div>

      {/* Footer */}  
      <div className="border-t border-deep-green group-hover:border-antique-gold transition-colors p-6 flex items-center justify-between gap-4">  
        <span className="text-xl font-black text-gold tabular-nums">  
          {formatPrice(price)}  
        </span>  
        <AddToCartButton id={id} slug={slug} category={route} name={name} price={price} />  
      </div>  
    </article>  
  );  
}  
