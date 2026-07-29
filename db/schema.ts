import { pgTable, serial, text, integer, jsonb, timestamp, index } from 'drizzle-orm/pg-core';

/**
 * Line items are frozen onto the order at creation time. The catalogue is a
 * static file today, but a price change must never rewrite what a customer was
 * charged, so the name and price are copied rather than referenced.
 */
export type OrderItem = {
  id: string;
  name: string;
  price: number; // USD, whole dollars — as it appeared in the catalogue
  quantity: number;
};

/**
 * `status` lifecycle:
 *   pending  — created before the gateway is contacted; no money has moved
 *   paid     — gateway approved the charge (Step 3 completed)
 *   failed   — gateway declined, or the customer abandoned the card step
 */
export type OrderStatus = 'pending' | 'paid' | 'failed';

export const storeOrders = pgTable(
  'store_orders',
  {
    id: serial().primaryKey(),
    status: text().$type<OrderStatus>().notNull().default('pending'),

    // Contact + shipping, captured at the shipping step
    email: text().notNull(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    address1: text().notNull(),
    address2: text().notNull().default(''),
    city: text().notNull(),
    state: text().notNull(),
    zip: text().notNull(),
    country: text().notNull(),

    // What was ordered, and for how much
    items: jsonb().$type<OrderItem[]>().notNull(),
    amountCents: integer('amount_cents').notNull(),
    currency: text().notNull().default('USD'),

    // Filled in by the gateway callback
    transactionId: text('transaction_id'),
    gatewayMessage: text('gateway_message'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    paidAt: timestamp('paid_at'),
  },
  (table) => [index('store_orders_status_created_at_idx').on(table.status, table.createdAt)],
);
