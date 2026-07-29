import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { getDb } from '../../../../../db';
import { storeOrders } from '../../../../../db/schema';

const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://queerpathways.com';
// PaymentCloud uses their own branded gateway URL — do not hardcode secure.networkmerchants.com
const NMI_THREE_STEP =
  process.env.NMI_GATEWAY_URL ?? 'https://secure.networkmerchants.com/api/v2/three-step';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req);
}

async function handleStep3(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const tokenId = url.searchParams.get('token-id');

  if (!tokenId) {
    console.error('[webhook] Step-3 missing token-id');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=payment_failed`);
  }

  if (!NMI_SECURITY_KEY) {
    console.error('[webhook] NMI_SECURITY_KEY not set');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`);
  }

  try {
    const nmiXml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<complete-action>`,
      `  <api-key>${NMI_SECURITY_KEY}</api-key>`,
      `  <token-id>${tokenId}</token-id>`,
      `</complete-action>`,
    ].join('\n');

    const res = await fetch(NMI_THREE_STEP, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: nmiXml,
    });

    const text = await res.text();
    console.info('[webhook] NMI Step-3 response:', text.slice(0, 300));

    const resultMatch = text.match(/<result>([^<]+)<\/result>/);
    const resultTextMatch = text.match(/<result-text>([^<]+)<\/result-text>/);
    // <orderid> as sent in Step 1 comes back as <order-id> on completion.
    const orderId = parseOrderId(text);
    const transactionId = text.match(/<transaction-id>([^<]+)<\/transaction-id>/)?.[1] ?? null;

    if (resultMatch && resultMatch[1] === '1') {
      console.info('[webhook] Charge approved for order', orderId);
      await settleOrder(orderId, {
        status: 'paid',
        transactionId,
        gatewayMessage: resultTextMatch?.[1] ?? 'Approved',
      });
      return NextResponse.redirect(`${SITE_URL}/order/confirmed`, { status: 303 });
    } else {
      const errorMsg = resultTextMatch ? resultTextMatch[1] : 'Payment declined';
      console.warn('[webhook] Charge declined:', errorMsg);
      await settleOrder(orderId, {
        status: 'failed',
        transactionId,
        gatewayMessage: errorMsg,
      });
      return NextResponse.redirect(
        `${SITE_URL}/checkout?error=${encodeURIComponent(errorMsg)}`,
        { status: 303 },
      );
    }
  } catch (err) {
    console.error('[webhook] Step-3 failed', err);
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`, { status: 303 });
  }
}

/** Pull our own order id back out of the completion response. */
function parseOrderId(xml: string): number | null {
  const raw = xml.match(/<order-?id>([^<]+)<\/order-?id>/)?.[1]?.trim();
  if (!raw) return null;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/**
 * Moves a pending order to its final state.
 *
 * Scoped to `status = 'pending'` so a replayed callback cannot re-stamp an order
 * that has already settled, and so a decline can never overwrite a paid order.
 * Failures are logged rather than thrown: the charge has already happened at the
 * gateway, so the customer must still reach the confirmation page. A row left on
 * 'pending' with money taken is a reconciliation task, not a customer-facing
 * error.
 */
async function settleOrder(
  orderId: number | null,
  update: { status: 'paid' | 'failed'; transactionId: string | null; gatewayMessage: string },
): Promise<void> {
  if (orderId === null) {
    console.error('[webhook] No order-id in gateway response — order not settled');
    return;
  }

  try {
    const settled = await getDb()
      .update(storeOrders)
      .set({
        status: update.status,
        transactionId: update.transactionId,
        gatewayMessage: update.gatewayMessage,
        paidAt: update.status === 'paid' ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(and(eq(storeOrders.id, orderId), eq(storeOrders.status, 'pending')))
      .returning({ id: storeOrders.id });

    if (settled.length === 0) {
      console.warn('[webhook] Order', orderId, 'was not pending — left unchanged');
      return;
    }
    console.info('[webhook] Order', orderId, 'marked', update.status);
  } catch (err) {
    console.error('[webhook] Could not update order', orderId, err);
  }
}

