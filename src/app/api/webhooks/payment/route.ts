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
  const cleanKey = NMI_SECURITY_KEY.trim();

  if (!tokenId) {
    console.error('[webhook] Step-3 missing token-id');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=payment_failed`);
  }

  if (!cleanKey) {
    console.error('[webhook] NMI_SECURITY_KEY not set');
    return NextResponse.redirect(`${SITE_URL}/checkout?error=gateway_error`);
  }

  try {
    const nmiXml = `<?xml version="1.0" encoding="UTF-8"?>
<complete-action>
  <api-key>${cleanKey}</api-key>
  <token-id>${tokenId}</token-id>
</complete-action>`;

    console.info('[webhook] Step-3 sending to:', NMI_GATEWAY_URL);
    console.info('[webhook] Step-3 token-id:', tokenId);
    console.info('[webhook] Step-3 XML:', nmiXml);

    const res = await fetch(NMI_GATEWAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: nmiXml,
    });

    const text = await res.text();
    console.log('[webhook] NMI Step-3 response:', text);

    const result = text.match(/<result>([^<]+)<\/result>/)?.[1];
    const resultText = text.match(/<result-text>([^<]+)<\/result-text>/)?.[1];
    const transactionId = text.match(/<transaction-id>([^<]+)<\/transaction-id>/)?.[1];

    if (result === '1') {
      console.info('[webhook] Charge approved', { transactionId });
      return NextResponse.redirect(`${SITE_URL}/order/confirmed`, { status: 303 });
    } else {
      const errorMsg = resultText ?? 'Payment declined';
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

