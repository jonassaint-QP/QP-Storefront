import 'server-only';

const NMI_CUSTOMERS_URL = process.env.NMI_V5_CUSTOMERS_URL ?? 'https://secure.nmi.com/api/v5/customers';

type VaultAddress = {
  first_name?: string;
  last_name?: string;
  email: string;
  address_1?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: 'US'| 'CA';
};

export type CreateVaultCustomerInput = {
  paymentToken: string;
  billingAddress: VaultAddress;
  shippingAddress?: VaultAddress;
};

type NmiVaultResponse = {
  id?: string;
  customer_vault_id?: string;
  response_text?: string;
  message?: string;
};

/**
 * Create a Customer Vault record through NMI v5.
 *
 * The payment token must come from NMI's client-side tokenization/payment
 * component. Raw card data must never enter this server or our database.
 */
export async function createNmiVaultCustomer(
  input: CreateVaultCustomerInput,
): Promise<{ vaultId: string }> {
  const apiKey = process.env.NMI_PRIVATE_API_KEY;
  if (!apiKey) throw new Error('NMI_PRIVATE_API_KEY is not configured.');
  if (!input.paymentToken) throw new Error('A payment token is required.');

  const response = await fetch(NMI_CUSTOMERS_URL, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      payment_details: { payment_token: input.paymentToken },
      billing_address: input.billingAddress,
      ...(input.shippingAddress ? { shipping_address: input.shippingAddress } : {}),
    }),
  });

  const payload = (await response.json()) as NmiVaultResponse;
  const vaultId = payload.id ?? payload.customer_vault_id;
  if (!response.ok || !vaultId) {
    throw new Error(payload.response_text ?? payload.message ?? `NMI vault request failed (${response.status}).`);
  }
  return { vaultId };
}
