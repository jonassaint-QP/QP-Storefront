CREATE TABLE "store_orders" (
	"id" serial PRIMARY KEY,
	"status" text DEFAULT 'pending' NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text DEFAULT '' NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip" text NOT NULL,
	"country" text NOT NULL,
	"items" jsonb NOT NULL,
	"amount_cents" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"transaction_id" text,
	"gateway_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp
);
--> statement-breakpoint
CREATE INDEX "store_orders_status_created_at_idx" ON "store_orders" ("status","created_at");