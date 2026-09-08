'use client';

import Link from 'next/link';
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions';

type TierKey = 'main-stage' | 'throne' | 'estate';

const TIER_COPY: Record<TierKey, { label: string; sku: string; size: string; copy: string; availability?: string }> = {
  'main-stage': {
    label: 'Main Stage',
    sku: 'SNSL16',
    size: 'Swiss Navy silicone lubricant — 16 oz pump',
    copy: 'The flagship of the club: one full-size unit, refilled on your cadence, sealed and ready.',
    availability: 'Founding-member allocation',
  },
  throne: {
    label: 'Throne',
    sku: 'SNSL32',
    size: 'Swiss Navy silicone lubricant — 32 oz pump',
    copy: 'The 32 oz bulk format for the household that hosts, travels, or simply refuses to ration.',
    availability: 'Founding-member allocation',
  },
  estate: {
    label: 'The Estate',
    sku: 'SNSL1G',
    size: 'Swiss Navy silicone lubricant — 128 oz, one gallon',
    copy: 'The tier for the home that is a destination — the playroom with its own shelf, the hosts who\u2019ll never hear \u201Cwe\u2019re out.\u201D',
    availability: 'Founding-member allocation',
  },
};

const BTN =
  'inline-flex h-11 items-center justify-center px-6 text-xs font-bold tracking-[0.2em] uppercase bg-white text-black transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed';

export default function SubscriptionPanel() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 flex flex-col gap-14">
      {/* Hero */}
      <div className="border border-zinc-800 p-8 md:p-12 flex flex-col gap-5 bg-black">
        <p className="text-xs tracking-[0.35em] font-mono uppercase text-[#CBB26A]">
          Sovereign Body Lube Club
        </p>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight text-white">
          Some doors don&apos;t open. They&apos;re opened.
        </h2>
        <p className="text-sm font-mono text-zinc-400 leading-7 max-w-2xl">
          A standing supply of Swiss Navy silicone, shipped on the day and rhythm you choose, at a
          flat per-shipment price that never changes with your interval. No apps. No lock-in. No
          fine-print games. One less thing your body has to ask for.
        </p>
        <blockquote className="border-l-2 border-[#CBB26A] pl-4 text-sm font-mono text-[#CBB26A] italic leading-7">
          Gear, not medicine. Sovereignty, not shame.
        </blockquote>
      </div>

      {/* Tiers */}
      <div>
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600 mb-5">
          [ Choose Your Tier ]
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {(Object.keys(TIER_COPY) as TierKey[]).map((key) => {
            const tier = TIER_COPY[key];
            const price = SUBSCRIPTION_TIERS[key].price;
            return (
              <div key={key} className="bg-black p-8 flex flex-col gap-4 min-h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">{tier.label}</p>
                    <h3 className="text-xl font-black tracking-tight uppercase text-white">{tier.label}</h3>
                  </div>
                  {tier.availability && (
                    <span className="shrink-0 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 border border-zinc-700 text-zinc-400">
                      {tier.availability}
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-zinc-500 leading-6">{tier.size}</p>
                {price && <p className="text-sm font-mono text-white tabular-nums">${price} per shipment</p>}
                <p className="text-sm font-mono text-zinc-400 leading-7">{tier.copy}</p>

                <Link
                  href={`/checkout/subscription?tier=${key}`}
                  className={`${BTN} mt-auto self-start`}
                >
                  Choose {tier.label}
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-xs font-mono text-zinc-600 leading-6 mt-4">
          Every tier is one flat price per shipment. Choose a 1-, 2-, 3-, 4-, 6-, or 12-month interval
          — the price stays the same. Founding rates are locked for life once you join.
        </p>
      </div>

      {/* Founding window */}
      <div className="border border-[#D3B127]/40 bg-[#153009] p-8 flex flex-col gap-3 max-w-3xl">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-[#D3B127]">
          [ Founding Window — September 15 through October 15 ]
        </p>
        <p className="text-sm font-mono text-[#C0BFBC] leading-7">
          Join with code <span className="text-[#D3B127] font-bold">QUEER-10</span> and that 10% is
          yours for life — every shipment, every cadence, forever. This is the friends-and-family seed
          of the club: the people who believed before the bottle was on the shelf.
        </p>
      </div>

      {/* Notices */}
      <div className="border-t border-zinc-900 pt-8 flex flex-col gap-3 max-w-2xl">
        <p className="text-xs font-mono text-zinc-600 leading-6">
          Charges appear as <span className="text-zinc-400">QP LOGISTICS</span> on your statement.
        </p>
        <p className="text-xs font-mono text-zinc-600 leading-6">
          The Sovereign Body Lube Club currently ships within the United States only.
        </p>
        <p className="text-xs font-mono text-zinc-600 leading-6">
          Already a member? Manage your membership at{' '}
          <Link href="/membership/manage" className="text-zinc-400 underline hover:text-zinc-200 transition-colors">
            /membership/manage
          </Link>{' '}
          — pause, skip, change your interval, or cancel anytime. No phone call, no retention script.
        </p>
      </div>
    </div>
  );
}
