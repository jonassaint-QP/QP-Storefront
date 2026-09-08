import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { estate_waitlist } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

/**
 * POST /api/waitlist/estate
 * Body: { email }
 *
 * Email capture only for The Estate Coming Soon tier. No checkout, no charge,
 * no founding-rate promise. Idempotent per email: duplicate signups return a
 * success-shaped response so the UI can confirm without surfacing errors.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const db = getDb();
    const [existing] = await db
      .select({ id: estate_waitlist.id })
      .from(estate_waitlist)
      .where(eq(estate_waitlist.email, email));

    if (existing) {
      return NextResponse.json({
        ok: true,
        message: 'You are already on the list. We will reach out when The Estate opens.',
      });
    }

    await db.insert(estate_waitlist).values({
      email,
      source: 'estate-coming-soon',
    });

    return NextResponse.json({
      ok: true,
      message: 'You are on the list. We will reach out when The Estate opens.',
    });
  } catch (error) {
    console.error('Estate waitlist error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
