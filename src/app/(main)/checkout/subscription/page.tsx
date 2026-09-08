'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SubscriptionEnrollment from '@/components/checkout/SubscriptionEnrollment';
import { LIVE_TIERS, type SubscriptionTier } from '@/lib/subscriptions';

function SubscriptionCheckoutContent() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get('tier');
  const initialTier: SubscriptionTier = (LIVE_TIERS as readonly string[]).includes(tierParam ?? '')
    ? (tierParam as SubscriptionTier)
    : 'main-stage';

  return (
    <div className="flex flex-col">
      <div className="border-b border-zinc-800 px-6 py-12 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-[#CBB26A]">
            [ Sovereign Body Lube Club ]
          </p>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
            Join the Club
          </h1>
          <p className="text-sm font-mono text-zinc-500 leading-7 max-w-2xl mt-2">
            Pick your tier, billing day, and interval. The price you see is the price per shipment
            — flat, at every interval.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <SubscriptionEnrollment initialTier={initialTier} />
      </div>
    </div>
  );
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense fallback={<div className="px-6 py-24 text-sm font-mono text-zinc-600">Loading…</div>}>
      <SubscriptionCheckoutContent />
    </Suspense>
  );
}
