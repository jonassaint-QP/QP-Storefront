import { NextRequest, NextResponse } from 'next/server';

/**
 * NMI Three-Step Redirect — Step 3 (token completion).
 *
 * NMI returns the customer's browser here after Step 2, carrying a one-time
 * `token-id`. Exchanging that token via <complete-action> is what actually
 * captures the charge; until this runs, no money has moved.
 *
 * The token normally arrives as a query-string parameter on a GET, but some
 * gateway profiles POST it as form data instead, so both are accepted.
 *
 * Note on error attribution: a "The ccnumber field is required" response cannot
 * originate here. This request carries no card fields by design — card data goes
 * from the browser straight to NMI during Step 2. That message means Step 2
 * reached the gateway without card fields, which happens when the one-time
 * form-url is navigated to with a GET instead of being POSTed to. See
 * src/app/(main)/checkout/NmiCardForm.tsx.
 */

const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://queerpathways.com';
const NMI_GATEWAY_URL =
  process.env.NMI_GATEWAY_URL ?? 'https://paymentcloud.transactiongateway.com/api/v2/three-step';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req, null);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Read token-id from the body too, for profiles that POST it rather than
  // appending it to the redirect-url. Without this, such a callback would be
  // rejected as "missing token-id" and the charge would never be captured.
  let bodyToken: string | null = null;
  try {
    const value = (await req.formData()).get('token-id');
    if (typeof value === 'string') bodyToken = value;
  } catch {
    // Body absent or not form-encoded — the query string is the only source.
  }
  return handleStep3(req, bodyToken);
}

/**
 * 303 on every branch. These redirects can terminate a POST, and 307/308 would
 * preserve the method, sending the browser to POST at /checkout.
 */
function redirectTo(path: string): NextResponse {
  return NextResponse.redirect(`${SITE_URL}${path}`, { status: 303 });
}

async function handleStep3(req: NextRequest, bodyToken: string | null): Promise<NextResponse> {
  const tokenId = new URL(req.url).searchParams.get('token-id') ?? bodyToken;
  const cleanKey = NMI_SECURITY_KEY.trim();

  if (!tokenId) {
    console.error('[webhook] Step-3 missing token-id');
    return redirectTo('/checkout?error=payment_failed');
  }

  if (!cleanKey) {
    console.error('[webhook] NMI_SECURITY_KEY not set');
    return redirectTo('/checkout?error=gateway_error');
  }

  try {
    const nmiXml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<complete-action>`,
      `  <api-key>${escapeXml(cleanKey)}</api-key>`,
      `  <token-id>${escapeXml(tokenId)}</token-id>`,
      `</complete-action>`,
    ].join('\n');

    console.info('[webhook] Step-3 posting to:', NMI_GATEWAY_URL);
    console.info('[webhook] Step-3 token-id:', tokenId);

    const res = await fetch(NMI_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: nmiXml,
    });

    const text = await res.text();

    if (!res.ok) {
      console.error('[webhook] Step-3 HTTP', res.status, text.slice(0, 500));
      return redirectTo('/checkout?error=gateway_error');
    }

    // Full body while the live test is being debugged. It carries no PAN (only a
    // masked last-4), but it does carry customer name and address — trim this to
    // result / result-text / transaction-id before this path sees real traffic.
    console.info('[webhook] Step-3 response:', text);

    const result = text.match(/<result>([^<]+)<\/result>/)?.[1];
    const resultText = text.match(/<result-text>([^<]+)<\/result-text>/)?.[1];
    const transactionId = text.match(/<transaction-id>([^<]+)<\/transaction-id>/)?.[1] ?? null;

    if (result === '1') {
      // With no persistence layer in this app, the gateway's transaction-id is the
      // only handle for reconciling this charge against the NMI portal later.
      console.info('[webhook] Charge approved, transaction-id:', transactionId);
      return redirectTo('/order/confirmed');
    }

    const errorMsg = resultText || 'Payment declined';
    console.warn('[webhook] Charge declined:', errorMsg, '| transaction-id:', transactionId);
    return redirectTo(`/checkout?error=${encodeURIComponent(errorMsg)}`);
  } catch (err) {
    console.error('[webhook] Step-3 failed', err);
    return redirectTo('/checkout?error=gateway_error');
  }
}

/** token-id arrives from an untrusted query string — never interpolate it raw. */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
