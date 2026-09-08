import { PERSONAS, getPersonaProducts } from '@/lib/personas';

export const metadata = {  
title: 'Conversations | Queer Pathways',  
description:  
  'Six conversations in object form. Choose a folder to meet Alex, Ken, Jasper, Marcus, Gabe, and Simon through the gear they reach for.',  
};

export default function ConversationsPage() {  
return (  
  <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">  
    <header className="mb-10">  
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#CBB26A]">  
        Queer Pathways Storefront  
      </p>  
      <h1 className="mt-2 text-3xl font-semibold text-[#CBB26A] sm:text-4xl">  
        Conversations  
      </h1>  
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#A8A29E]">  
        Six conversations in object form. Open a folder and meet the person  
        through the gear they reach for — every piece stays independently  
        yours.  
      </p>  
    </header>

    <div className="flex flex-col gap-6">  
      {PERSONAS.map((persona) => {  
        const products = getPersonaProducts(persona);  
        return (  
          <details  
            key={persona.id}  
            className="group rounded-lg border border-[#153009] bg-[#153009]/40 open:bg-[#153009]/70"  
          >  
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">  
              <div className="flex items-center gap-4">  
                <span className="text-[#D3B127]" aria-hidden="true">  
                  📁  
                </span>  
                <div>  
                  <h2 className="text-lg font-semibold text-[#CBB26A]">  
                    {persona.folder}  
                  </h2>  
                  <p className="text-sm text-[#A8A29E]">{persona.name}</p>  
                </div>  
              </div>  
              <div className="flex flex-wrap gap-2">  
                {persona.tags.map((tag) => (  
                  <span  
                    key={tag}  
                    className="rounded-full border border-[#D3B127]/30 px-3 py-1 text-xs text-[#D3B127]"  
                  >  
                    {tag}  
                  </span>  
                ))}  
              </div>  
            </summary>

            <div className="px-5 pb-6">  
              <p className="mb-6 max-w-3xl text-sm leading-relaxed text-[#A8A29E]">  
                {persona.bio}  
              </p>  
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">  
                {products.map((product) => (  
                  <article  
                    key={product.id}  
                    className="rounded-lg border border-[#153009] bg-[#020501] p-4"  
                  >  
                    <h3 className="text-base font-semibold text-[#CBB26A]">  
                      {product.name}  
                    </h3>  
                    {product.tagline ? (  
                      <p className="mt-1 text-sm text-[#A8A29E]">  
                        {product.tagline}  
                      </p>  
                    ) : null}  
                    {product.image ? (  
                      // eslint-disable-next-line @next/next/no-img-element  
                      <img  
                        src={product.image}  
                        alt={product.name}  
                        className="mt-3 h-40 w-full object-contain"  
                      />  
                    ) : (  
                      <div className="mt-3 flex h-40 w-full items-center justify-center rounded border border-dashed border-[#153009] text-xs text-[#57534E]">  
                        Image coming soon  
                      </div>  
                    )}  
                    <a  
                      href={`/shop/${product.slug}`}  
                      className="mt-4 inline-block text-sm font-medium text-[#D3B127] hover:text-[#CBB26A]"  
                    >  
                      View product →  
                    </a>  
                  </article>  
                ))}  
              </div>  
            </div>  
          </details>  
        );  
      })}  
    </div>  
  </section>  
);  
}  
