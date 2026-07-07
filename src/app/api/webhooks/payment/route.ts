/**
 * POST /api/webhooks/payment
 *
 * NMI Three-Step Redirect — Step 3 completion handler.
 *
 * After the customer enters card details on NMI's hosted page, NMI POSTs a
 * token-id to this endpoint. We use it to complete the charge via NMI's
 * Direct Post API, then redirect the browser to /order/confirmed.
 *
 * NMI also sends transaction-result webhooks (Notification URLs) for async
 * events — this handler accepts those too and verifies the HMAC signature.
 *
 * TODO: Set NMI_WEBHOOK_SECRET and NMI_SECURITY_KEY in production .env
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY ?? '';
const NMI_WEBHOOK_SECRET = process.env.NMI_WEBHOOK_SECRET ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';

const NMI_DIRECT_POST =
  process.env.NMI_DIRECT_POST_URL ?? 'https://secure.networkmerchants.com/api/transact.php';

// ── Step-3 redirect handler (browser GET/POST from NMI hosted page) ────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const contentType = req.headers.get('content-type') ?? '';

  // NMI transaction-result webhooks send JSON with an HMAC signature header
  if (contentType.includes('application/json')) {
    return handleWebhook(req);
  }

  // Step-3 form POST from NMI hosted page
  return handleStep3(req);
}

// ── Step-3: complete the charge ───────────────────────────────────────────────

async function handleStep3(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const tokenId = url.searchParams.get('token-id');

  if (!tokenId) {
    console.error('[webhook] Step-3 missing token-id');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=payment_failed`);
  }

  if (!NMI_SECURITY_KEY) {
    console.error('[webhook] NMI_SECURITY_KEY not configured');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`);
  }

  try {
    const body = new URLSearchParams({
      'security-key': NMI_SECURITY_KEY,
      'token-id': tokenId,
    });

    const res = await fetch(NMI_DIRECT_POST, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const text = await res.text();
    const result = parseDirectPostResponse(text);

    if (result.response === '1') {
      // Approved
      console.info('[webhook] NMI charge approved', { transactionId: result.transactionid });
      return NextResponse.redirect(`${SITE_URL}/order/confirmed`, { status: 303 });
    } else {
      console.warn('[webhook] NMI charge declined', { responsetext: result.responsetext });
      const msg = encodeURIComponent(result.responsetext ?? 'Payment declined');
      return NextResponse.redirect(`${SITE_URL}/checkout?error=${msg}`, { status: 303 });
    }
  } catch (err) {
    console.error('[webhook] Step-3 charge failed', err);
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`, { status: 303 });
  }
}

// ── Async webhook: NMI transaction-result notification ────────────────────────

async function handleWebhook(req: NextRequest): Promise<NextResponse> {
  // Verify HMAC-SHA256 signature if the secret is configured
  if (NMI_WEBHOOK_SECRET) {
    const signature = req.headers.get('x-webhook-signature') ?? '';
    const rawBody = await req.text();

    const expected = createHmac('sha256', NMI_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);

    if (
      sigBuf.length !== expBuf.length ||
      !timingSafeEqual(sigBuf, expBuf)
    ) {
      console.warn('[webhook] Invalid signature — rejected');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // TODO: parse rawBody JSON, update order status in your database / send email
    console.info('[webhook] NMI notification verified');
    return NextResponse.json({ received: true });
  }

  // Secret not configured yet — accept but log a warning
  console.warn('[webhook] NMI_WEBHOOK_SECRET not set; skipping signature check');
  return NextResponse.json({ received: true });
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Parse NMI Direct Post key=value response */
function parseDirectPostResponse(text: string): Record<string, string> {
  return Object.fromEntries(
    text.split('&').map((pair) => {
      const idx = pair.indexOf('=');
      return [
        decodeURIComponent(pair.slice(0, idx)),
        decodeURIComponent(pair.slice(idx + 1)),
      ];
    })
  );
}
