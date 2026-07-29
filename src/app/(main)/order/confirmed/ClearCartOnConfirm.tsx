'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

/**
 * Empties the cart once the gateway has confirmed the charge.
 *
 * The cart used to be cleared at the moment we handed off to the gateway, which
 * threw the order away even when the payment was declined. Clearing it here
 * means a failed payment leaves the cart intact so the customer can retry.
 */
export default function ClearCartOnConfirm() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
