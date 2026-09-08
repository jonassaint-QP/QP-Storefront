import { pgTable, serial, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

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
