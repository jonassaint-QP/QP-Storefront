import { NextResponse } from 'next/server';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items, currency } = await request.json() as { items: CartItem[]; currency?: string };

    const securityKey = process.env.NMI_SECURITY_KEY;
    const gatewayUrl = process.env.NMI_GATEWAY_URL || 'https://secure.networkmerchants.com/api/v2/three-step';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://queerpathways.com';

    if (!securityKey) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 503 });
    }

    const totalCents = items.reduce((sum: number, item: CartItem) => sum + Math.round(item.price * 100 * item.quantity), 0);
    const amount = (totalCents / 100).toFixed(2);

    // Step 1: Request a redirect token from NMI using XML.
    // NMI Three-Step requires <sale> as the root element.
    // redirect-url must point to our Step-3 webhook — NMI POSTs the token-id there to complete the charge.
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sale>
  <api-key>${securityKey}</api-key>
  <redirect-url>${siteUrl}/api/webhooks/payment</redirect-url>
  <amount>${amount}</amount>
  <currency>${currency || 'USD'}</currency>
  <order-description>Somatic Toolkit Order</order-description>
</sale>`;

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: xml,
    });

    const data = await response.text();
    const formUrlMatch = data.match(/<form-url><!\[CDATA\[(.*?)\]\]><\/form-url>/);

    if (!formUrlMatch) {
      console.error('NMI Response Error:', data);
      return NextResponse.json({ error: 'Failed to initiate checkout' }, { status: 500 });
    }

    return NextResponse.json({ redirectUrl: formUrlMatch[1] });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
