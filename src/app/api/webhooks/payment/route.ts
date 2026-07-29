import { NextRequest, NextResponse } from 'next/server';

const NMI_SECURITY_KEY = process.env.NMI_SECURITY_KEY ?? '';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://queerpathways.com';
const NMI_GATEWAY_URL = process.env.NMI_GATEWAY_URL ?? 'https://paymentcloud.transactiongateway.com/api/v2/three-step';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handleStep3(req);
}

async function handleStep3(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const tokenId = url.searchParams.get('token-id');

  if (!tokenId) {
    console.error('[webhook] Step-3 missing token-id');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=payment_failed`);
  }

  if (!NMI_SECURITY_KEY) {
    console.error('[webhook] NMI_SECURITY_KEY not set');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`);
  }

  try {
    const nmiXml = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<complete-action>`,
      `  <api-key>${NMI_SECURITY_KEY}</api-key>`,
      `  <token-id>${tokenId}</token-id>`,
      `</complete-action>`,
    ].join('\n');

    console.info('[webhook] Completing Step-3 for token:', tokenId);

    const res = await fetch(NMI_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: nmiXml,
    });

    const text = await res.text();
    console.log('[webhook] NMI Step-3 response:', text);

    const resultMatch = text.match(/<result>([^<]+)<\/result>/);
    const resultTextMatch = text.match(/<result-text>([^<]+)<\/result-text>/);

    if (resultMatch && resultMatch[1] === '1') {
      console.info('[webhook] Charge approved');
      return NextResponse.redirect(`${SITE_URL}/order/confirmed`, { status: 303 });
    } else {
      const errorMsg = resultTextMatch ? resultTextMatch[1] : 'Payment declined';
      console.warn('[webhook] Charge declined:', errorMsg);
      return NextResponse.redirect(
        `${SITE_URL}/checkout?error=${encodeURIComponent(errorMsg)}`,
        { status: 303 },
      );
    }
  } catch (err) {
    console.error('[webhook] Step-3 failed', err);
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`, { status: 303 });
  }
}

