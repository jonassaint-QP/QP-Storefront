'use client';

import { useState, useId } from 'react';
import type { CategorySlug } from '@/lib/products';
import { RATING_AXES, generateHandle } from '@/lib/reviews';
import type { RatingScore } from '@/lib/reviews';

const MAX_BODY_LENGTH = 1200;

function RatingInput({
  axis,
  value,
  onChange,
}: {
  axis: string;
  value: RatingScore | 0;
  onChange: (score: RatingScore) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
        {axis}
      </span>
      <div className="flex gap-1" aria-label={`Rating for ${axis}`}>
        {([1, 2, 3, 4, 5] as RatingScore[]).map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            aria-label={`Rate ${score} of 5 for ${axis}`}
            className={[
              'w-8 h-2 transition-colors',
              value >= score ? 'bg-white' : 'bg-zinc-800 hover:bg-zinc-600',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReviewForm({ category }: { category: CategorySlug }) {
  const formId = useId();
  const axes = RATING_AXES[category];

  const [handle, setHandle] = useState(() => generateHandle());
  const [ratings, setRatings] = useState<Record<string, RatingScore | 0>>(
    Object.fromEntries(axes.map((a) => [a, 0]))
  );
  const [body, setBody] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const allRated = axes.every((a) => ratings[a] > 0);
  const bodyTrimmed = body.trim();
  const canSubmit = handle.trim().length > 0 && allRated && bodyTrimmed.length >= 20;

  function setRating(axis: string, score: RatingScore) {
    setRatings((prev) => ({ ...prev, [axis]: score }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validate handle — no URLs, no email patterns
    const handleVal = handle.trim();
    if (handleVal.length < 3 || handleVal.length > 40) {
      setError('Handle must be between 3 and 40 characters.');
      return;
    }
    if (/https?:\/\//i.test(handleVal) || /@/.test(handleVal)) {
      setError('Handle cannot contain URLs or email addresses.');
      return;
    }
    if (bodyTrimmed.length < 20) {
      setError('Feedback must be at least 20 characters.');
      return;
    }
    if (bodyTrimmed.length > MAX_BODY_LENGTH) {
      setError(`Feedback must be under ${MAX_BODY_LENGTH} characters.`);
      return;
    }
    // URL pattern in body
    if (/https?:\/\//i.test(bodyTrimmed)) {
      setError('Feedback cannot contain URLs.');
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-zinc-800 p-8 flex flex-col gap-4">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
          [ Feedback Received ]
        </p>
        <p className="text-sm font-black font-mono uppercase text-white">
          Review queued for verification.
        </p>
        <p className="text-xs font-mono text-zinc-600 leading-7">
          Verified-buyer reviews are confirmed against order records before
          publication. Your handle <strong className="text-zinc-400">{handle}</strong> will
          appear in place of any personal information. No identifying data is
          associated with this submission.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setHandle(generateHandle());
            setRatings(Object.fromEntries(axes.map((a) => [a, 0])));
            setBody('');
          }}
          className="w-fit text-xs font-mono uppercase tracking-[0.15em] text-zinc-700 hover:text-zinc-400 transition-colors"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      className="border border-zinc-800 p-8 flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
          [ Leave Feedback ]
        </p>
        <p className="text-xs font-mono text-zinc-700 leading-6">
          Structural descriptors only — texture, tensile performance, sizing
          accuracy. No personal information required or stored.
        </p>
      </div>

      {/* Pseudonym */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor={`${formId}-handle`}
          className="text-xs font-mono uppercase tracking-widest text-zinc-600"
        >
          Your Handle (Pseudonym)
        </label>
        <div className="flex gap-2">
          <input
            id={`${formId}-handle`}
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            maxLength={40}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
            placeholder="e.g. TacticalPilot_847"
          />
          <button
            type="button"
            onClick={() => setHandle(generateHandle())}
            className="h-10 px-4 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-300 hover:border-zinc-600 transition-colors shrink-0"
          >
            Regenerate
          </button>
        </div>
        <p className="text-xs font-mono text-zinc-800">
          No real name. No email. This handle is all that appears publicly.
        </p>
      </div>

      {/* Structural ratings */}
      <div className="flex flex-col gap-4">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-600">
          Structural Ratings
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {axes.map((axis) => (
            <RatingInput
              key={axis}
              axis={axis}
              value={ratings[axis]}
              onChange={(score) => setRating(axis, score)}
            />
          ))}
        </div>
      </div>

      {/* Feedback body */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor={`${formId}-body`}
          className="text-xs font-mono uppercase tracking-widest text-zinc-600"
        >
          Structural Feedback
        </label>
        <textarea
          id={`${formId}-body`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={MAX_BODY_LENGTH}
          rows={5}
          className="bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors resize-none leading-7"
          placeholder="Describe the material performance, sizing accuracy, viscosity consistency, build quality — anything load-bearing and functional. No personal details."
        />
        <div className="flex justify-between text-xs font-mono text-zinc-800">
          <span>Min 20 characters</span>
          <span>{body.length} / {MAX_BODY_LENGTH}</span>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-xs font-mono text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={[
          'h-12 px-8 w-fit text-xs font-bold tracking-[0.2em] uppercase font-mono transition-colors',
          canSubmit
            ? 'bg-white text-black hover:bg-zinc-100'
            : 'bg-zinc-900 text-zinc-700 cursor-not-allowed',
        ].join(' ')}
      >
        Submit Feedback
      </button>
    </form>
  );
}
