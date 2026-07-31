import { after, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { store_orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { processFulfillmentDispatch } from '@/lib/fulfillment';

export async function GET(request: Request) {
  // 1. Extract token-id appended by the NMI gateway redirect
  const { searchParams } = new URL(request.url);
  const tokenId = searchParams.get('token-id');

  if (!tokenId) {
    console.error('NMI Webhook Error: Missing token-id');
    return NextResponse.redirect(new URL('/checkout/error?reason=missing_token', request.url));
  }

  try {
    const nmiSecurityKey = process.env.NMI_SECURITY_KEY;

    // 2. Step 3 of NMI Three-Step Redirect: finalize the transaction
    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
      <complete-action>
        <api-key>${nmiSecurityKey}</api-key>
        <token-id>${tokenId}</token-id>
      </complete-action>`;

    const nmiResponse = await fetch('https://secure.networkmerchants.com/api/v2/three-step', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlPayload,
    });

    const nmiXmlResponse = await nmiResponse.text();

    // NMI result codes: 1 = Approved, 2 = Declined, 3 = Error
    const resultMatch = nmiXmlResponse.match(/<result>(.*?)<\/result>/);
    const orderIdMatch = nmiXmlResponse.match(/<order-id>(.*?)<\/order-id>/);
    const resultTextMatch = nmiXmlResponse.match(/<result-text>(.*?)<\/result-text>/);
    const transactionIdMatch = nmiXmlResponse.match(/<transaction-id>(.*?)<\/transaction-id>/);

    const result = resultMatch ? resultMatch[1] : '3';
    const orderId = orderIdMatch ? parseInt(orderIdMatch[1], 10) : null;
    const transactionId = transactionIdMatch ? transactionIdMatch[1] : null;

    if (!orderId) {
      console.error('NMI Webhook Error: Missing order-id in final response', nmiXmlResponse);
      return NextResponse.redirect(new URL('/checkout/error?reason=gateway_error', request.url));
    }

    const paymentStatus = result === '1' ? 'paid' : 'failed';

    const [updatedOrder] = await getDb().update(store_orders)
      .set({ status: paymentStatus, transactionId, updatedAt: new Date() })
      .where(eq(store_orders.id, orderId))
      .returning();

    if (result === '1' && updatedOrder) {
      // Background non-blocking execution using Next.js after()
      after(async () => {
        await processFulfillmentDispatch(updatedOrder);
      });

      return NextResponse.redirect(new URL(`/checkout/success?orderId=${orderId}`, request.url));
    } else {
      const reason = resultTextMatch ? encodeURIComponent(resultTextMatch[1]) : 'declined';
      return NextResponse.redirect(new URL(`/checkout/error?reason=${reason}`, request.url));
    }

  } catch (error) {
    console.error('Finalization Execution Error:', error);
    return NextResponse.redirect(new URL('/checkout/error?reason=internal_error', request.url));
  }
}

