import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUPPORT_EMAIL = 'jonassaint@queerpathways.org';

/**
 * POST /api/support
 *
 * No mail-sending library or transactional sender is configured in this repo.
 * Persist the submission into the subscriptions-adjacent store_orders table
 * is not appropriate (that is order data). This route stores the contact
 * message row so support traffic is not lost and returns a clear message.
 *
 * NOTE: This route does NOT send email to jonassaint@queerpathways.org. The
 * repo has no SMTP/API sender integration (no Resend, no Postmark, no Nodemailer).
 * Persisting to the database is the honest capability available. A future
 * transactional-sender integration can forward these rows.
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
    if (!['Orders', 'Billing', 'Returns', 'Cancellations', 'Other'].includes(topic)) {
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