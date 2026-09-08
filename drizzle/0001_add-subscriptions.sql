-- Sovereign Body Lube Club: storefront-managed subscription records
-- One row per membership. billing_day is customer-chosen (1-31);
-- interval_months is 1, 2, 3, 4, 6, or 12. Flat per-shipment pricing at all
-- intervals. NMI executes each charge; the payment webhook updates the
-- linked store_order and the subscription row.
CREATE TABLE IF NOT EXISTS "subscriptions" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "tier" varchar(32) NOT NULL,
  "product_label" varchar(64) NOT NULL,
  "sku" varchar(32) NOT NULL,
  "price_per_shipment" numeric(10, 2) NOT NULL,
  "billing_day" integer NOT NULL,
  "interval_months" integer NOT NULL,
  "status" varchar(20) DEFAULT 'active' NOT NULL,
  "founding" boolean DEFAULT false NOT NULL,
  "founding_code" varchar(16),
  "next_charge_date" timestamp NOT NULL,
  "last_charge_date" timestamp,
  "shipping_address" jsonb,
  "last_order_id" integer REFERENCES "store_orders"("id"),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp
);
