import type { Metadata } from 'next';
import LegalLayout, { Section } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service — Queer Pathways',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalLayout
      tag="Legal Document"
      title="Terms of Service"
      lastUpdated="June 7, 2026"
    >
      <Section heading="1. Age Requirement">
        <p>
          You must be at least <strong className="text-white">18 years of age</strong> to
          access or use this website. By entering this site, you confirm that you meet this
          requirement. If you are under 18, you must leave immediately.
        </p>
        <p>
          We reserve the right to terminate access for any user we reasonably believe to be
          under the age of 18.
        </p>
      </Section>

      <Section heading="2. Nature of Content">
        <p>
          This website contains <strong className="text-white">explicit adult content</strong>,
          including images, descriptions, and products of a sexual and/or kink nature. By
          proceeding, you confirm that:
        </p>
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>— You are not offended by adult-oriented materials.</li>
          <li>— Viewing or purchasing such materials is legal in your jurisdiction.</li>
          <li>— You are accessing this site of your own free will.</li>
        </ul>
      </Section>

      <Section heading="3. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>— Use this site for any unlawful purpose.</li>
          <li>— Attempt to gain unauthorized access to any part of the platform.</li>
          <li>— Reproduce, redistribute, or resell any content without written permission.</li>
          <li>— Submit false, misleading, or fraudulent information during checkout.</li>
        </ul>
      </Section>

      <Section heading="4. Products & Orders">
        <p>
          All products are intended for use by consenting adults. Product descriptions are
          provided for informational purposes. We do not provide medical advice. Consult a
          qualified healthcare professional for any medical concerns.
        </p>
        <p>
          We reserve the right to refuse or cancel orders at our discretion, including where
          we suspect fraud or policy violations.
        </p>
      </Section>

      <Section heading="5. Refund Policy">
        <p>
          Due to the intimate nature of our products, all sales are{' '}
          <strong className="text-white">final on opened or used items</strong>. Unopened items
          in original packaging may be eligible for exchange within 14 days of delivery.
          Contact our support team to initiate a return request.
        </p>
        <p>
          Defective or incorrect items will be replaced or refunded at no cost to you.
        </p>
      </Section>

      <Section heading="6. Shipping & Discretion">
        <p>
          All orders ship in <strong className="text-white">plain, unbranded packaging</strong>.
          Return addresses on shipping labels will not reference the nature of the contents.
          We are not responsible for delays caused by carriers or customs.
        </p>
      </Section>

      <Section heading="7. Intellectual Property">
        <p>
          All site content, product imagery, copy, and branding are the property of Queer
          Pathways and may not be used without express written consent.
        </p>
      </Section>

      <Section heading="8. Limitation of Liability">
        <p>
          This site and its products are provided &quot;as is.&quot; To the fullest extent permitted by
          law, Queer Pathways disclaims all warranties and shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of this site
          or its products.
        </p>
      </Section>

      <Section heading="9. Governing Law">
        <p>
          These terms are governed by the laws of the jurisdiction in which Queer Pathways
          operates, without regard to conflict of law provisions.
        </p>
      </Section>

      <Section heading="10. Changes to These Terms">
        <p>
          We may update these terms at any time. Continued use of the site following any
          update constitutes acceptance of the revised terms. The &quot;last updated&quot; date at the
          top of this page reflects the most recent revision.
        </p>
      </Section>

      <Section heading="11. Contact">
        <p>
          For questions about these terms, contact us at{' '}
          <a
            href="mailto:legal@queerpathways.com"
            className="text-white underline hover:text-zinc-300 transition-colors"
          >
            legal@queerpathways.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
