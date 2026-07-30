'use client';

const INPUT =
  'h-10 bg-zinc-950 border border-zinc-800 px-4 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors';

// action POSTs raw card data directly to NMI — it never touches our server
export default function PaymentForm({ formUrl }: { formUrl: string }) {
  return (
    <form action={formUrl} method="POST" className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-2">
        <label htmlFor="ccnumber" className="text-xs font-mono uppercase tracking-widest text-zinc-600">
          Card Number <span className="text-zinc-700 ml-1">*</span>
        </label>
        <input
          type="text"
          id="ccnumber"
          name="billing-cc-number"
          autoComplete="cc-number"
          inputMode="numeric"
          required
          className={INPUT}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="ccexp" className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            Expiry (MMYY) <span className="text-zinc-700 ml-1">*</span>
          </label>
          <input
            type="text"
            id="ccexp"
            name="billing-cc-exp"
            autoComplete="cc-exp"
            inputMode="numeric"
            placeholder="0125"
            required
            className={INPUT}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="cvv" className="text-xs font-mono uppercase tracking-widest text-zinc-600">
            CVV <span className="text-zinc-700 ml-1">*</span>
          </label>
          <input
            type="text"
            id="cvv"
            name="billing-cvv"
            autoComplete="cc-csc"
            inputMode="numeric"
            required
            className={INPUT}
          />
        </div>
      </div>

      {/*
        CRITICAL: no onClick / disabled / isSubmitting state on this button.
        Disabling the button on click triggers a React re-render that aborts
        the browser's native cross-origin POST before NMI receives it.
      */}
      <button
        type="submit"
        className="h-12 w-full bg-[#46287a] text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors hover:bg-[#de7e0d]"
      >
        Complete Purchase
      </button>
    </form>
  );
}
