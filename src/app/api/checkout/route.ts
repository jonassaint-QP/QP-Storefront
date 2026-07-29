/**
 * POST /api/checkout
 *
 * Accepts validated shipping + cart data, initiates a payment session with the
 * NMI (Network Merchants Inc.) Three-Step Redirect API — the gateway PaymentCloud
 * typically assigns to high-risk merchants.
 *
 * NMI Three-Step Redirect flow:
 * Step 1 — POST here with order details → NMI returns a one-time <form-url>
 * Step 2 — The BROWSER POSTs the card fields directly to that form-url. This is
 *          not a hosted payment page and must not be navigated to with a GET:
 *          form-url is a POST target. Navigating to it without card fields makes
 *          the gateway reply "The ccnumber field is required". The card data goes
 *          straight from the browser to NMI and never touches this server.
 * Step 3 — NMI redirects the browser back to /api/webhooks/payment?token-id=…
 *          which completes the charge via <complete-action>.
 */

import { NextRequest, NextResponse } from 'next/server';

// ── Types ──────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutPayload {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  items: CartItem[];
}

// ── Config ─────────────────────────────────────────────────────────────────────

const NMI_ENDPOINT =
  process.env.NMI_GATEWAY_URL ?? 'https://secure.networkmerchants.com/api/v2/three-step';

const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY ?? '';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://queerpathways.com';

// ── Validation helpers ─────────────────────────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

function validatePayload(body: unknown): body is CheckoutPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.email === 'string' && isValidEmail(b.email) &&
    typeof b.firstName === 'string' && b.firstName.trim().length > 0 &&
    typeof b.lastName === 'string' && b.lastName.trim().length > 0 &&
    typeof b.address1 === 'string' && b.address1.trim().length > 0 &&
    typeof b.city === 'string' && b.city.trim().length > 0 &&
    typeof b.state === 'string' && b.state.trim().length > 0 &&
    typeof b.zip === 'string' && isValidZip(b.zip) &&
    typeof b.country === 'string' && b.country.trim().length > 0 &&
    Array.isArray(b.items) && (b.items as unknown[]).length > 0
  );
}

// ── Route handler ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Parse + validate input
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!validatePayload(body)) {
    return NextResponse.json({ error: 'Invalid checkout data' }, { status: 422 });
  }

  // 2. Guard: security key must be configured
  if (!NMI_SECURITY_KEY) {
    console.error('[checkout] NMI_SECURITY_KEY is not set');
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
  }

  // 3. Calculate order total (cents → dollars for NMI)
  const orderTotal = body.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // 4. Build NMI Step-1 request — <sale> is the correct root element
  const orderDescription = body.items
    .map((i) => `${i.quantity}x ${i.name}`)
    .join(', ');

  const nmiXml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sale>`,
    `  <api-key>${NMI_SECURITY_KEY}</api-key>`,
    `  <redirect-url>${SITE_URL}/api/webhooks/payment</redirect-url>`,
    `  <amount>${orderTotal}</amount>`,
    `  <currency>USD</currency>`,
    `  <order-description>${escapeXml(orderDescription)}</order-description>`,
    `</sale>`,
  ]
    .filter(Boolean)
    .join('\n');

  console.log('[checkout] Sending NMI Step-1 request');

  // 5. POST to NMI Step-1 endpoint
  let nmiFormUrl: string;
  try {
    const nmiRes = await fetch(NMI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: nmiXml,
    });

    const nmiText = await nmiRes.text();

    if (!nmiRes.ok) {
      console.error('[checkout] NMI HTTP error', nmiRes.status, nmiText);
      return NextResponse.json({ error: 'Payment gateway error' }, { status: 502 });
    }

    // Parse the response — NMI returns result=1 for success
    nmiFormUrl = parseNmiFormUrl(nmiText);
  } catch (err) {
    console.error('[checkout] NMI fetch failed', err);
    return NextResponse.json({ error: 'Could not reach payment gateway' }, { status: 502 });
  }

  // 6. Hand the one-time form-url to the client, which POSTs the card fields to it
  console.log('[checkout] Step-1 OK, form-url issued');
  return NextResponse.json({ formUrl: nmiFormUrl }, { status: 200 });
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Extract <form-url> from NMI XML response */
function parseNmiFormUrl(xml: string): string {
  const match = xml.match(/<form-url>([^<]+)<\/form-url>/);
  if (!match) {
    console.error('[checkout] NMI response XML:', xml.slice(0, 500));
    throw new Error('No form-url in NMI response');
  }
  return match[1];
}
