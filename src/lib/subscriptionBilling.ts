/**
 * Sovereign Body Lube Club — billing + notice decision helpers.
 *
 * Pure functions only (no DB, no fetch). The daily scheduled function in
 * netlify/functions/sblc-billing.ts uses these to decide which subscriptions
 * are due and which members need a pre-charge notice.
 *
 * Pre-charge notice: at least 15 days before charges on 1/2/3/4-month
 * intervals; at least 30 days before charges on 6/12-month intervals
 * (finalized terms, 2026-09-08).
 */

import { NOTICE_DAYS } from '@/lib/subscriptions';

export type DueDecision =
  | { kind: 'due'; action: 'charge' }
  | { kind: 'not-due' }
  | { kind: 'not-chargeable'; reason: 'paused' | 'skipped' | 'canceled' | 'future' };

/**
 * Classify a subscription row for a given run date. Only status 'active' with
 * nextChargeDate on/before the run date is due. Paused/skipped/canceled are
 * never charged by the scheduler.
 */
export function classifyForCharge(
  status: string,
  nextChargeDate: Date | string | null,
  runDate: Date,
): DueDecision {
  if (status !== 'active') {
    return { kind: 'not-chargeable', reason: status as 'paused' | 'skipped' | 'canceled' };
  }
  if (!nextChargeDate) return { kind: 'not-chargeable', reason: 'future' };
  const next = new Date(nextChargeDate);
  if (Number.isNaN(next.getTime())) return { kind: 'not-chargeable', reason: 'future' };
  const run = new Date(runDate);
  run.setUTCHours(0, 0, 0, 0);
  const chargeDay = new Date(next);
  chargeDay.setUTCHours(0, 0, 0, 0);
  if (chargeDay.getTime() <= run.getTime()) return { kind: 'due', action: 'charge' };
  return { kind: 'not-due' };
}

export type NoticeDecision =
  | { kind: 'notice-due'; noticeDays: number; chargeDate: Date }
  | { kind: 'no-notice' };

/**
 * Decide whether a member needs a pre-charge notice on a given run date.
 * A notice is due when today is exactly (interval notice window) before the
 * next scheduled charge date — i.e. chargeDate - noticeDays <= runDate and
 * the charge has not happened yet. Only active subscriptions get notices;
 * paused/skipped/canceled do not (their nextChargeDate is not impending).
 */
export function classifyForNotice(
  status: string,
  intervalMonths: number,
  nextChargeDate: Date | string | null,
  runDate: Date,
): NoticeDecision {
  if (status !== 'active') return { kind: 'no-notice' };
  if (!nextChargeDate) return { kind: 'no-notice' };
  const next = new Date(nextChargeDate);
  if (Number.isNaN(next.getTime())) return { kind: 'no-notice' };

  const noticeDays = NOTICE_DAYS[intervalMonths] ?? 15;
  const noticeDate = new Date(next);
  noticeDate.setUTCDate(noticeDate.getUTCDate() - noticeDays);

  const run = new Date(runDate);
  run.setUTCHours(0, 0, 0, 0);
  const notice = new Date(noticeDate);
  notice.setUTCHours(0, 0, 0, 0);
  const charge = new Date(next);
  charge.setUTCHours(0, 0, 0, 0);

  // Send when the notice date has arrived and the charge is still ahead.
  // Idempotency is handled by the caller persisting a sent flag per notice.
  if (notice.getTime() <= run.getTime() && charge.getTime() > run.getTime()) {
    return { kind: 'notice-due', noticeDays, chargeDate: next };
  }
  return { kind: 'no-notice' };
}

/**
 * Compose the pre-charge notice email body. Plain-text friendly, includes the
 * charge date, amount, tier, interval, and the online cancellation route.
 */
export function composeNoticeEmail(params: {
  email: string;
  tierLabel: string;
  productLabel: string;
  amount: string;
  nextChargeDate: Date;
  intervalMonths: number;
}): { subject: string; text: string } {
  const dateStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(params.nextChargeDate));
  const intervalLabel = `${params.intervalMonths} month${params.intervalMonths === 1 ? '' : 's'}`;
  return {
    subject: `Upcoming Sovereign Body Lube Club charge — ${dateStr}`,
    text: [
      `Your next Sovereign Body Lube Club charge is scheduled for ${dateStr}.`,
      '',
      `Tier: ${params.tierLabel}`,
      `Product: ${params.productLabel}`,
      `Amount: $${params.amount} USD per shipment (flat, at your ${intervalLabel} interval)`,
      '',
      'Your charge will appear on your card or bank statement as QUEER PATHWAYS LLC.',
      '',
      'Need to pause, skip, change your interval or billing day, or cancel? Manage online —',
      'no phone call, no retention script, no explanation required:',
      'https://queerpathways.com/membership/manage',
      '',
      'Completed charges and shipments are non-refundable except where legally required.',
    ].join('\n'),
  };
}
