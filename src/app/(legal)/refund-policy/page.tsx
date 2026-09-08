import type { Metadata } from 'next';
import LegalLayout, { Section } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Refund & Return Policy — Queer Pathways',
  robots: { index: false, follow: false },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      tag="Legal Document"
      title="Refund & Return Policy"
      lastUpdated="September 8, 2026"
    >
      <Section heading="The Short Version">
        <p>
          The Sovereign Body Lube Club is a recurring retail subscription for adult,
          consensual, personal use. <strong className="text-white">Completed charges
          and shipments are final.</strong> They are not refundable except where the law
          requires otherwise.
        </p>
      </Section>

      <Section heading="What Final Means">
        <p>
          Once a charge has processed, it is not automatically reversed by a later
          cancellation, pause, skip, or interval change. Canceling stops future scheduled
          charges and shipments as shown at the point of cancellation — it does not undo a
          charge that already went through.
        </p>
      </Section>

      <Section heading="Legally Required Exceptions">
        <p>We will apply any remedy the law requires, including for:</p>
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>
            — <strong className="text-white">Defective goods:</strong> product arrives
            damaged, defective, or not fit for its stated purpose.
          </li>
          <li>
            — <strong className="text-white">Unauthorized charges:</strong> a charge you
            did not authorize, or an amount that differs from what was disclosed at
            checkout.
          </li>
          <li>
            — <strong className="text-white">Misdescribed goods:</strong> product materially
            different from what was shown before consent.
          </li>
          <li>
            — <strong className="text-white">Undelivered goods:</strong> a shipment paid
            for but not delivered.
          </li>
          <li>
            — <strong className="text-white">Non-waivable rights:</strong> any consumer
            protection that cannot be waived by contract under applicable law.
          </li>
        </ul>
      </Section>

      <Section heading="How to Request Review">
        <p>
          If you believe an exception applies, contact us at{' '}
          <a
            href="mailto:jonassaint@queerpathways.org"
            className="text-white underline hover:text-zinc-300 transition-colors"
          >
            jonassaint@queerpathways.org
          </a>{' '}
          with your order or subscription reference. We will review and apply any legally
          required remedy. Retail inquiries are handled separately from clinical
          correspondence.
        </p>
      </Section>

      <Section heading="Your Statement">
        <p>
          Subscription charges appear on your card or bank statement as{' '}
          <strong className="text-white">QUEER PATHWAYS LLC</strong>.
        </p>
      </Section>

      <Section heading="Shipping Territory">
        <p>
          The Club ships to United States addresses at launch. Canada is a future,
          non-binding target, not a current offer.
        </p>
      </Section>

      <Section heading="One More Thing">
        <p>
          The Club is retail gear — adult, consensual, personal sensory preference. Not
          medicine, not treatment, and never a promise.
        </p>
      </Section>
    </LegalLayout>
  );
}
