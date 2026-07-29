'use client';

import { useState } from 'react';

/**
 * NMI Three-Step Redirect — Step 2.
 *
 * `formUrl` is the one-time POST target returned by Step 1. It is NOT a hosted
 * payment page: the browser has to POST the card fields to it as a normal HTML
 * form submission. Navigating there with a GET (e.g. window.location.assign)
 * arrives with no card number and the gateway answers
 * "The ccnumber field is required".
 *
 * Two deliberate constraints:
 *  - This is a plain lowercase <form>, not next/form. With a string `action`,
 *    next/form forces a GET and ignores `method` and `encType` — exactly the
 *    bug. The Next docs say to use the HTML <form> element when you need those.
 *  - The card inputs are uncontrolled and have no React state. Their values go
 *    straight from the DOM to NMI on submit, so the card number never enters
 *    application state, our server, or any log.
 *
 * Field names are the hyphenated Step-2 names (`billing-cc-number`,
 * `billing-cc-exp`, `billing-cvv`) — the <billing> XML elements with a
 * `billing-` prefix. The flat `ccnumber`/`ccexp`/`cvv` spellings belong to the
 * separate Direct Post API and are not interchangeable here, even though NMI's
 * validator reports the failure using its internal `ccnumber` name.
 *
 * `encType` is urlencoded, which is also the browser default for a POST form.
 * It is stated explicitly only to document the wire format NMI expects; do not
 * switch this to multipart/form-data.
 *
 * On success NMI redirects the browser to the Step-1 <redirect-url>
 * (/api/webhooks/payment?token-id=…), which completes the charge.
 */

export type BillingInfo = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const INPUT_CLASS =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';

function Field({
  id, label, children,
}: {
  id: string; label: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-widest text-zinc-600">
        {label}<span className="text-zinc-700 ml-1">*</span>
      </label>
      {children}
    </div>
  );
}

export default function NmiCardForm({
  formUrl, billing, total, onBack,
}: {
  formUrl: string;
  billing: BillingInfo;
  total: string;
  onBack: () => void;
}) {
  const [paying, setPaying] = useState(false);

  return (
    <form
      action={formUrl}
      method="post"
      encType="application/x-www-form-urlencoded"
      onSubmit={() => setPaying(true)}
      className="flex flex-col gap-10"
    >
      {/*
        Billing details for AVS/CVV matching, mirrored from the shipping step.
        Step-1 XML carries no <billing> block, so NMI takes it here instead.
        Field names match NMI's Step-2 spec (hyphenated, same as the XML elements).
      */}
      <input type="hidden" name="billing-first-name" value={billing.firstName} />
      <input type="hidden" name="billing-last-name" value={billing.lastName} />
      <input type="hidden" name="billing-address1" value={billing.address1} />
      <input type="hidden" name="billing-address2" value={billing.address2} />
      <input type="hidden" name="billing-city" value={billing.city} />
      <input type="hidden" name="billing-state" value={billing.state} />
      <input type="hidden" name="billing-postal" value={billing.zip} />
      <input type="hidden" name="billing-country" value={billing.country} />
      <input type="hidden" name="billing-email" value={billing.email} />

      <div className="flex flex-col gap-5">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600 border-b border-zinc-800 pb-3">
          Card Details
        </p>

        <Field id="cc-number" label="Card Number">
          <input
            id="cc-number"
            name="billing-cc-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            required
            maxLength={19}
            pattern="[0-9 ]{13,19}"
            placeholder="4111 1111 1111 1111"
            className={INPUT_CLASS}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field id="cc-exp" label="Expiry (MMYY)">
            <input
              id="cc-exp"
              name="billing-cc-exp"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              required
              maxLength={4}
              pattern="(0[1-9]|1[0-2])[0-9]{2}"
              placeholder="1228"
              className={INPUT_CLASS}
            />
          </Field>
          <Field id="cc-cvv" label="CVV">
            <input
              id="cc-cvv"
              name="billing-cvv"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              required
              maxLength={4}
              pattern="[0-9]{3,4}"
              placeholder="123"
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <div className="border border-zinc-800 p-6 flex flex-col gap-3">
        <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-600">
          [ Secure Transmission ]
        </p>
        <p className="text-sm font-mono text-zinc-500 leading-7">
          Your card details are submitted directly to{' '}
          <strong className="text-zinc-300">PaymentCloud</strong>, a PCI-DSS
          compliant processor. They are never sent to or stored on our servers.
        </p>
      </div>

      <button
        type="submit"
        disabled={paying}
        className={[
          'h-12 px-8 w-full text-xs font-bold tracking-[0.2em] uppercase transition-colors',
          paying
            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            : 'bg-white text-black hover:bg-zinc-100',
        ].join(' ')}
      >
        {paying ? 'Processing Payment…' : `Pay ${total} →`}
      </button>

      <button
        type="button"
        onClick={onBack}
        disabled={paying}
        className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-700 hover:text-zinc-400 transition-colors text-center disabled:hover:text-zinc-700"
      >
        ← Edit Shipping Details
      </button>
    </form>
  );
}
