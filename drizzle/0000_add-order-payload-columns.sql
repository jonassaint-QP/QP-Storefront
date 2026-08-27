ALTER TABLE "store_orders"
ADD COLUMN IF NOT EXISTS "shipping_address" jsonb,
ADD COLUMN IF NOT EXISTS "items" jsonb;
