import { NextResponse } from 'next/server';
import { db } from '@/db';
import { store_orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

    const result = resultMatch ? resultMatch[1] : null;
    const orderId = orderIdMatch ? parseInt(orderIdMatch[1], 10) : null;

    if (!orderId) {
      console.error('NMI Webhook Error: Missing order-id in final response', nmiXmlResponse);
      return NextResponse.redirect(new URL('/checkout/error?reason=gateway_error', request.url));
    }

    // 4. Update order status in Postgres via Drizzle
    if (result === '1') {
      await db.update(store_orders)
        .set({ status: 'paid', updatedAt: new Date() })
        .where(eq(store_orders.id, orderId));

      return NextResponse.redirect(new URL(`/checkout/success?order=${orderId}`, request.url));
    } else {
      await db.update(store_orders)
        .set({ status: 'failed', updatedAt: new Date() })
        .where(eq(store_orders.id, orderId));

      const reason = resultTextMatch ? encodeURIComponent(resultTextMatch[1]) : 'declined';
      return NextResponse.redirect(new URL(`/checkout/error?reason=${reason}`, request.url));
    }

  } catch (error) {
    console.error('Finalization Execution Error:', error);
    return NextResponse.redirect(new URL('/checkout/error?reason=internal_error', request.url));
  }
}

