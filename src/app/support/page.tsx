'use client';

import { useState } from 'react';

type Topic = 'Orders' | 'Billing' | 'Returns' | 'Cancellations' | 'Other';
const TOPICS: Topic[] = ['Orders', 'Billing', 'Returns', 'Cancellations', 'Other'];

const FIELD =
  'h-10 bg-[#020501] border border-[#153009] px-4 text-sm font-mono text-[#CBB26A] placeholder-[#153009] focus:outline-none focus:border-[#D3B127] transition-colors';
const AREA =
  'bg-[#020501] border border-[#153009] px-4 py-3 text-sm font-mono text-[#CBB26A] placeholder-[#153009] focus:outline-none focus:border-[#D3B127] transition-colors min-h-36';

export default function SupportPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', reference: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  function setField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setStatus(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setBusy(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          reference: form.reference.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ ok: false, text: data.error ?? 'Your message could not be sent right now. Please email jonassaint@queerpathways.org directly.' });
        return;
      }
      setForm({ name: '', email: '', topic: '', reference: '', message: '' });
      setStatus({ ok: true, text: data.message ?? 'Thank you. Your message has been received.' });
    } catch {
      setStatus({ ok: false, text: 'Network error. Please try again or email jonassaint@queerpathways.org directly.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-[#153009] px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-[#D3B127]">
            [ Customer Service ]
          </p>
          <h1 className="text-5xl font-black tracking-tight uppercase leading-none text-[#CBB26A]">
            Retail Support
          </h1>
          <p className="text-sm font-mono text-[#CBB26A] leading-7">
            Orders, billing, returns, and membership questions. Gear, not medicine. No retention scripts, no runaround — just a straight answer.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <form onSubmit={handleSubmit} className="max-w-xl flex flex-col gap-6 bg-[#153009] border border-[#153009] p-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="s-name" className="text-xs font-mono uppercase tracking-widest text-[#CBB26A]">Name</label>
            <input id="s-name" required autoComplete="name" value={form.name} onChange={(e) => setField('name', e.target.value)} className={FIELD} placeholder="Your name" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="s-email" className="text-xs font-mono uppercase tracking-widest text-[#CBB26A]">Email</label>
            <input id="s-email" type="email" required autoComplete="email" value={form.email} onChange={(e) => setField('email', e.target.value)} className={FIELD} placeholder="you@example.com" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="s-topic" className="text-xs font-mono uppercase tracking-widest text-[#CBB26A]">Topic</label>
            <select id="s-topic" required value={form.topic} onChange={(e) => setField('topic', e.target.value)} className={FIELD + ' appearance-none'}>
              <option value="" disabled>Select a topic</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="s-reference" className="text-xs font-mono uppercase tracking-widest text-[#CBB26A]">Order or Membership Reference <span className="opacity-60">(optional)</span></label>
            <input id="s-reference" value={form.reference} onChange={(e) => setField('reference', e.target.value)} className={FIELD} placeholder="Found in your confirmation email" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="s-message" className="text-xs font-mono uppercase tracking-widest text-[#CBB26A]">Message</label>
            <textarea id="s-message" required value={form.message} onChange={(e) => setField('message', e.target.value)} className={AREA} placeholder="How can we help?" />
          </div>
          {status && (
            <p role="status" className="text-xs font-mono leading-6 text-[#D3B127]">
              {status.text}
            </p>
          )}
          <button type="submit" disabled={busy} className="h-12 px-8 w-full max-w-xs bg-[#D3B127] text-[#020501] text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:brightness-110 disabled:opacity-50">
            {busy ? 'Sending…' : 'Send Message'}
          </button>
          <p className="text-xs font-mono text-[#CBB26A] leading-6">
            Prefer email? Write to{' '}
            <a href="mailto:jonassaint@queerpathways.org" className="underline hover:brightness-110 transition-colors">jonassaint@queerpathways.org</a>.
          </p>
        </form>
      </section>
    </div>
  );
}