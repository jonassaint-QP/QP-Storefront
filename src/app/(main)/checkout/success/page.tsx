import Link from 'next/link';

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 text-center border border-gray-200 rounded shadow-sm">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful</h1>
      <p className="mb-6 text-lg">Thank you. Your transaction has been securely processed and your somatic gear is being prepared.</p>

      {orderId && (
        <div className="bg-gray-50 p-4 rounded mb-8 inline-block mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Order Reference</p>
          <p className="font-mono font-medium">{orderId}</p>
        </div>
      )}

      <div>
        <Link
          href="/shop"
          className="bg-[#46287a] text-white px-8 py-3 rounded font-bold hover:bg-[#de7e0d] transition-colors inline-block"
        >
          Return to Storefront
        </Link>
      </div>
    </div>
  );
}
