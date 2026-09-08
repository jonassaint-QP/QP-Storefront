'use client';

import { useState } from 'react';
import Link from 'next/link';

const INTERVALS = [1, 2, 3, 4, 6, 12];
const INPUT =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';
const SELECT =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none';
const BTN =
  'h-10 px-5 text-xs font-bold tracking-[0.15em] uppercase transition-colors border border-zinc-700 text-zinc-200 hover:border-zinc-400 hover:text-white';
const BTN_DANGER =
  'h-10 px-5 text-xs font-bold tracking-[0.15em] uppercase transition-colors border border-red-900 text-red-400 hover:bg-red-950/40 hover:text-red-300';

type Membership = {
  id: number;
  tier: string;
  tierLabel: string;
  productLabel: string;
  sku: string;
  pricePerShipment: string;
  billingDay: number;
  intervalMonths: number;
  status: string;
  founding: boolean;
  foundingCode: string | null;
  nextChargeDate: string | null;
  lastChargeDate: string | null;
};

function fmtDate(v: string | null): string {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

function noticeCopy(interval: number): string {
  return interval <= 4
    ? 'You receive at least 15 days\u2019 notice before a scheduled charge.'
    : 'You receive at least 30 days\u2019 notice before a scheduled charge.';
}

export default function MembershipManagePage() {
  const [email, setEmail] = useState('');
  const [reference, setReference] = useState('');
  const [memberships, setMemberships] = useState<Membership[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch('/api/membership/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), reference: reference.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Unable to find your membership.');
        setMemberships(null);
        return;
      }
      setMemberships(data.memberships ?? []);
      if (!data.memberships?.length) setError('No memberships found for that email and reference.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  async function runAction(subscriptionId: number, action: string, extra: Record<string, unknown> = {}) {
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch('/api/membership/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), subscriptionId, action, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'That action could not be completed.');
        return;
      }
      setMessage(data.message ?? 'Your membership has been updated.');
      setConfirmCancelId(null);
      // Refresh the membership list to reflect the mutation
      const lookup = await fetch('/api/membership/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), reference: reference.trim() }),
      });
      const lookupData = await lookup.json();
      if (lookup.ok) setMemberships(lookupData.memberships ?? []);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="border-b border-zinc-800 px-6 py-12 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Member Portal ]
          </p>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
            Manage Your Membership
          </h1>
          <p className="text-sm font-mono text-zinc-500 leading-7 max-w-2xl">
            Pause, skip, change your interval or billing day, or cancel anytime — no phone
            call, no retention script, no explanation required.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        {!memberships ? (
          <form onSubmit={handleLookup} className="max-w-xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="m-email" className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                Email Address <span className="text-zinc-700 ml-1">*</span>
              </label>
              <input
                id="m-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="m-ref" className="text-xs font-mono uppercase tracking-widest text-zinc-600">
                Order or Subscription Reference <span className="text-zinc-700 ml-1">*</span>
              </label>
              <input
                id="m-ref"
                inputMode="numeric"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className={INPUT}
                placeholder="Found in your confirmation email"
              />
              <p className="text-xs font-mono text-zinc-700 leading-6">
                Your order or subscription number from your confirmation email.
              </p>
            </div>
            {error && <p role="alert" className="text-xs font-mono text-red-400 leading-6">{error}</p>}
            <button type="submit" disabled={busy} className="h-12 px-8 w-full max-w-xs bg-white text-black text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-zinc-100 disabled:opacity-50">
              {busy ? 'Looking up…' : 'Find My Membership'}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-8">
            {message && (
              <div className="border border-emerald-900 bg-emerald-950/30 px-5 py-4">
                <p className="text-sm font-mono text-emerald-300 leading-6">{message}</p>
              </div>
            )}
            {error && <p role="alert" className="text-xs font-mono text-red-400 leading-6">{error}</p>}

            {memberships.length === 0 ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm font-mono text-zinc-500">No memberships found.</p>
                <button onClick={() => setMemberships(null)} className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-300 transition-colors self-start">
                  ← Search again
                </button>
              </div>
            ) : (
              memberships.map((m) => {
                const canPause = m.status === 'active' || m.status === 'skipped';
                const canResume = m.status === 'paused';
                const canSkip = m.status === 'active';
                const canCancel = m.status !== 'canceled';
                const isCanceled = m.status === 'canceled';
                return (
                  <div key={m.id} className="border border-zinc-800 p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
                            Membership #{m.id}
                          </p>
                          <h2 className="text-2xl font-black uppercase tracking-tight text-white">{m.tierLabel}</h2>
                          <p className="text-sm font-mono text-zinc-500">{m.productLabel}</p>
                        </div>
                        <span
                          className={[
                            'text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 border',
                            m.status === 'active' && 'border-emerald-900 text-emerald-400',
                            m.status === 'paused' && 'border-amber-900 text-amber-400',
                            m.status === 'skipped' && 'border-amber-900 text-amber-400',
                            isCanceled && 'border-red-900 text-red-400',
                          ].join(' ')}
                        >
                          {m.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-mono">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">Price / Shipment</span>
                        <span className="text-white tabular-nums">${Number(m.pricePerShipment).toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">Billing Day</span>
                        <span className="text-white">{m.billingDay}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">Interval</span>
                        <span className="text-white">{m.intervalMonths} month{m.intervalMonths > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">Next Charge</span>
                        <span className="text-white">{fmtDate(m.nextChargeDate)}</span>
                      </div>
                    </div>

                    {m.founding && (
                      <p className="text-xs font-mono text-[#CBB26A]">
                        Founding member{m.foundingCode ? ` — ${m.foundingCode}` : ''} · pause preserves your founding rate · canceling ends it
                      </p>
                    )}

                    <p className="text-xs font-mono text-zinc-600 leading-6">{noticeCopy(m.intervalMonths)}</p>

                    {!isCanceled && (
                      <div className="flex flex-wrap gap-3 border-t border-zinc-900 pt-6">
                        {canPause && (
                          <button onClick={() => runAction(m.id, 'pause')} disabled={busy} className={BTN}>
                            Pause
                          </button>
                        )}
                        {canResume && (
                          <button onClick={() => runAction(m.id, 'resume')} disabled={busy} className={BTN}>
                            Resume
                          </button>
                        )}
                        {canSkip && (
                          <button onClick={() => runAction(m.id, 'skip')} disabled={busy} className={BTN}>
                            Skip Next Shipment
                          </button>
                        )}
                        <select
                          defaultValue=""
                          className={SELECT}
                          disabled={busy}
                          onChange={(e) => {
                            if (!e.target.value) return;
                            runAction(m.id, 'change-interval', { intervalMonths: Number(e.target.value) });
                            e.target.value = '';
                          }}
                        >
                          <option value="" disabled>Change interval…</option>
                          {INTERVALS.map((i) => (
                            <option key={i} value={i}>
                              {i} month{i > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                        <select
                          defaultValue=""
                          className={SELECT}
                          disabled={busy}
                          onChange={(e) => {
                            if (!e.target.value) return;
                            runAction(m.id, 'change-billing-day', { billingDay: Number(e.target.value) });
                            e.target.value = '';
                          }}
                        >
                          <option value="" disabled>Change billing day…</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        {canCancel &&
                          (confirmCancelId === m.id ? (
                            <div className="flex items-center gap-3 border border-red-900 px-4 py-3 w-full">
                              <p className="text-xs font-mono text-red-300 leading-6 flex-1">
                                Cancel this membership? This stops future charges and shipments. Pausing preserves your founding rate — canceling ends it.
                              </p>
                              <button onClick={() => runAction(m.id, 'cancel')} disabled={busy} className={BTN_DANGER}>
                                Yes, Cancel
                              </button>
                              <button onClick={() => setConfirmCancelId(null)} disabled={busy} className={BTN}>
                                Keep
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setConfirmCancelId(m.id)} disabled={busy} className={BTN_DANGER}>
                              Cancel Membership
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            <button onClick={() => { setMemberships(null); setConfirmCancelId(null); }} className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-300 transition-colors self-start">
              ← Search another membership
            </button>
          </div>
        )}

        <div className="mt-16 border-t border-zinc-900 pt-8 flex flex-col gap-3 max-w-2xl">
          <p className="text-xs font-mono text-zinc-600 leading-6">
            Need help? Contact{' '}
            <a href="mailto:jonassaint@queerpathways.org" className="text-zinc-400 underline hover:text-zinc-200 transition-colors">
              jonassaint@queerpathways.org
            </a>{' '}
            with your order or subscription reference.
          </p>
          <Link href="/refund-policy" className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-300 transition-colors">
            Refund & Return Policy →
          </Link>
        </div>
      </div>
    </div>
  );
}
