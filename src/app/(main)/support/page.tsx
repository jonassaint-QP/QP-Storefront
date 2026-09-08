import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support — Queer Pathways',
  description: 'Get help with your Queer Pathways order or Sovereign Body Lube Club membership.',
};

const TOPICS = ['Orders', 'Billing', 'Returns', 'Cancellations', 'Other'] as const;

export default function SupportPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs tracking-[0.35em] font-mono uppercase text-[#CBB26A]">
          [ Customer Support ]
        </p>
        <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-[#CBB26A]">
          Support
        </h1>
        <p className="text-sm font-mono text-zinc-400 leading-7">
          We're here for order questions, membership help, and everything between.
          Pick a topic, tell us about your order or membership, and we'll take it from there.
        </p>
      </div>

      <form
        action="/api/support"
        method="POST"
        className="flex flex-col gap-6 border border-zinc-800 bg-[#153009] p-8"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="h-11 bg-black border border-zinc-700 px-4 text-sm font-mono text-[#C0BFBC] placeholder:text-zinc-600 focus:outline-none focus:border-[#D3B127]"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="h-11 bg-black border border-zinc-700 px-4 text-sm font-mono text-[#C0BFBC] placeholder:text-zinc-600 focus:outline-none focus:border-[#D3B127]"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="topic" className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            required
            className="h-11 bg-black border border-zinc-700 px-4 text-sm font-mono text-[#C0BFBC] focus:outline-none focus:border-[#D3B127]"
          >
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="reference" className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Order / Membership Reference
          </label>
          <input
            id="reference"
            name="reference"
            type="text"
            className="h-11 bg-black border border-zinc-700 px-4 text-sm font-mono text-[#C0BFBC] placeholder:text-zinc-600 focus:outline-none focus:border-[#D3B127]"
            placeholder="Order # or membership email (optional)"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="bg-black border border-zinc-700 px-4 py-3 text-sm font-mono text-[#C0BFBC] placeholder:text-zinc-600 focus:outline-none focus:border-[#D3B127] resize-y"
            placeholder="How can we help?"
          />
        </div>

        <button
          type="submit"
          className="h-12 bg-[#D3B127] text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#CBB26A] transition-colors disabled:opacity-50"
        >
          Submit
        </button>
      </form>

      <div className="flex flex-col gap-2 border-t border-zinc-900 pt-6">
        <p className="text-xs font-mono text-zinc-600">
          Prefer email? You can also reach us at the support address shown on your order confirmation.
        </p>
        <p className="text-xs font-mono text-zinc-600">
          For subscription changes — pause, skip, or cancel — visit{' '}
          <Link href="/membership/manage" className="text-[#CBB26A] underline hover:text-[#D3B127] transition-colors">
            /membership/manage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}