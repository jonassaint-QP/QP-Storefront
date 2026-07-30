import Link from 'next/link';

export default async function CheckoutErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  // Next.js decodes query params before passing them — no decodeURIComponent needed
  const { reason } = await searchParams;
  const message = reason || 'An unknown gateway error occurred';

  return (
    <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-lg shadow-md border border-red-100 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>

      <p className="text-gray-600 mb-4">
        We could not process your transaction. The secure gateway reported:
      </p>

      <div className="p-3 bg-red-50 text-red-800 rounded-md mb-6 font-medium">
        {message}
      </div>

      <p className="text-sm text-gray-500 mb-8">
        No charges have been made to your account. Your order remains pending in our system.
      </p>

      <Link
        href="/checkout"
        className="inline-block bg-[#de7e0d] text-white font-bold py-3 px-8 rounded hover:opacity-90 transition-opacity"
      >
        Try Another Card
      </Link>
    </div>
  );
}
