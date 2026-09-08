import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { estate_waitlist } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const runtime = 'nodejs';

/**
 * POST /api/waitlist/estate
 * Body: { email, tier? }
 *
 * Email capture only for club interest while subscription checkout is gated.
 * No checkout, no charge, no founding-rate promise. Idempotent per email per
 * tier: duplicate signups return a success-shaped response so the UI can
 * confirm without surfacing errors.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const tier = String(body?.tier ?? 'estate').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!['main-stage', 'throne', 'estate'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier.' }, { status: 400 });
    }

    const db = getDb();
    const [existing] = await db
      .select({ id: estate_waitlist.id })
      .from(estate_waitlist)
      .where(and(eq(estate_waitlist.email, email), eq(estate_waitlist.source, `interest-${tier}`)));

    if (existing) {
      return NextResponse.json({
        ok: true,
        message: 'You are on the list. We will reach out when the Sovereign Body Lube Club opens.',
      });
    }

    await db.insert(estate_waitlist).values({
      email,
      source: `interest-${tier}`,
    });

    return NextResponse.json({
      ok: true,
      message: 'You are on the list. We will reach out when the Sovereign Body Lube Club opens.',
    });
  } catch (error) {
    console.error('Club waitlist error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
