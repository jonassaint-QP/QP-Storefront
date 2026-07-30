import { after, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { store_orders } from '@/db/schema';
import { eq, gte, and, sql } from 'drizzle-orm';

// Hard cap negotiated with merchant processor
const MONTHLY_VOLUME_LIMIT = 25000;
const WARNING_THRESHOLD = MONTHLY_VOLUME_LIMIT * 0.85; // $21,250

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems, customerInfo, currency = 'USD' } = body;

    // 1. Calculate final total server-side to prevent tampering
    const amount = calculateTotal(cartItems, currency);
    const numericAmount = parseFloat(amount);

    // 2. Velocity check: rolling 30-day paid volume
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const volumeResult = await getDb()
      .select({ totalVolume: sql<number>`sum(${store_orders.totalAmount})` })
      .from(store_orders)
      .where(
        and(
          eq(store_orders.status, 'paid'),
          gte(store_orders.updatedAt, thirtyDaysAgo)
        )
      );

    const currentVolume = volumeResult[0]?.totalVolume || 0;
    const projectedVolume = currentVolume + numericAmount;

    // 3. Enforce the hard cap (100%)
    if (projectedVolume > MONTHLY_VOLUME_LIMIT) {
      console.warn(`[VELOCITY LIMIT BREACHED] Transaction rejected. Projected volume: $${projectedVolume}`);
      return NextResponse.json(
        { error: 'We are currently unable to process new orders. Please contact support.' },
        { status: 429 }
      );
    }

    // 4. Soft warning alert (85%) — runs after response via context.waitUntil()
    if (projectedVolume >= WARNING_THRESHOLD) {
      after(async () => {
        try {
          await triggerAdminAlert(projectedVolume);
        } catch (err) {
          console.error('Failed to send admin velocity alert:', err);
        }
      });
    }

    // 5. Persist pending order via Drizzle
    const [newOrder] = await getDb().insert(store_orders).values({
      customerName: customerInfo.name,
      email: customerInfo.email,
      totalAmount: String(numericAmount),
      status: 'pending',
      createdAt: new Date(),
    }).returning({ id: store_orders.id });

    // 4. Step 1 of NMI Three-Step Redirect — server-to-server only
    const nmiSecurityKey = process.env.NMI_SECURITY_KEY;
    // DEPLOY_PRIME_URL is set by Netlify in preview/branch deploys; falls back to production
    const baseUrl = process.env.DEPLOY_PRIME_URL || process.env.NEXT_PUBLIC_SITE_URL;
    const redirectUrl = `${baseUrl}/api/webhooks/payment`;

    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
      <sale>
        <api-key>${nmiSecurityKey}</api-key>
        <redirect-url>${redirectUrl}</redirect-url>
        <amount>${amount}</amount>
        <order-id>${newOrder.id}</order-id>
      </sale>`;

    const nmiResponse = await fetch('https://secure.networkmerchants.com/api/v2/three-step', {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xmlPayload,
    });

    const nmiXmlResponse = await nmiResponse.text();
    const formUrlMatch = nmiXmlResponse.match(/<form-url>(.*?)<\/form-url>/);

    if (!formUrlMatch || !formUrlMatch[1]) {
      console.error('NMI Gateway Error:', nmiXmlResponse);
      return NextResponse.json({ error: 'Failed to initialize payment gateway.' }, { status: 500 });
    }

    return NextResponse.json({ formUrl: formUrlMatch[1], orderId: newOrder.id });

  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error('Checkout Initialization Error:', { message: errMessage, stack: errStack });
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: errMessage,
      },
      { status: 500 },
    );
  }
}

async function triggerAdminAlert(projectedVolume: number): Promise<void> {
  console.warn(`[VELOCITY SOFT WARNING] Volume is at $${projectedVolume}, exceeding the 85% threshold.`);

  const webhookUrl = process.env.ADMIN_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🚨 High Volume Alert: Rolling 30-day merchant volume is projected at $${projectedVolume.toFixed(2)}, exceeding the 85% threshold of your $25,000 limit. Consider requesting a limit increase from PaymentCloud.`,
    }),
  });
}

function calculateTotal(
  items: { price: number; quantity: number }[] | undefined,
  currency: string,
): string {
  // TODO: replace with DB-backed pricing lookup to prevent price injection
  if (!items || !Array.isArray(items)) {
    console.warn('[Checkout Warning] calculateTotal received undefined or invalid cartItems.');
    return '0.00';
  }
  const baseUSD = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  // 1 USD = 1.38 CAD
  return (currency === 'CAD' ? baseUSD * 1.38 : baseUSD).toFixed(2);
}

