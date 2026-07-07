import type { Review } from '@/lib/reviews';
import { averageRating, formatReviewDate } from '@/lib/reviews';

function RatingBar({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${score} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={[
            'w-4 h-1',
            i < score ? 'bg-white' : 'bg-zinc-800',
          ].join(' ')}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const avg = averageRating(review.ratings);

  return (
    <article className="border border-zinc-800 p-6 flex flex-col gap-5 bg-black">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-black font-mono tracking-tight text-white uppercase">
              {review.handle}
            </span>
            {review.verifiedBuyer && (
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2 py-0.5">
                Verified
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-zinc-700">
            {formatReviewDate(review.date)}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-xl font-black text-white tabular-nums">
            {avg.toFixed(1)}
          </span>
          <RatingBar score={Math.round(avg)} />
        </div>
      </div>

      <hr className="border-zinc-900" />

      {/* Structural ratings */}
      <div className="grid grid-cols-2 gap-3">
        {review.ratings.map(({ axis, score }) => (
          <div key={axis} className="flex flex-col gap-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-700">
              {axis}
            </span>
            <RatingBar score={score} />
          </div>
        ))}
      </div>

      <hr className="border-zinc-900" />

      {/* Body */}
      <p className="text-sm font-mono text-zinc-500 leading-7">{review.body}</p>
    </article>
  );
}
