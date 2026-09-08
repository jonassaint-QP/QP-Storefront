'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SUBSCRIPTION_TIERS, INTERVAL_MONTHS, LIVE_TIERS, billingDate, type SubscriptionTier } from '@/lib/subscriptions';
import { foundingPrice } from '@/lib/subscriptionCheckout';

const INPUT = 'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';
const SELECT = 'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none';

export default function SubscriptionEnrollment({ initialTier = 'main-stage' as SubscriptionTier }) {
  const safeInitial: SubscriptionTier = (LIVE_TIERS as readonly string[]).includes(initialTier)
    ? initialTier
    : 'main-stage';
  const [tier, setTier] = useState<SubscriptionTier>(safeInitial);
  const [billingDay, setBillingDay] = useState(1);
  const [intervalMonths, setIntervalMonths] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const metadata = SUBSCRIPTION_TIERS[tier];
  const founding = code.trim().toUpperCase() === 'QUEER-10';
  const displayedPrice = founding ? foundingPrice(metadata.price) : metadata.price;
  const nextDate = useMemo(() => billingDate(new Date().getUTCFullYear(), new Date().getUTCMonth() + 2, billingDay), [billingDay]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setMessage('Please confirm the recurring-purchase disclosure before continuing.');
      return;
    }
    setMessage('Payment setup is being finalized. No charge has been made.');
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <div className="border border-zinc-800 p-6 flex flex-col gap-5">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Subscription Selection ]</p>
        <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600">
          Tier
          <select value={tier} onChange={(e) => setTier(e.target.value as SubscriptionTier)} className={SELECT}>
            {LIVE_TIERS.map((key) => (
              <option key={key} value={key}>{SUBSCRIPTION_TIERS[key].label} — ${SUBSCRIPTION_TIERS[key].price} per shipment</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600">
            Billing day
            <select value={billingDay} onChange={(e) => setBillingDay(Number(e.target.value))} className={SELECT}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => <option key={day} value={day}>{day}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600">
            Interval
            <select value={intervalMonths} onChange={(e) => setIntervalMonths(Number(e.target.value))} className={SELECT}>
              {INTERVAL_MONTHS.map((months) => <option key={months} value={months}>{months} month{months === 1 ? '' : 's'}</option>)}
            </select>
          </label>
        </div>
        <p className="text-xs font-mono text-zinc-600 leading-6">Next scheduled charge preview: {nextDate.toISOString().slice(0, 10)}. If the selected day is 29, 30, or 31 and a month lacks that date, the charge shifts to that month&apos;s last calendar day.</p>
      </div>

      <div className="border border-zinc-800 p-6 flex flex-col gap-5">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Founding Offer ]</p>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <span className="text-zinc-500">Standard price</span><span className="text-white">${metadata.price}</span>
          <span className="text-zinc-500">Founding price</span><span className="text-[#CBB26A]">${displayedPrice} with QUEER-10</span>
        </div>
        <input aria-label="Founding code" value={code} onChange={(e) => setCode(e.target.value)} className={INPUT} placeholder="QUEER-10 (optional)" />
      </div>

      <div className="border border-zinc-800 p-6 flex flex-col gap-5">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Contact & Territory ]</p>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} placeholder="you@example.com" aria-label="Email address" />
        <p className="text-xs font-mono text-zinc-600">United States shipping only at launch. Canada is not available on this subscription surface.</p>
      </div>

      <label className="flex gap-3 items-start text-xs font-mono text-zinc-500 leading-6">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
        <span>I agree to recurring charges for the subscription shown above at the displayed flat per-shipment price and interval. I understand each charge is due in full, charges appear as QUEER PATHWAYS LLC, and I can cancel online at any time through my membership page.</span>
      </label>
      <p className="text-xs font-mono text-zinc-600 leading-6">At least 15 days&apos; notice applies to 1-, 2-, 3-, and 4-month intervals; at least 30 days&apos; notice applies to 6- and 12-month intervals. Review the <Link href="/refund-policy" className="underline text-zinc-400">Refund & Return Policy</Link> before continuing.</p>
      {message && <p role="status" className="text-xs font-mono text-amber-300 border border-amber-900 bg-amber-950/20 px-4 py-3">{message}</p>}
      <button type="submit" className="h-12 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 transition-colors">Continue to secure payment</button>
    </form>
  );
}
