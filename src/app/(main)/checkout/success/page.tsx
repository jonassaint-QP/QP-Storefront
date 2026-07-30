import Link from 'next/link';

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderId = order || 'Unknown';

  return (
    <div className="max-w-md mx-auto p-8 mt-12 bg-white rounded-lg shadow-md border border-gray-200 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Secured</h1>

      <p className="text-gray-600 mb-6">
        Your order has been successfully processed. Your reference number is <strong>#{orderId}</strong>.
      </p>

      <div className="p-4 bg-gray-50 rounded-md mb-8 border border-gray-100">
        <p className="text-sm text-gray-700">
          As promised, all items will be shipped in plain, unbranded packaging with a non-descript return address to protect your privacy.
        </p>
      </div>

      <Link
        href="/shop"
        className="inline-block bg-[#46287a] text-white font-bold py-3 px-8 rounded hover:opacity-90 transition-opacity"
      >
        Return to Store
      </Link>
    </div>
  );
}
