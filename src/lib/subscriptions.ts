/**
 * Sovereign Body Lube Club — subscription domain helpers.
 *
 * Source of truth for tier metadata and cadence math. Pure functions only;
 * no DB access here. Edge-day rule: a customer-chosen billing day of 29, 30,
 * or 31 shifts to the last calendar day of any month lacking that date
 * (disclosed at checkout and in the finalized terms).
 */

export const SUBSCRIPTION_TIERS = {
  'main-stage': {
    sku: 'SNSL16',
    label: 'Main Stage',
    product: 'Swiss Navy Silicone Lubricant — 16 oz pump',
    price: '94.99',
  },
  throne: {
    sku: 'SNSL32',
    label: 'Throne',
    product: 'Swiss Navy Silicone Lubricant — 32 oz pump',
    price: '189.99',
  },
  estate: {
    sku: 'SNSL1G',
    label: 'The Estate',
    product: 'Swiss Navy Silicone Lubricant — 128 oz gallon',
    price: '299.99',
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

export const INTERVAL_MONTHS = [1, 2, 3, 4, 6, 12] as const;

export type SubscriptionStatus =
  | 'active'
  | 'paused'
  | 'skipped'
  | 'canceled';

export const NOTICE_DAYS: Record<number, number> = {
  1: 15,
  2: 15,
  3: 15,
  4: 15,
  6: 30,
  12: 30,
};

export function daysInUtcMonth(year: number, month: number): number {
  // month is 1-12; day 0 of the next month = last day of this month
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function lastDayOfMonth(year: number, month: number): number {
  return daysInUtcMonth(year, month);
}

/**
 * Build a UTC date for (year, month 1-12, billingDay) applying the edge-day
 * shift when the month lacks the chosen day.
 */
export function billingDate(year: number, month: number, billingDay: number): Date {
  const shifted = Math.min(billingDay, lastDayOfMonth(year, month));
  return new Date(Date.UTC(year, month - 1, shifted));
}

/**
 * The next occurrence of the customer's chosen billing day strictly after
 * `from` (edge-shifted). Used at enrollment for the first scheduled charge.
 */
export function nextBillingOccurrence(from: Date, billingDay: number): Date {
  const base = new Date(from);
  let year = base.getUTCFullYear();
  let month = base.getUTCMonth() + 1; // 1-12
  let candidate = billingDate(year, month, billingDay);
  if (candidate.getTime() <= base.getTime()) {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    candidate = billingDate(year, month, billingDay);
  }
  return candidate;
}

/**
 * Advance a date by whole months, always landing on the customer's chosen
 * billingDay with the edge-day shift applied (the chosen day is preserved
 * as the source of truth; each target month is shifted independently).
 */
export function addIntervalMonths(from: Date, intervalMonths: number, billingDay: number): Date {
  const base = new Date(from);
  const totalMonths = base.getUTCFullYear() * 12 + base.getUTCMonth() + intervalMonths;
  const year = Math.floor(totalMonths / 12);
  const month = (totalMonths % 12) + 1; // 1-12
  return billingDate(year, month, billingDay);
}

/**
 * Enrollment: first scheduled recurring charge = next occurrence of the
 * chosen billing day after today; subsequent charges add intervalMonths.
 */
export function computeInitialNextCharge(
  billingDay: number,
  intervalMonths: number,
  from: Date = new Date(),
): Date {
  return nextBillingOccurrence(from, billingDay);
}

/**
 * Skip: move past the next scheduled charge by one full interval.
 */
export function computeSkipDate(nextChargeDate: Date, intervalMonths: number, billingDay: number): Date {
  return addIntervalMonths(nextChargeDate, intervalMonths, billingDay);
}

/**
 * Interval change: re-anchor from the current next charge date and advance
 * by the newly selected interval.
 */
export function computeIntervalChangeDate(
  nextChargeDate: Date,
  newIntervalMonths: number,
  billingDay: number,
): Date {
  return addIntervalMonths(nextChargeDate, newIntervalMonths, billingDay);
}

/**
 * Billing-day change: find the next occurrence of the new day after the
 * current next charge date (edge-shifted).
 */
export function computeBillingDayChangeDate(
  nextChargeDate: Date,
  newBillingDay: number,
): Date {
  return nextBillingOccurrence(nextChargeDate, newBillingDay);
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function isFoundingWindow(now: Date = new Date()): boolean {
  const start = Date.UTC(2026, 8, 15); // Sep 15, 2026 00:00 UTC
  const end = Date.UTC(2026, 9, 16); // Oct 16, 2026 00:00 UTC (window inclusive through Oct 15)
  const t = now.getTime();
  return t >= start && t < end;
}
