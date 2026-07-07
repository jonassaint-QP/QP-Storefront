import type { Metadata } from 'next';
import LegalLayout, { Section } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy — Queer Pathways',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      tag="Legal Document"
      title="Privacy Policy"
      lastUpdated="June 7, 2026"
    >
      <Section heading="1. Our Commitment">
        <p>
          Queer Pathways is built on a{' '}
          <strong className="text-white">data minimization</strong> philosophy. We collect
          only what is strictly necessary to process your order. We do not sell, rent, or
          broker your personal data to third parties.
        </p>
        <p>
          We understand that our customers require exceptional discretion. Every data
          handling decision is made with your safety and privacy as the primary constraint.
        </p>
      </Section>

      <Section heading="2. Data We Collect">
        <p>We collect the following categories of data only when necessary:</p>
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>
            — <strong className="text-white">Order data:</strong> name, shipping address,
            email address, and order contents — used solely to fulfill and communicate about
            your order.
          </li>
          <li>
            — <strong className="text-white">Payment data:</strong> processed entirely by
            our payment processor (PaymentCloud). We never store full card numbers on our
            servers.
          </li>
          <li>
            — <strong className="text-white">Technical data:</strong> IP address and browser
            type, retained briefly for fraud prevention and then purged.
          </li>
        </ul>
        <p>
          We do <strong className="text-white">not</strong> collect demographic data, build
          advertising profiles, or use tracking pixels from third-party ad networks.
        </p>
      </Section>

      <Section heading="3. Age Verification">
        <p>
          Our age gate stores a single boolean flag in your browser&apos;s{' '}
          <code className="text-zinc-300">localStorage</code> to remember your confirmation.
          No age verification data is transmitted to or stored on our servers.
        </p>
      </Section>

      <Section heading="4. How We Use Your Data">
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>— To process and ship your order.</li>
          <li>— To send order confirmation and shipping notifications.</li>
          <li>— To respond to support requests you initiate.</li>
          <li>— To comply with legal obligations.</li>
        </ul>
        <p>We do not use your data for marketing without your explicit opt-in.</p>
      </Section>

      <Section heading="5. Data Retention">
        <p>
          Order data is retained for the minimum period required by applicable tax and
          accounting law, after which it is securely purged. Non-essential data (e.g.,
          browsing session logs) is purged on a rolling 30-day cycle.
        </p>
        <p>
          You may request deletion of your personal data at any time by contacting us. We
          will action deletion requests within 30 days, subject to legal retention
          requirements.
        </p>
      </Section>

      <Section heading="6. Data Security">
        <p>
          This site operates exclusively over{' '}
          <strong className="text-white">HTTPS with an active SSL certificate</strong>. Data
          at rest in our database is encrypted. Access to production data is restricted to
          essential personnel only.
        </p>
        <p>
          In the event of a data breach that affects your personal information, we will
          notify you within 72 hours of becoming aware of the breach.
        </p>
      </Section>

      <Section heading="7. Third-Party Services">
        <p>We use the following third-party services, each with their own privacy policies:</p>
        <ul className="list-none flex flex-col gap-2 pl-4 border-l border-zinc-800">
          <li>
            — <strong className="text-white">PaymentCloud:</strong> Payment processing.
            Your card data is handled entirely by them under PCI-DSS compliance.
          </li>
          <li>
            — <strong className="text-white">Shipping carriers:</strong> Your name and
            shipping address are shared with our carrier solely to deliver your package.
          </li>
        </ul>
        <p>
          We do not integrate Facebook Pixel, Google Ads, or any other behavioral tracking
          technology.
        </p>
      </Section>

      <Section heading="8. Cookies">
        <p>
          We use only functional cookies and browser storage strictly necessary for site
          operation (e.g., your shopping cart and age verification flag). We do not use
          analytics or advertising cookies.
        </p>
      </Section>

      <Section heading="9. Your Rights">
        <p>
          Depending on your jurisdiction, you may have rights including: access to your
          data, correction of inaccurate data, deletion of your data, and portability of
          your data. To exercise any of these rights, contact us using the details below.
        </p>
      </Section>

      <Section heading="10. Changes to This Policy">
        <p>
          We may update this policy to reflect changes in our practices or legal obligations.
          The &quot;last updated&quot; date at the top of this page will reflect the most recent
          revision. Continued use of the site constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section heading="11. Contact">
        <p>
          For privacy requests or concerns, contact us at{' '}
          <a
            href="mailto:privacy@queerpathways.com"
            className="text-white underline hover:text-zinc-300 transition-colors"
          >
            privacy@queerpathways.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
