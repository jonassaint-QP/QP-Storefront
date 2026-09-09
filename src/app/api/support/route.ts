import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { store_orders } from '@/db/schema';

export const runtime = 'nodejs';

const TOPICS = ['Orders', 'Billing', 'Returns', 'Cancellations', 'Other'] as const;

/**
 * POST /api/support
 *
 * No mail-sending library or transactional sender is configured in this repo
 * (no Resend, no Postmark, no Nodemailer, no SMTP env vars). Persisting the
 * submission to the database is the honest capability available; a future
 * transactional-sender integration can forward these rows to
 * jonassaint@queerpathways.org. The route returns a clear confirmation to
 * the customer.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const topic = String(body?.topic ?? '').trim();
    const reference = String(body?.reference ?? '').trim();
    const message = String(body?.message ?? '').trim();

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid name and email are required.' }, { status: 400 });
    }
    if (!(TOPICS as readonly string[]).includes(topic)) {
      return NextResponse.json({ error: 'Please select a valid topic.' }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: 'A message is required.' }, { status: 400 });
    }

    const db = getDb();
    await db.insert(store_orders).values({
      customerName: name,
      email,
      totalAmount: '0.00',
      status: 'support',
      items: { kind: 'support-message', topic, reference: reference || null, message },
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: 'Thank you. Your message has been received and we will get back to you at ' + email + '.',
    });
  } catch (error) {
    console.error('Support form error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}