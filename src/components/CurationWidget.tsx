'use client';

import { useState, useEffect, useCallback } from 'react';

const STEPS = [
  {
    index: '01',
    duration: 60,
    title: 'Silence the Signal',
    directive: 'Notifications off. Tabs closed. The work day ends here.',
    items: [
      'Phone set to silent or Do Not Disturb',
      'Work applications and browser tabs closed',
      'Inner Auditor: dismissed for the session',
      'Out-of-office set if the window requires it',
    ],
  },
  {
    index: '02',
    duration: 90,
    title: 'Set the Environment',
    directive: 'Establish the perimeter. This space is now operational.',
    items: [
      'Lighting adjusted — dim, colored, or off',
      'Room temperature set to body comfort',
      'Privacy confirmed — door locked if needed',
      'Ambient sound or silence established',
    ],
  },
  {
    index: '03',
    duration: 90,
    title: 'Gear Manifest',
    directive: 'Everything accessible. Nothing requires a scramble.',
    items: [
      'Lube within arm\'s reach',
      'Toys cleaned, ready, and accessible',
      'Water bottle filled and nearby',
      'Recovery pack staged for post-play',
    ],
  },
  {
    index: '04',
    duration: 60,
    title: 'Boundary Calibration',
    directive: 'Review your limits for today. They may differ from the last session.',
    items: [
      'Hard limits for this session identified',
      'Soft limits and check-in signals confirmed',
      'Safe word or signal active',
      'Any partner limits communicated',
    ],
  },
  {
    index: '05',
    duration: 60,
    title: 'Body Dashboard',
    directive: 'Not your history — your body, right now.',
    items: [
      'Hydrated — water in the last hour',
      'Fed — last meal more than 90 minutes ago',
      'No acute physical pain or injury present',
      'Present and grounded in this moment',
    ],
  },
] as const;

type StepState = { checked: boolean[] };

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function CompletedState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-8 py-16 text-center">
      <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
        [ Calibration Complete ]
      </p>
      <h2 className="text-5xl font-black tracking-tight uppercase leading-none text-white">
        You&apos;re Ready.
      </h2>
      <p className="text-sm font-mono text-zinc-500 leading-7 max-w-sm">
        The perimeter is set. The gear is staged. The body is checked in. You
        have externalized every logistical variable.
      </p>
      <div className="border border-zinc-800 p-6 flex flex-col gap-2 max-w-xs w-full">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-700">
          Directive
        </p>
        <p className="text-sm font-mono text-zinc-300 leading-7 font-bold">
          Close this tab. The play window is open.
        </p>
      </div>
      <button
        onClick={onReset}
        className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700 hover:text-zinc-400 transition-colors"
      >
        Reset Ritual
      </button>
    </div>
  );
}

