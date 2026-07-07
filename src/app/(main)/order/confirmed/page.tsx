import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Confirmed — Queer Pathways',
  robots: { index: false, follow: false },
};

export default function OrderConfirmedPage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-6 py-32 flex flex-col items-center text-center gap-10">

        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Order Received ]
          </p>
          <h1 className="text-6xl font-black tracking-tight uppercase leading-none text-white">
            Confirmed.
          </h1>
        </div>

        <div className="border border-zinc-800 p-10 flex flex-col gap-6 max-w-lg w-full text-left">
          <p className="text-sm font-mono text-zinc-400 leading-7">
            Your order has been received and is being processed. A confirmation
            will be sent to the email address you provided.
          </p>

          <div className="flex flex-col gap-4">
            {[
              ['Packaging', 'Plain, unbranded. No brand name or product description on the label.'],
              ['Return Address', 'Non-descript business address — nothing revealing.'],
              ['Tracking', 'Tracking number will be emailed when your order ships.'],
            ].map(([label, body]) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                  — {label}
                </p>
                <p className="text-xs font-mono text-zinc-600 leading-6">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/shop"
            className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:bg-zinc-100"
          >
            Continue Shopping
          </Link>
          <Link
            href="/prepare"
            className="h-12 px-8 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center transition-colors hover:border-zinc-400 hover:text-white"
          >
            Run the Curation Ritual
          </Link>
        </div>

      </div>
    </div>
  );
}
