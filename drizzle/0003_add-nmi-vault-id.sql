-- Store only the NMI Customer Vault identifier. Never store PAN, CVV,
-- expiration, or payment tokens in the Queer Pathways database.
ALTER TABLE "subscriptions"
  ADD COLUMN IF NOT EXISTS "nmi_vault_id" varchar(128);
