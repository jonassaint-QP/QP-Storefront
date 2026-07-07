import type { CategorySlug } from '@/lib/products';
import { MOCK_REVIEWS, averageRating } from '@/lib/reviews';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

export default function ReviewSection({ category }: { category: CategorySlug }) {
  const reviews = MOCK_REVIEWS.filter((r) => r.category === category);
  const overallAvg =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + averageRating(r.ratings), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <section className="border-t border-zinc-800 py-20">

      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
            [ Anonymized Peer Curation ]
          </p>
          <h2 className="text-3xl font-black tracking-tight uppercase text-white">
            Community Feedback
          </h2>
          <p className="text-xs font-mono text-zinc-600 leading-6 max-w-sm mt-1">
            Verified-buyer structural reviews. Pseudonymous handles only — no
            personal information stored or displayed.
          </p>
        </div>
        {overallAvg && (
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="text-4xl font-black text-white tabular-nums">
              {overallAvg}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">
              avg. structural rating
            </span>
            <span className="text-xs font-mono text-zinc-700">
              {reviews.length} verified review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Review cards */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 mb-16">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="border border-zinc-800 p-8 mb-16">
          <p className="text-sm font-mono text-zinc-600">
            No reviews yet. Be the first verified buyer to submit feedback.
          </p>
        </div>
      )}

      {/* Submission form */}
      <ReviewForm category={category} />

    </section>
  );
}
