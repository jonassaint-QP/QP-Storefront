'use client';

import { useEffect, useRef, useState } from 'react';

const AGE_GATE_KEY = 'sqp_age_verified';

function AgeGateScreen({
  onEnter,
  onExit,
}: {
  onEnter: () => void;
  onExit: () => void;
}) {
  const enterRef = useRef<HTMLButtonElement>(null);

  // Move focus to the primary action on mount
  useEffect(() => {
    enterRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-description"
    >
      <div className="w-full max-w-lg border border-zinc-800 p-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <p className="text-xs tracking-[0.3em] text-zinc-600 font-mono uppercase">
            [ ACCESS VERIFICATION REQUIRED ]
          </p>
          <h1
            id="age-gate-title"
            className="text-5xl font-black tracking-tight text-white uppercase leading-none"
          >
            Queer<br />Pathways
          </h1>
          <p className="text-xs tracking-[0.2em] text-zinc-500 font-mono uppercase">
            High-Fidelity Kink Infrastructure
          </p>
        </div>

        <hr className="border-zinc-800" />

        {/* Body */}
        <div id="age-gate-description" className="flex flex-col gap-4">
          <p className="text-zinc-300 text-sm leading-7 font-mono">
            This site contains{' '}
            <strong className="text-white">explicit adult content</strong>{' '}
            designed for consenting adults. You must be{' '}
            <strong className="text-white">18 years of age or older</strong>{' '}
            to enter.
          </p>
          <p className="text-zinc-500 text-sm leading-7 font-mono">
            Do not enter if viewing adult content is prohibited by law in your
            jurisdiction.
          </p>
        </div>

        <hr className="border-zinc-800" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            ref={enterRef}
            onClick={onEnter}
            className="flex-1 h-12 bg-white text-black text-sm font-bold tracking-[0.15em] uppercase transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            I Am 18+ — Enter
          </button>
          <button
            onClick={onExit}
            className="flex-1 h-12 border border-zinc-700 text-zinc-400 text-sm font-bold tracking-[0.15em] uppercase transition-colors hover:border-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-500 focus-visible:outline-offset-2"
          >
            Exit
          </button>
        </div>

        {/* Legal */}
        <p className="text-zinc-700 text-xs leading-6 font-mono">
          By entering, you confirm you are 18 or older, that you consent to
          viewing adult content, and that you agree to our{' '}
          <a
            href="/terms"
            className="underline text-zinc-500 transition-colors hover:text-zinc-400"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="underline text-zinc-500 transition-colors hover:text-zinc-400"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function AgeGate({ children }: { children: React.ReactNode }) {
  // null = not yet checked (SSR / first paint), true/false = resolved
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AGE_GATE_KEY);
      setVerified(stored === 'true');
    } catch {
      // localStorage blocked (private browsing restrictions in some browsers)
      setVerified(false);
    }
  }, []);

  function handleEnter() {
    try {
      localStorage.setItem(AGE_GATE_KEY, 'true');
    } catch {
      // Proceed even if storage write fails
    }
    setVerified(true);
  }

  function handleExit() {
    window.location.assign('https://www.google.com');
  }

  // Render a black screen while we hydrate — prevents any content flash
  if (verified === null) {
    return <div className="fixed inset-0 z-50 bg-black" aria-hidden="true" />;
  }

  if (!verified) {
    return <AgeGateScreen onEnter={handleEnter} onExit={handleExit} />;
  }

  return <>{children}</>;
}
