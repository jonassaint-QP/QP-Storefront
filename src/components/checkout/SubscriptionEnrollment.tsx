'use client';

import { useMemo, useState } from 'react';  
import Link from 'next/link';  
import PaymentStep from '@/components/checkout/PaymentStep';  
import { SUBSCRIPTION_TIERS, INTERVAL_MONTHS, billingDate, type SubscriptionTier } from '@/lib/subscriptions';  
import { foundingPrice } from '@/lib/subscriptionCheckout';

const INPUT = 'h-10 w-full bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';  
const SELECT = 'h-10 w-full bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none';

type ShippingAddress = {  
  first_name: string;  
  last_name: string;  
  address_1: string;  
  city: string;  
  state: string;  
  postal_code: string;  
  country: 'US';  
};

export default function SubscriptionEnrollment({ initialTier = 'main-stage' as SubscriptionTier }) {  
  const [tier, setTier] = useState<SubscriptionTier>(initialTier);  
  const [billingDay, setBillingDay] = useState(1);  
  const [intervalMonths, setIntervalMonths] = useState(1);  
  const [email, setEmail] = useState('');  
  const [code, setCode] = useState('');  
  const [consent, setConsent] = useState(false);  
  const [shipping, setShipping] = useState<ShippingAddress>({  
    first_name: '',  
    last_name: '',  
    address_1: '',  
    city: '',  
    state: '',  
    postal_code: '',  
    country: 'US',  
  });  
  const [message, setMessage] = useState<string | null>(null);  
  const [stage, setStage] = useState<'form' | 'payment'>('form');

  const metadata = SUBSCRIPTION_TIERS[tier];  
  const founding = code.trim().toUpperCase() === 'QUEER-10';  
  const displayedPrice = founding ? foundingPrice(metadata.price) : metadata.price;  
  const nextDate = useMemo(() => billingDate(new Date().getUTCFullYear(), new Date().getUTCMonth() + 2, billingDay), [billingDay]);

  function set<K extends keyof ShippingAddress>(key: K, value: ShippingAddress[K]) {  
    setShipping((prev) => ({ ...prev, [key]: value }));  
  }

  function submit(e: React.FormEvent) {  
    e.preventDefault();  
    if (!consent) {  
      setMessage('Please confirm the recurring-purchase disclosure before continuing.');  
      return;  
    }  
    if (!shipping.first_name.trim() || !shipping.last_name.trim() || !shipping.address_1.trim() || !shipping.city.trim() || !shipping.state.trim() || !shipping.postal_code.trim()) {  
      setMessage('Please complete the shipping address before continuing.');  
      return;  
    }  
    setMessage(null);  
    setStage('payment');  
  }

  if (stage === 'payment') {  
    return (  
      <div className="flex flex-col gap-6">  
        <div className="border border-zinc-800 p-6 flex flex-col gap-4">  
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Enrollment Review ]</p>  
          <div className="grid grid-cols-2 gap-4 text-sm font-mono">  
            <span className="text-zinc-500">Tier</span><span className="text-white">{metadata.label}</span>  
            <span className="text-zinc-500">Price per shipment</span><span className="text-[#CBB26A]">${displayedPrice}</span>  
            <span className="text-zinc-500">Interval</span><span className="text-white">{intervalMonths} month{intervalMonths === 1 ? '' : 's'}</span>  
            <span className="text-zinc-500">Email</span><span className="text-white">{email}</span>  
            <span className="text-zinc-500">Ship to</span><span className="text-white">{shipping.address_1}, {shipping.city}, {shipping.state} {shipping.postal_code}</span>  
          </div>  
        </div>  
        <PaymentStep  
          email={email}  
          tier={tier}  
          billingDay={billingDay}  
          intervalMonths={intervalMonths}  
          foundingCode={code}  
          shippingAddress={shipping}  
          onDone={() => setStage('form')}  
        />  
        <button type="button" onClick={() => setStage('form')} className="text-xs font-mono text-zinc-600 underline">← Back to edit</button>  
      </div>  
    );  
  }

  return (  
    <form onSubmit={submit} className="flex flex-col gap-8">  
      <div className="border border-zinc-800 p-6 flex flex-col gap-5">  
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Subscription Selection ]</p>  
        <label className="flex flex-col gap-2 text-xs font-mono uppercase tracking-widest text-zinc-600">  
          Tier  
          <select value={tier} onChange={(e) => setTier(e.target.value as SubscriptionTier)} className={SELECT}>  
            {(Object.keys(SUBSCRIPTION_TIERS) as SubscriptionTier[]).map((key) => (  
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
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">[ Contact & Shipping ]</p>  
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} placeholder="you@example.com" aria-label="Email address" />  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">  
          <input required value={shipping.first_name} onChange={(e) => set('first_name', e.target.value)} className={INPUT} placeholder="First name" aria-label="First name" />  
          <input required value={shipping.last_name} onChange={(e) => set('last_name', e.target.value)} className={INPUT} placeholder="Last name" aria-label="Last name" />  
        </div>  
        <input required value={shipping.address_1} onChange={(e) => set('address_1', e.target.value)} className={INPUT} placeholder="Street address" aria-label="Street address" />  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">  
          <input required value={shipping.city} onChange={(e) => set('city', e.target.value)} className={INPUT} placeholder="City" aria-label="City" />  
          <input required value={shipping.state} onChange={(e) => set('state', e.target.value)} className={INPUT} placeholder="State" aria-label="State" />  
        </div>  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">  
          <input required value={shipping.postal_code} onChange={(e) => set('postal_code', e.target.value)} className={INPUT} placeholder="ZIP code" aria-label="ZIP code" />  
          <select value={shipping.country} onChange={(e) => set('country', e.target.value as 'US')} className={SELECT} aria-label="Country">  
            <option value="US">United States</option>  
            <option value="CA" disabled>Canada — coming soon</option>  
          </select>  
        </div>  
        <p className="text-xs font-mono text-zinc-600 leading-6">United States shipping is live at launch. Canada is being prepared and will open once fulfillment, tax, shipping, and payment approval are complete.</p>  
      </div>

      <label className="flex gap-3 items-start text-xs font-mono text-zinc-500 leading-6">  
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />  
        <span>I agree to recurring charges for the subscription shown above at the displayed flat per-shipment price and interval. I understand each charge is due in full, charges appear as QUEER PATHWAYS LLC, and I can cancel online at any time through my membership page.</span>  
      </label>  
      <p className="text-xs font-mono text-zinc-600 leading-6">At least 15 days&apos; notice applies to 1-, 2-, 3-, and 4-month intervals; at least 30 days&apos; notice applies to 6- and 12-month intervals. Review the <Link href="/refund-policy" className="underline text-zinc-400">Refund & Return Policy</Link> before continuing.</p>  
      {message && <p role="status" className="text-xs font-mono text-amber-300 border border-amber-900 bg-amber-950/20 px-4 py-3">{message}</p>}  
      <button type="submit" className="h-12 w-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 transition-colors">Continue to secure payment</button>  
    </form>  
  );  
}  
