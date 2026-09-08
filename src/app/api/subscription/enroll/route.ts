import { NextResponse } from 'next/server';  
import { getDb } from '@/db';  
import { subscriptions } from '@/db/schema';  
import {  
  validateSubscriptionEnrollment,  
  type SubscriptionCountry,  
  type SubscriptionEnrollment,  
} from '@/lib/subscriptionCheckout';  
import { createNmiVaultCustomer } from '@/lib/server/nmiVault';  
import { computeInitialNextCharge, formatDate, SUBSCRIPTION_TIERS } from '@/lib/subscriptions';

export const runtime = 'nodejs';

type EnrollBody = Partial<SubscriptionEnrollment> & {  
  paymentToken?: string;  
  shippingAddress?: {  
    first_name?: string;  
    last_name?: string;  
    address_1?: string;  
    city?: string;  
    state?: string;  
    postal_code?: string;  
    country?: string;  
  };  
};

/**  
* POST /api/subscription/enroll  
*  
* Server-side enrollment chain:  
*   1. Validate tier/billing day/interval/email/country (hard US-only) +  
*      founding-window + price math via validateSubscriptionEnrollment.  
*   2. Vault the payment method with NMI (stores only customer_vault_id;  
*      never PAN/CVV on our side).  
*   3. Write the subscriptions row with status 'active' and the first  
*      nextChargeDate computed from the customer's chosen billing day.  
*   4. Return the subscription id + next charge date. The first charge and  
*      all future charges fire through the daily scheduler (dry-run until  
*      the real-charge path is enabled).  
*  
* No charge is executed in this route.  
*/  
export async function POST(request: Request) {  
  try {  
    const body = (await request.json()) as EnrollBody;  
    const {  
      tier,  
      billingDay,  
      intervalMonths,  
      email,  
      foundingCode,  
      paymentToken,  
      shippingAddress,  
    } = body;

    const country =  
      shippingAddress?.country === 'US' || shippingAddress?.country === 'CA'  
        ? shippingAddress.country  
        : undefined;

    const validation = validateSubscriptionEnrollment({  
      tier,  
      billingDay,  
      intervalMonths,  
      email,  
      country,  
      foundingCode,  
    });

    if (!validation.ok) {  
      return NextResponse.json({ error: validation.error }, { status: 400 });  
    }

    if (!paymentToken) {  
      return NextResponse.json({ error: 'Payment details are required.' }, { status: 400 });  
    }

    const tierMeta = SUBSCRIPTION_TIERS[tier as keyof typeof SUBSCRIPTION_TIERS];  
    const price = validation.foundingPrice ?? validation.standardPrice;

    const { vaultId } = await createNmiVaultCustomer({  
      paymentToken,  
      billingAddress: {  
        email: email!.trim().toLowerCase(),  
        first_name: shippingAddress?.first_name,  
        last_name: shippingAddress?.last_name,  
        address_1: shippingAddress?.address_1,  
        city: shippingAddress?.city,  
        state: shippingAddress?.state,  
        postal_code: shippingAddress?.postal_code,  
        country: country as SubscriptionCountry,  
      },  
    });

    const nextChargeDate = computeInitialNextCharge(billingDay!, intervalMonths!);

    const db = getDb();  
    const [created] = await db  
      .insert(subscriptions)  
      .values({  
        email: email!.trim().toLowerCase(),  
        tier: tier as string,  
        productLabel: tierMeta.product,  
        sku: tierMeta.sku,  
        pricePerShipment: price,  
        billingDay: billingDay!,  
        intervalMonths: intervalMonths!,  
        status: 'active',  
        founding: validation.founding,  
        foundingCode: validation.founding ? (foundingCode ?? '').trim().toUpperCase() : null,  
        nextChargeDate,  
        shippingAddress: shippingAddress ?? null,  
        nmiVaultId: vaultId,  
      })  
      .returning();

    return NextResponse.json(  
      {  
        ok: true,  
        subscription: {  
          id: created.id,  
          tier: created.tier,  
          tierLabel: tierMeta.label,  
          productLabel: created.productLabel,  
          pricePerShipment: created.pricePerShipment,  
          billingDay: created.billingDay,  
          intervalMonths: created.intervalMonths,  
          status: created.status,  
          founding: created.founding,  
          nextChargeDate: created.nextChargeDate,  
          nextChargeDateLabel: formatDate(created.nextChargeDate),  
          manageUrl: '/membership/manage',  
        },  
        message: `Welcome to the Sovereign Body Lube Club. Your first charge is scheduled for ${formatDate(created.nextChargeDate)}.`,  
      },  
      { status: 201 },  
    );  
  } catch (error) {  
    console.error('Subscription enroll error:', error);  
    const message = error instanceof Error ? error.message : 'Internal server error.';  
    return NextResponse.json({ error: message }, { status: 500 });  
  }  
}  
