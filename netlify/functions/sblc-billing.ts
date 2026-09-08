import { getDb } from '../../src/db';
import { subscriptions } from '../../src/db/schema';
import { eq, and, lte, gte, isNull } from 'drizzle-orm';
import {
  classifyForCharge,
  classifyForNotice,
  composeNoticeEmail,
} from '../../src/lib/subscriptionBilling';
import { addIntervalMonths, SUBSCRIPTION_TIERS, type SubscriptionTier } from '../../src/lib/subscriptions';

// Netlify scheduled function — runs daily.
// Schedule: cron for 09:05 UTC (config in netlify.toml [[schedules]]).
export const schedule = '5 9 * * *';

type DbSubscription = typeof subscriptions.$inferSelect;

/**
 * DRY-RUN DEFAULT: This function logs every decision (due charges, notices)
 * but performs no NMI charge and sends no email unless the flag below is
 * flipped and the required environment variables are present. No money, no
 * email until the vault method and transactional sender are confirmed.
 */
const ALLOW_REAL_CHARGES = process.env.SBLC_REAL_CHARGES === 'true';

function log(level: string, message: string, meta?: unknown) {
  const line = `[sblc-billing] ${level}: ${message}`;
  if (meta !== undefined) {
    console[level === 'error' ? 'error' : 'log'](line, JSON.stringify(meta));
  } else {
    console.log(line);
  }
}

export default async function handler() {
  const today = new Date();
  const runDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  log('info', `Daily run ${runDate.toISOString()} — real charges: ${ALLOW_REAL_CHARGES}`);

  const db = getDb();

  // Subscriptions active and scheduled on/before today (due) OR with an
  // upcoming charge inside the notice window. Pull a candidate window of
  // 45 days ahead so 30-day notices are visible.
  const horizon = new Date(runDate);
  horizon.setUTCDate(horizon.getUTCDate() + 45);

  const candidates = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.status, 'active'),
        lte(subscriptions.nextChargeDate, horizon),
      ),
    );

  let dueCount = 0;
  let noticeCount = 0;

  for (const sub of candidates) {
    const tier = (sub.tier ?? 'main-stage') as SubscriptionTier;
    const tierMeta = SUBSCRIPTION_TIERS[tier] ?? SUBSCRIPTION_TIERS['main-stage'];
    const amount = sub.pricePerShipment ?? tierMeta.price;

    // ── Due charges ──────────────────────────────────────────────────────────
    const due = classifyForCharge(sub.status, sub.nextChargeDate, runDate);
    if (due.kind === 'due') {
      dueCount += 1;
      const nextDate = new Date(sub.nextChargeDate!);
      const nextDue = addIntervalMonths(nextDate, sub.intervalMonths, sub.billingDay);
      log('info', `Charge due: sub=${sub.id} tier=${sub.tier} amount=${amount}`, {
        subscriptionId: sub.id,
        email: sub.email,
        amount,
        chargeDate: nextDate.toISOString(),
        nextChargeAfter: nextDue.toISOString(),
      });

      if (ALLOW_REAL_CHARGES) {
        // TODO(vault): perform NMI charge against the vaulted payment method,
        // create the linked store_order, then on webhook success update status
        // and nextChargeDate. Blocked on confirmed vault method.
        log('warn', 'Real charge path not implemented — vault method pending.');
      } else {
        log('info', 'Dry-run — no charge executed.');
      }
    }

    // ── Pre-charge notices ───────────────────────────────────────────────────
    const notice = classifyForNotice(sub.status, sub.intervalMonths, sub.nextChargeDate, runDate);
    if (notice.kind === 'notice-due') {
      noticeCount += 1;
      const email = composeNoticeEmail({
        email: sub.email,
        tierLabel: tierMeta.label,
        productLabel: tierMeta.product,
        amount,
        nextChargeDate: notice.chargeDate,
        intervalMonths: sub.intervalMonths,
      });
      log('info', `Notice due: sub=${sub.id} days=${notice.noticeDays}`, {
        subscriptionId: sub.id,
        email: sub.email,
        subject: email.subject,
      });
      // TODO(sender): send via confirmed transactional sender + persist a
      // sent-notice row for idempotency. Blocked on sender confirmation.
    }
  }

  log('info', `Run complete — due=${dueCount} notices=${noticeCount}`);
  return new Response(JSON.stringify({ ok: true, dueCount, noticeCount, dryRun: !ALLOW_REAL_CHARGES }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
