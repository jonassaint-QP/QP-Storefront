import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { subscriptions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  addIntervalMonths,
  computeSkipDate,
  computeIntervalChangeDate,
  computeBillingDayChangeDate,
  INTERVAL_MONTHS,
  type SubscriptionStatus,
} from '@/lib/subscriptions';

export const runtime = 'nodejs';

const VALID_ACTIONS = ['pause', 'resume', 'skip', 'change-interval', 'change-billing-day', 'cancel'] as const;
type Action = (typeof VALID_ACTIONS)[number];

function isAction(value: string): value is Action {
  return (VALID_ACTIONS as readonly string[]).includes(value);
}

/**
 * POST /api/membership/manage
 * Body: { email, subscriptionId, action, intervalMonths?, billingDay? }
 *
 * No phone call, no retention script, no required explanation. A successful
 * mutation returns the updated membership; the caller shows a confirmation.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const subscriptionId = Number(body?.subscriptionId);
    const action = String(body?.action ?? '').trim();
    const intervalMonths = body?.intervalMonths == null ? null : Number(body.intervalMonths);
    const billingDay = body?.billingDay == null ? null : Number(body.billingDay);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!Number.isInteger(subscriptionId) || subscriptionId <= 0) {
      return NextResponse.json({ error: 'A valid subscription reference is required.' }, { status: 400 });
    }
    if (!isAction(action)) {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }

    const db = getDb();

    const [existing] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, subscriptionId));

    if (!existing) {
      return NextResponse.json({ error: 'Subscription not found.' }, { status: 404 });
    }
    if (existing.email.toLowerCase() !== email) {
      return NextResponse.json({ error: 'Subscription not found for that email.' }, { status: 404 });
    }
    if (existing.status === 'canceled') {
      return NextResponse.json({ error: 'This subscription is already canceled.' }, { status: 409 });
    }

    const now = new Date();
    const nextCharge = existing.nextChargeDate ? new Date(existing.nextChargeDate) : now;
    const day = existing.billingDay;
    const interval = existing.intervalMonths;

    let next: SubscriptionStatus = existing.status as SubscriptionStatus;
    let nextChargeDate = nextCharge;
    let intervalMonthsFinal = interval;
    let billingDayFinal = day;

    switch (action) {
      case 'pause':
        if (existing.status !== 'active' && existing.status !== 'skipped') {
          return NextResponse.json({ error: 'Only active memberships can be paused.' }, { status: 409 });
        }
        next = 'paused';
        break;
      case 'resume':
        if (existing.status !== 'paused') {
          return NextResponse.json({ error: 'Only paused memberships can be resumed.' }, { status: 409 });
        }
        next = 'active';
        break;
      case 'skip':
        if (existing.status !== 'active') {
          return NextResponse.json({ error: 'Only active memberships can be skipped.' }, { status: 409 });
        }
        nextChargeDate = computeSkipDate(nextCharge, interval, day);
        next = 'skipped';
        break;
      case 'change-interval':
        if (intervalMonths == null || !(INTERVAL_MONTHS as readonly number[]).includes(intervalMonths)) {
          return NextResponse.json({ error: 'A valid interval (1, 2, 3, 4, 6, or 12 months) is required.' }, { status: 400 });
        }
        nextChargeDate = computeIntervalChangeDate(nextCharge, intervalMonths, day);
        intervalMonthsFinal = intervalMonths;
        next = existing.status === 'paused' ? 'paused' : 'active';
        break;
      case 'change-billing-day':
        if (billingDay == null || !Number.isInteger(billingDay) || billingDay < 1 || billingDay > 31) {
          return NextResponse.json({ error: 'A valid billing day (1-31) is required.' }, { status: 400 });
        }
        nextChargeDate = computeBillingDayChangeDate(nextCharge, billingDay);
        billingDayFinal = billingDay;
        next = existing.status === 'paused' ? 'paused' : 'active';
        break;
      case 'cancel':
        next = 'canceled';
        nextChargeDate = existing.nextChargeDate; // no future charges once canceled
        break;
    }

    const [updated] = await db
      .update(subscriptions)
      .set({
        status: next,
        nextChargeDate,
        intervalMonths: intervalMonthsFinal,
        billingDay: billingDayFinal,
        updatedAt: now,
      })
      .where(eq(subscriptions.id, subscriptionId))
      .returning();

    // Edge-day recompute on resume/active refresh: keep cadence anchored on day
    // (skip already advanced a full interval; resume keeps the scheduled date).

    return NextResponse.json({
      membership: {
        id: updated.id,
        status: updated.status,
        nextChargeDate: updated.nextChargeDate,
        intervalMonths: updated.intervalMonths,
        billingDay: updated.billingDay,
        founding: updated.founding,
      },
      message: action === 'cancel'
        ? 'Your subscription is canceled. No future charges or shipments will occur.'
        : 'Your membership has been updated.',
    });
  } catch (error) {
    console.error('Membership manage error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
