import type { Metadata } from 'next';
import CurationWidget from '@/components/CurationWidget';

export const metadata: Metadata = {
  title: 'Prepare — Queer Pathways',
  description:
    'The 5-Minute Curation Widget. A tactical pause bridge to transition from screen fatigue into high-fidelity play states.',
  robots: { index: false, follow: false },
};

export default function PreparePage() {
  return (
    <div className="flex flex-col">

      {/* Page header */}
      <div className="border-b border-zinc-800 px-6 py-16 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 max-w-xl">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Tactical Pause Bridge ]
          </p>
          <h1 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
            The 5-Minute<br />Curation Ritual
          </h1>
          <p className="text-sm font-mono text-zinc-500 leading-7 mt-2 max-w-lg">
            A step-by-step pre-play calibration sequence. Works through five
            operational checkpoints — silencing noise, setting the environment,
            staging gear, calibrating boundaries, and checking in with the body.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-8">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-5 gap-px bg-zinc-800">
          {[
            ['01', 'Silence', '1 min'],
            ['02', 'Environment', '90 sec'],
            ['03', 'Gear', '90 sec'],
            ['04', 'Boundaries', '1 min'],
            ['05', 'Body', '1 min'],
          ].map(([num, label, time]) => (
            <div key={num} className="bg-zinc-950 px-5 py-4 flex flex-col gap-1">
              <span className="text-xs font-mono text-zinc-700">{num}</span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {label}
              </span>
              <span className="text-xs font-mono text-zinc-700">{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget */}
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <CurationWidget />
      </div>

      {/* Footer note */}
      <div className="border-t border-zinc-800 px-6 py-10 mx-auto w-full max-w-7xl">
        <div className="max-w-lg flex flex-col gap-3">
          <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-700">
            [ Why This Exists ]
          </p>
          <p className="text-xs font-mono text-zinc-600 leading-7">
            The transition from mundane work screen fatigue into a high-fidelity
            play state requires a deliberate structural bridge. Without it, the
            nervous system carries the previous context into the space — fragmenting
            presence and degrading the quality of the experience. This ritual
            externalizes that transition so the brain doesn&apos;t have to hold it.
          </p>
        </div>
      </div>

    </div>
  );
}
