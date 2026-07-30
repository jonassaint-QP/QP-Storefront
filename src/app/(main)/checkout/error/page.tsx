import Link from 'next/link';

interface ErrorPageProps {
  searchParams: Promise<{ orderId?: string; reason?: string }>;
}

function getErrorMessage(code?: string): string {
  switch (code) {
    case 'missing_token':
      return 'We lost the secure connection to the payment gateway. Your card was not charged.';
    case 'internal_error':
      return 'A system error interrupted your transaction before it could complete. Please try again.';
    case 'gateway_error':
      return 'The payment gateway did not return a valid response. Your card was not charged.';
    default:
      return code
        ? code // pass NMI result-text directly (e.g. "Insufficient Funds")
        : 'Your payment was declined. Please verify your details or try a different card.';
  }
}

export default async function CheckoutErrorPage({ searchParams }: ErrorPageProps) {
  const { orderId, reason } = await searchParams;

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 text-center border-t-4 border-red-600 bg-white shadow-sm rounded">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout Incomplete</h1>
      <p className="mb-6 text-gray-700 text-lg">{getErrorMessage(reason)}</p>

      {orderId && (
        <p className="text-sm text-gray-400 mb-8">Reference: {orderId}</p>
      )}

      <Link
        href="/cart"
        className="bg-gray-800 text-white px-8 py-3 rounded font-bold hover:bg-gray-700 transition-colors inline-block"
      >
        Return to Cart
      </Link>
    </div>
  );
}
