export type OrderEmailPayload = {
  orderId: string | number;
  timestamp: string;
  transactionId: string;
  totalAmount: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    price: string | number;
    vendor?: string;
  }>;
  fulfillmentRoute: string;
};

/**
 * Generates the standardized email plain text body formatted specifically for
 * Google Workspace Studio's Gemini extractor parser.
 */
export function formatPaidOrderEmailText(payload: OrderEmailPayload): string {
  const itemsBlock = payload.items
    .map(
      (item) =>
        `- SKU: ${item.sku || 'N/A'} | Title: ${item.name} | Qty: ${item.quantity} | Price: $${item.price} | Vendor: ${item.vendor || 'STD Manual Portal'}`
    )
    .join('\n');

  return `=== NEW PAID ORDER ===  
Order Reference: ${payload.orderId}  
Timestamp: ${payload.timestamp}  
Gateway: NMI 3-Step Redirect (Transaction ID: ${payload.transactionId})  
Total Amount: $${payload.totalAmount} CAD/USD

--- CUSTOMER INFORMATION ---  
Name: ${payload.customerName}  
Email: ${payload.customerEmail}  
Phone: ${payload.customerPhone || 'N/A'}

--- SHIPPING ADDRESS ---  
Street: ${payload.shippingAddress.street}  
City: ${payload.shippingAddress.city}  
State/Province: ${payload.shippingAddress.state}  
Postal Code: ${payload.shippingAddress.postalCode}  
Country: ${payload.shippingAddress.country}

--- ORDERED ITEMS ---  
${itemsBlock}

=== FULFILLMENT ACTION REQUIRED ===  
- Drop-ship Route: ${payload.fulfillmentRoute}  
- Status: Ready for Packing / Vendor Submission`;
}
