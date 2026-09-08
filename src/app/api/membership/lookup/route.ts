import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { subscriptions } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';

export const runtime = 'nodejs';

/**
 * POST /api/membership/lookup
 * Body: { email, reference }
 * Reference may be a numeric subscription id or a numeric store order id.
 * Returns the matching subscriptions (active/paused/skipped — canceled rows
 * are returned too so a member can see status) with a member-safe projection.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const reference = String(body?.reference ?? '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!reference || !/^\d+$/.test(reference)) {
      return NextResponse.json({ error: 'A valid order or subscription reference is required.' }, { status: 400 });
    }

    const referenceNum = parseInt(reference, 10);
    const db = getDb();

    const rows = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.email, email),
          inArray(subscriptions.id, [referenceNum]),
        ),
      );

    // Fallback: allow lookup by linked store order id for convenience
    let orderLinkedRows: typeof rows = [];
    if (rows.length === 0) {
      orderLinkedRows = await db
        .select()
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.email, email),
            eq(subscriptions.lastOrderId, referenceNum),
          ),
        );
    }

    const matches = rows.length > 0 ? rows : orderLinkedRows;
    if (matches.length === 0) {
      return NextResponse.json({ error: 'No subscription found for that email and reference.' }, { status: 404 });
    }

    const memberships = matches.map((s) => ({
      id: s.id,
      tier: s.tier,
      tierLabel: s.tier === 'main-stage' ? 'Main Stage' : s.tier === 'throne' ? 'Throne' : 'The Estate',
      productLabel: s.productLabel,
      sku: s.sku,
      pricePerShipment: s.pricePerShipment,
      billingDay: s.billingDay,
      intervalMonths: s.intervalMonths,
      status: s.status,
      founding: s.founding,
      foundingCode: s.foundingCode,
      nextChargeDate: s.nextChargeDate,
      lastChargeDate: s.lastChargeDate,
    }));

    return NextResponse.json({ memberships });
  } catch (error) {
    console.error('Membership lookup error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
