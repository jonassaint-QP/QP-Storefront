'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/products';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

type ShippingForm = {
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

const EMPTY_FORM: ShippingForm = {
  email: '', firstName: '', lastName: '',
  address1: '', address2: '', city: '',
  state: '', zip: '', country: 'US',
};

function Field({
  id, label, required = true, children,
}: {
  id: string; label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-widest text-zinc-600">
        {label}{required && <span className="text-zinc-700 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const INPUT_CLASS =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';
const SELECT_CLASS =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white focus:outline-none focus:border-zinc-500 transition-colors appearance-none';

export default function CheckoutPage() {
  const formId = useId();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);

  function set(field: keyof ShippingForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<ShippingForm> = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Valid email required';
    if (!form.firstName.trim()) next.firstName = 'Required';
    if (!form.lastName.trim()) next.lastName = 'Required';
    if (!form.address1.trim()) next.address1 = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.state) next.state = 'Required';
    if (!form.zip.trim() || !/^\d{5}(-\d{4})?$/.test(form.zip))
      next.zip = 'Valid ZIP required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setGatewayError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        }),
      });
      const data = await res.json() as { redirectUrl?: string; error?: string };
      if (!res.ok || !data.redirectUrl) {
        setGatewayError(data.error ?? 'Payment gateway unavailable. Please try again.');
        setSubmitting(false);
        return;
      }
      // Clear cart before leaving — the webhook will handle order confirmation
      clearCart();
      window.location.assign(data.redirectUrl);
    } catch {
      setGatewayError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6 py-32 flex flex-col items-center text-center gap-6">
        <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-700">
          [ Nothing to Check Out ]
        </p>
        <p className="text-sm font-mono text-zinc-600 leading-7">Your cart is empty.</p>
        <Link
          href="/shop"
          className="h-12 px-8 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase flex items-center transition-colors hover:bg-zinc-100"
        >
          Enter the Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">

      {/* Page header */}
      <div className="border-b border-zinc-800 px-6 py-12 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.35em] font-mono uppercase text-zinc-600">
            [ Checkout ]
          </p>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-white">
            Shipping &amp; Payment
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Shipping form */}
          <form id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">

            {/* Contact */}
            <div className="flex flex-col gap-5">
              <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600 border-b border-zinc-800 pb-3">
                Contact
              </p>
              <Field id={`${formId}-email`} label="Email Address">
                <input
                  id={`${formId}-email`}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-xs font-mono text-red-500">{errors.email}</p>
                )}
              </Field>
              <p className="text-xs font-mono text-zinc-700 leading-6">
                Used for order confirmation only. Not stored for marketing.
              </p>
            </div>

            {/* Shipping address */}
            <div className="flex flex-col gap-5">
              <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600 border-b border-zinc-800 pb-3">
                Shipping Address
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Field id={`${formId}-fn`} label="First Name">
                  <input
                    id={`${formId}-fn`}
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => set('firstName', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.firstName && (
                    <p className="text-xs font-mono text-red-500">{errors.firstName}</p>
                  )}
                </Field>
                <Field id={`${formId}-ln`} label="Last Name">
                  <input
                    id={`${formId}-ln`}
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => set('lastName', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.lastName && (
                    <p className="text-xs font-mono text-red-500">{errors.lastName}</p>
                  )}
                </Field>
              </div>

              <Field id={`${formId}-a1`} label="Address Line 1">
                <input
                  id={`${formId}-a1`}
                  type="text"
                  autoComplete="address-line1"
                  value={form.address1}
                  onChange={(e) => set('address1', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Street address, P.O. box"
                />
                {errors.address1 && (
                  <p className="text-xs font-mono text-red-500">{errors.address1}</p>
                )}
              </Field>

              <Field id={`${formId}-a2`} label="Address Line 2" required={false}>
                <input
                  id={`${formId}-a2`}
                  type="text"
                  autoComplete="address-line2"
                  value={form.address2}
                  onChange={(e) => set('address2', e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="Apt, suite, unit (optional)"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field id={`${formId}-city`} label="City">
                  <input
                    id={`${formId}-city`}
                    type="text"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(e) => set('city', e.target.value)}
                    className={INPUT_CLASS}
                  />
                  {errors.city && (
                    <p className="text-xs font-mono text-red-500">{errors.city}</p>
                  )}
                </Field>
                <Field id={`${formId}-state`} label="State">
                  <select
                    id={`${formId}-state`}
                    autoComplete="address-level1"
                    value={form.state}
                    onChange={(e) => set('state', e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-xs font-mono text-red-500">{errors.state}</p>
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field id={`${formId}-zip`} label="ZIP Code">
                  <input
                    id={`${formId}-zip`}
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.zip}
                    onChange={(e) => set('zip', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="12345"
                  />
                  {errors.zip && (
                    <p className="text-xs font-mono text-red-500">{errors.zip}</p>
                  )}
                </Field>
                <Field id={`${formId}-country`} label="Country">
                  <select
                    id={`${formId}-country`}
                    autoComplete="country"
                    value={form.country}
                    onChange={(e) => set('country', e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Payment handoff note */}
            <div className="border border-zinc-800 p-6 flex flex-col gap-3">
              <p className="text-xs tracking-[0.25em] font-mono uppercase text-zinc-600">
                [ Payment Processing ]
              </p>
              <p className="text-sm font-mono text-zinc-500 leading-7">
                Payment is processed securely via{' '}
                <strong className="text-zinc-300">PaymentCloud</strong> — a PCI-DSS
                compliant high-risk payment processor. You will be redirected to their
                secure hosted payment page after submitting your shipping information.
                Your card data is never stored on our servers.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={[
                'h-12 px-8 w-full text-xs font-bold tracking-[0.2em] uppercase transition-colors',
                submitting
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-zinc-100',
              ].join(' ')}
            >
              {submitting ? 'Redirecting to Payment…' : 'Continue to Payment →'}
            </button>

            {gatewayError && (
              <p role="alert" className="text-xs font-mono text-red-400 leading-6 border border-red-900 bg-red-950/30 px-4 py-3">
                {gatewayError}
              </p>
            )}
          </form>

          {/* Order summary */}
          <div className="border border-zinc-800 p-8 flex flex-col gap-6 sticky top-20">
            <p className="text-xs tracking-[0.3em] font-mono uppercase text-zinc-600">
              [ Order Summary ]
            </p>

            <ul className="flex flex-col divide-y divide-zinc-900">
              {items.map((item) => (
                <li key={item.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-xs font-black font-mono uppercase text-white leading-tight truncate">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-zinc-700">
                      Qty {item.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-black font-mono text-white tabular-nums shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="border-zinc-800" />

            <div className="flex flex-col gap-2 text-sm font-mono">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                <span className="tabular-nums">{totalPrice}</span>
              </div>
              <div className="flex justify-between text-zinc-600 text-xs">
                <span>Shipping</span>
                <span>Calculated next step</span>
              </div>
              <hr className="border-zinc-900" />
              <div className="flex justify-between text-white font-black">
                <span>Total</span>
                <span className="tabular-nums">{totalPrice}</span>
              </div>
            </div>

            <div className="border-l-2 border-zinc-800 pl-3">
              <p className="text-xs font-mono text-zinc-700 leading-6">
                All orders ship in plain, unbranded packaging with a non-descript return address.
              </p>
            </div>

            <Link
              href="/cart"
              className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-700 hover:text-zinc-400 transition-colors text-center"
            >
              ← Edit Cart
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
