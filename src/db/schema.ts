import { pgTable, serial, text, timestamp, integer, boolean, numeric, jsonb, varchar, uniqueIndex } from 'drizzle-orm/pg-core';

/**
 * store_orders — one row per checkout attempt / order.
 * Existing table (pre-SBLC). Payload columns added by 0000 migration.
 */
export const store_orders = pgTable('store_orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  email: text('email').notNull(),
  totalAmount: text('total_amount').notNull(),
  status: text('status').notNull().default('pending'),
  transactionId: text('transaction_id'),
  shippingAddress: jsonb('shipping_address'),
  items: jsonb('items'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

/**
 * subscriptions — Sovereign Body Lube Club storefront-managed rows.
 * One row per membership. billing_day customer-chosen (1-31); interval_months
 * 1, 2, 3, 4, 6, or 12. Flat per-shipment pricing. NMI executes each charge.
 */
export const subscriptions = pgTable(
  'subscriptions',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    tier: varchar('tier', { length: 32 }).notNull(),
    productLabel: varchar('product_label', { length: 64 }).notNull(),
    sku: varchar('sku', { length: 32 }).notNull(),
    pricePerShipment: numeric('price_per_shipment', { precision: 10, scale: 2 }).notNull(),
    billingDay: integer('billing_day').notNull(),
    intervalMonths: integer('interval_months').notNull(),
    status: varchar('status', { length: 20 }).notNull().default('active'),
    founding: boolean('founding').notNull().default(false),
    foundingCode: varchar('founding_code', { length: 16 }),
    nextChargeDate: timestamp('next_charge_date').notNull(),
    lastChargeDate: timestamp('last_charge_date'),
    shippingAddress: jsonb('shipping_address'),
    nmiVaultId: varchar('nmi_vault_id', { length: 128 }),  
    lastOrderId: integer('last_order_id').references(() => store_orders.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
);

export const estate_waitlist = pgTable(
  'estate_waitlist',
  {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    source: text('source').notNull().default('estate-coming-soon'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    emailUnique: uniqueIndex('estate_waitlist_email_unique').on(table.email),
  }),
);
