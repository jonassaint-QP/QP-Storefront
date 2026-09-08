import { boolean, integer, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const store_orders = pgTable('store_orders', {
  id: serial('id').primaryKey(),
  customerName: text('customer_name').notNull(),
  email: text('email').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  transactionId: varchar('transaction_id', { length: 100 }),
  shippingAddress: jsonb('shipping_address'),
  items: jsonb('items'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});

export const subscriptions = pgTable('subscriptions', {
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
  lastOrderId: integer('last_order_id').references(() => store_orders.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});
