'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SKU_REGISTRY } from '@/lib/sku-registry';

type TierKey = 'main-stage' | 'throne' | 'estate';

const TIER_COPY: Record<TierKey, { label: string; sku: string; size: string; copy: string; availability?: string }> = {
  'main-stage': {
    label: 'Main Stage',
    sku: 'SNSL16',
    size: 'Swiss Navy silicone lubricant — 16 oz pump',
    copy: 'The flagship of the club: one full-size unit, refilled on your cadence, sealed and ready.',
    availability: 'Launching soon',
  },
  throne: {
    label: 'Throne',
    sku: 'SNSL32',
    size: 'Swiss Navy silicone lubricant — 32 oz pump',
    copy: 'The 32 oz bulk format for the household that hosts, travels, or simply refuses to ration.',
    availability: 'Launching soon',
  },
  estate: {
    label: 'The Estate',
    sku: 'SNSL1G',
    size: 'Swiss Navy silicone lubricant — 128 oz, one gallon',
    copy: 'The tier for the home that is a destination — the playroom with its own shelf, the hosts who\u2019ll never hear \u201Cwe\u2019re out.\u201D',
    availability: 'Coming Soon',
  },
};

const BTN =
  'inline-flex h-11 items-center justify-center px-6 text-xs font-bold tracking-[0.2em] uppercase bg-white text-black transition-colors hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed';
const INPUT =
  'h-11 w-full bg-black border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';

async function postWaitlist(email: string, tier: string): Promise<{ ok: boolean; message: string }> {
  const res = await fetch('/api/waitlist/estate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, tier }),
  });
  const data = await res.json();
  return { ok: res.ok, message: data.message ?? data.error ?? 'Something went wrong. Please try again.' };
}

export default function SubscriptionPanel() {
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, 'idle' | 'loading' | 'done' | 'error'>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  async function submitWaitlist(tier: TierKey, e: React.FormEvent) {
    e.preventDefault();
    const email = (emails[tier] ?? '').trim();
    if (!email) return;
    setStatuses((s) => ({ ...s, [tier]: 'loading' }));
    setMessages((m) => ({ ...m, [tier]: '' }));
    const result = await postWaitlist(email, tier);
    setStatuses((s) => ({ ...s, [tier]: result.ok ? 'done' : 'error' }));
    setMessages((m) => ({ ...m, [tier]: result.message }));
  }

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
            const registry = SKU_REGISTRY[tier.sku as keyof typeof SKU_REGISTRY];
            const price =
              'price' in registry && registry.price ? Number(registry.price).toFixed(2) : null;
            const status = statuses[key] ?? 'idle';
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

                <div className="mt-auto flex flex-col gap-3">
                  <p className="text-xs font-mono text-zinc-400 leading-6">
                    {key === 'estate'
                      ? 'Think you\u2019d like to get it and forget it by the gallon? Tell us you\u2019re interested. We\u2019ll reach out when The Estate opens.'
                      : 'Want first access when subscription checkout opens? Tell us you\u2019re interested. No charge to join the list.'}
                  </p>
                  {status !== 'done' ? (
                    <form onSubmit={(e) => submitWaitlist(key, e)} className="flex flex-col sm:flex-row gap-2">
                      <label htmlFor={`waitlist-${key}`} className="sr-only">Email address</label>
                      <input
                        id={`waitlist-${key}`}
                        type="email"
                        autoComplete="email"
                        required
                        value={emails[key] ?? ''}
                        onChange={(e) => setEmails((s) => ({ ...s, [key]: e.target.value }))}
                        className={INPUT}
                        placeholder="you@example.com"
                      />
                      <button type="submit" disabled={status === 'loading'} className={`${BTN} shrink-0`}>
                        {status === 'loading' ? 'Saving…' : 'Notify Me'}
                      </button>
                    </form>
                  ) : (
                    <p role="status" className="text-xs font-mono text-emerald-400 leading-6">
                      {messages[key]}
                    </p>
                  )}
                  {status === 'error' && (
                    <p role="alert" className="text-xs font-mono text-red-400 leading-6">
                      {messages[key]}
                    </p>
                  )}
                  <p className="text-[10px] font-mono text-zinc-700 leading-5">
                    No charge to join the list. Signing up doesn&apos;t create a subscription or a
                    founding-rate promise.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs font-mono text-zinc-600 leading-6 mt-4">
          Every tier is one flat price per shipment. Choose a 1-, 2-, 3-, 4-, 6-, or 12-month interval
          — the price stays the same.
        </p>
      </div>

      {/* Manage link */}
      <div className="border-t border-zinc-900 pt-8 flex flex-col gap-3 max-w-2xl">
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
