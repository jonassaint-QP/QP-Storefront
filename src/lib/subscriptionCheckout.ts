import {
  INTERVAL_MONTHS,
  SUBSCRIPTION_TIERS,
  type SubscriptionTier,
} from '@/lib/subscriptions';

export const FOUNDING_CODE = 'QUEER-10';
export const FOUNDING_START = '2026-09-15T00:00:00.000Z';
export const FOUNDING_END = '2026-10-16T00:00:00.000Z';

export type SubscriptionEnrollment = {
  tier: SubscriptionTier;
  billingDay: number;
  intervalMonths: number;
  email: string;
  country: 'US';
  foundingCode?: string;
};

export type EnrollmentResult =
  | { ok: true; standardPrice: string; foundingPrice: string | null; founding: boolean }
  | { ok: false; error: string };

export function isFoundingWindowAt(date: Date): boolean {
  return date >= new Date(FOUNDING_START) && date < new Date(FOUNDING_END);
}

export function foundingPrice(price: string): string {
  return (Number(price) * 0.9).toFixed(2);
}

export function validateSubscriptionEnrollment(
  input: Partial<SubscriptionEnrollment>,
  now: Date = new Date(),
): EnrollmentResult {
  if (!input.tier || !(input.tier in SUBSCRIPTION_TIERS)) {
    return { ok: false, error: 'Select a valid subscription tier.' };
  }
  if (!Number.isInteger(input.billingDay) || input.billingDay! < 1 || input.billingDay! > 31) {
    return { ok: false, error: 'Select a billing day from 1 through 31.' };
  }
  if (!Number.isInteger(input.intervalMonths) || !(INTERVAL_MONTHS as readonly number[]).includes(input.intervalMonths!)) {
    return { ok: false, error: 'Select a 1, 2, 3, 4, 6, or 12-month interval.' };
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { ok: false, error: 'Enter a valid email address.' };
  }
  if (input.country !== 'US') {
    return { ok: false, error: 'The Sovereign Body Lube Club ships to United States addresses only at launch.' };
  }

  const standardPrice = SUBSCRIPTION_TIERS[input.tier].price;
  const founding = input.foundingCode?.trim().toUpperCase() === FOUNDING_CODE && isFoundingWindowAt(now);

  return {
    ok: true,
    standardPrice,
    foundingPrice: founding ? foundingPrice(standardPrice) : null,
    founding,
  };
}
