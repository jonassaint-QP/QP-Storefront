-- The Estate (128 oz / 1 gallon) waitlist. No charge, no checkout —
-- email capture only until PaymentCloud approves the $299.99 per-charge cap.
CREATE TABLE IF NOT EXISTS "estate_waitlist" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "source" text DEFAULT 'estate-coming-soon' NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "estate_waitlist_email_unique" ON "estate_waitlist" ("email");
