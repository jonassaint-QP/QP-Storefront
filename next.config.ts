import type { NextConfig } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

// Content-Security-Policy — strict allowlist; tighten further when
// PaymentCloud hosted page redirect URL is confirmed.
const CSP = [
  "default-src 'self'",
  // Scripts: self + Next.js inline bootstrap
  "script-src 'self' 'unsafe-inline'",
  // Styles: self + Tailwind inline styles
  "style-src 'self' 'unsafe-inline'",
  // Fonts: Google Fonts for Geist (loaded via next/font — served from self after build)
  "font-src 'self' data:",
  // Images: self + data URIs
  "img-src 'self' data: blob:",
  // Connect: self + NMI gateway (Step-1 server-side fetch goes via Route Handler,
  // but NMI may also make client-side calls during the hosted payment flow)
  `connect-src 'self' ${SITE_URL} https://secure.networkmerchants.com`,
  // Frames: NMI hosted payment page opens via redirect, not iframe
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // Allow form POST back from NMI Step-3 to our webhook
  "form-action 'self' https://secure.networkmerchants.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: CSP,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