export default function CurationWidget() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [stepStates, setStepStates] = useState<StepState[]>(
    STEPS.map((s) => ({ checked: new Array(s.items.length).fill(false) }))
  );
  const [timeLeft, setTimeLeft] = useState<number>(STEPS[0].duration);
  const [timerRunning, setTimerRunning] = useState(false);

  // Countdown tick
  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) {
      if (timeLeft <= 0) setTimerRunning(false);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning, timeLeft]);

  // Reset timer on step change
  useEffect(() => {
    setTimeLeft(STEPS[currentStep].duration);
    setTimerRunning(false);
  }, [currentStep]);

  const toggleCheck = useCallback((itemIndex: number) => {
    setStepStates((prev) => {
      const next = prev.map((s, i) =>
        i === currentStep
          ? { checked: s.checked.map((v, j) => (j === itemIndex ? !v : v)) }
          : s
      );
      return next;
    });
  }, [currentStep]);

  const allChecked = stepStates[currentStep].checked.every(Boolean);

  function proceed() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  }

  function reset() {
    setCurrentStep(0);
    setCompleted(false);
    setStepStates(STEPS.map((s) => ({ checked: new Array(s.items.length).fill(false) })));
    setTimeLeft(STEPS[0].duration);
    setTimerRunning(false);
  }

  if (completed) return <CompletedState onReset={reset} />;

  const step = STEPS[currentStep];
  const timerProgress = ((step.duration - timeLeft) / step.duration) * 100;
  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="flex flex-col gap-0">

      {/* Step progress rail */}
      <div className="flex items-center gap-px mb-10">
        {STEPS.map((s, i) => (
          <div
            key={s.index}
            className={[
              'flex-1 h-px transition-colors duration-500',
              i < currentStep
                ? 'bg-white'
                : i === currentStep
                ? 'bg-zinc-500'
                : 'bg-zinc-800',
            ].join(' ')}
          />
        ))}
      </div>

      {/* Step header */}
      <div className="flex items-start gap-6 mb-10">
        <span className="text-6xl font-black text-zinc-800 tabular-nums leading-none select-none">
          {step.index}
        </span>
        <div className="flex flex-col gap-1 pt-1">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            Step {currentStep + 1} of {STEPS.length}
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase leading-none text-white">
            {step.title}
          </h2>
          <p className="text-sm font-mono text-zinc-500 leading-6 mt-1">
            {step.directive}
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="border border-zinc-800 flex flex-col divide-y divide-zinc-800 mb-8">
        {step.items.map((item, i) => {
          const checked = stepStates[currentStep].checked[i];
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleCheck(i)}
              className={[
                'flex items-center gap-4 px-6 py-4 text-left transition-colors group',
                checked ? 'bg-zinc-950' : 'bg-black hover:bg-zinc-950',
              ].join(' ')}
              aria-label={`${checked ? 'Uncheck' : 'Check'}: ${item}`}
            >
              {/* Checkbox */}
              <span
                className={[
                  'shrink-0 w-5 h-5 border flex items-center justify-center transition-colors',
                  checked
                    ? 'border-white bg-white'
                    : 'border-zinc-700 group-hover:border-zinc-500',
                ].join(' ')}
                aria-hidden="true"
              >
                {checked && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={[
                  'text-sm font-mono transition-colors leading-6',
                  checked ? 'text-zinc-600 line-through' : 'text-zinc-300',
                ].join(' ')}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timer + action row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">

        {/* Timer */}
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-3">
            <span
              className={[
                'text-2xl font-black tabular-nums font-mono',
                timeLeft === 0 ? 'text-zinc-600' : timerRunning ? 'text-white' : 'text-zinc-500',
              ].join(' ')}
              aria-live="polite"
              aria-label={`Timer: ${formatTime(timeLeft)}`}
            >
              {formatTime(timeLeft)}
            </span>
            <div className="flex gap-2">
              {timeLeft > 0 && (
                <button
                  type="button"
                  onClick={() => setTimerRunning((v) => !v)}
                  className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-600 hover:text-zinc-300 transition-colors border border-zinc-800 px-3 py-1"
                >
                  {timerRunning ? 'Pause' : 'Start Timer'}
                </button>
              )}
              {timeLeft < step.duration && timeLeft > 0 && (
                <button
                  type="button"
                  onClick={() => { setTimeLeft(0); setTimerRunning(false); }}
                  className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-700 hover:text-zinc-500 transition-colors"
                >
                  Skip
                </button>
              )}
            </div>
          </div>
          {/* Timer progress bar */}
          <progress
            value={timerProgress}
            max={100}
            aria-label="Timer progress"
            className="timer-progress h-px w-40 block"
          />
          <p className="text-xs font-mono text-zinc-700">
            Advisory — {Math.ceil(step.duration / 60)} min suggested for this step
          </p>
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={proceed}
          disabled={!allChecked}
          className={[
            'h-12 px-8 text-xs font-bold tracking-[0.2em] uppercase font-mono transition-colors',
            allChecked
              ? 'bg-white text-black hover:bg-zinc-100'
              : 'bg-zinc-900 text-zinc-700 cursor-not-allowed',
          ].join(' ')}
        >
          {isLastStep ? 'Begin →' : `Step ${currentStep + 2} →`}
        </button>
      </div>

      {!allChecked && (
        <p className="text-xs font-mono text-zinc-700 mt-3">
          Check all items to proceed.
        </p>
      )}
    </div>
  );
}
