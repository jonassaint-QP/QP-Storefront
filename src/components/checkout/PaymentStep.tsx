'use client';

import { useState } from 'react';  
import { useRouter } from 'next/navigation';  
import type { SubscriptionTier } from '@/lib/subscriptions';

declare global {  
interface Window {  
NmiPayments?: {  
  createToken: (config: Record<string, unknown>) => void;  
};  
onNmiToken?: (token: string) => void;  
}  
}

const INPUT =  
'h-10 w-full bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';

function loadNmiScript(): Promise<void> {  
return new Promise((resolve, reject) => {  
if (window.NmiPayments) {  
  resolve();  
  return;  
}  
const existing = document.querySelector('script[data-nmi-payments]');  
if (existing) {  
  existing.addEventListener('load', () => resolve());  
  existing.addEventListener('error', () => reject(new Error('NMI tokenization script failed to load.')));  
  return;  
}  
const script = document.createElement('script');  
script.src = 'https://secure.nmi.com/tokenization/tokenize.js';  
script.dataset.nmiPayments = 'true';  
script.async = true;  
script.onload = () => resolve();  
script.onerror = () => reject(new Error('NMI tokenization script failed to load.'));  
document.head.appendChild(script);  
});  
}

export type SubscriptionShippingAddress = {  
first_name: string;  
last_name: string;  
address_1: string;  
city: string;  
state: string;  
postal_code: string;  
country: 'US' | 'CA';  
};

export default function PaymentStep({  
email,  
tier,  
billingDay,  
intervalMonths,  
foundingCode,  
shippingAddress,  
onDone,  
}: {  
email: string;  
tier: SubscriptionTier;  
billingDay: number;  
intervalMonths: number;  
foundingCode: string;  
shippingAddress: SubscriptionShippingAddress;  
onDone: () => void;  
}) {  
const router = useRouter();  
const [busy, setBusy] = useState(false);  
const [error, setError] = useState<string | null>(null);

async function handlePay() {  
setBusy(true);  
setError(null);  
try {  
  await loadNmiScript();  
  const token = await new Promise<string>((resolve, reject) => {  
    window.onNmiToken = (t: string) => (t ? resolve(t) : reject(new Error('No payment token returned.')));  
    window.NmiPayments?.createToken({  
      type: 'card',  
      callback: 'onNmiToken',  
    });  
  });

  const res = await fetch('/api/subscription/enroll', {  
    method: 'POST',  
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify({  
      email,  
      tier,  
      billingDay,  
      intervalMonths,  
      foundingCode,  
      paymentToken: token,  
      shippingAddress,  
    }),  
  });  
  const data = await res.json();  
  if (!res.ok) {  
    setError(data.error ?? 'We could not complete your enrollment. No charge was made.');  
    setBusy(false);  
    return;  
  }  
  onDone();  
  router.push('/membership/manage');  
} catch (err) {  
  const message = err instanceof Error ? err.message : 'We could not complete your enrollment.';  
  setError(message);  
  setBusy(false);  
}  
}

return (  
<div className="flex flex-col gap-4">  
  <p className="text-xs font-mono text-zinc-600 leading-6">  
    Payment details are collected securely by our payment provider (NMI). Your card number is  
    never stored by Queer Pathways. By completing enrollment you agree to recurring charges at  
    the displayed flat per-shipment price and interval. Your first charge is scheduled by your  
    chosen billing day.  
  </p>  
  <button  
    type="button"  
    onClick={handlePay}  
    disabled={busy}  
    className="h-12 w-full bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-100 transition-colors disabled:opacity-50"  
  >  
    {busy ? 'Securing payment…' : 'Complete Enrollment'}  
  </button>  
  {error && <p role="alert" className="text-xs font-mono text-red-400 leading-6">{error}</p>}  
</div>  
);  
}  
