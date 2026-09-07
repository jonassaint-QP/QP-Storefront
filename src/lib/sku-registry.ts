/**
 * Canonical manufacturer SKU registry.
 *
 * Product SKU values must remain exactly as supplied by the manufacturer.
 * Internal collection/vendor/lane metadata belongs on the product record,
 * never in the SKU string.
 */
export const SKU_REGISTRY = {
  EC720: { vendor: 'Sex Toy Distributing', collection: 'Jasper', status: 'launch' },
  AJ098: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  AH155: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  AH158: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  AH354: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  AH409: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  AF596: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  CN1036: { vendor: 'Sex Toy Distributing', collection: 'Sub-$224 Shelf', status: 'review' },
  AH700: { vendor: 'Sex Toy Distributing', collection: 'Big Ticket', status: 'shelved' },
  SPSNK2PS: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SKSPNK4PS: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SK1434: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SKSLPS16: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  'BBL060-03': { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNSL16: {
    vendor: 'Eldorado Trading Company',
    collection: 'Lube',
    status: 'launch',
    club: 'sovereign-body-lube-club',
    tier: 'main-stage',
  },
  SNSL32: {
    vendor: 'Eldorado Trading Company',
    collection: 'Lube',
    status: 'launch',
    club: 'sovereign-body-lube-club',
    tier: 'throne',
    availability: 'limited-preorder',
  },
  // Existing public lube records confirmed for the launch lock
  KS12084: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IE04960: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  WIC91205: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDMLL02: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  BA012: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  JO40036: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IE060240: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNSL2: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  BBGOLD: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  '6755-12': { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SS36001: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SS77016: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SS09916: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  'DJ5079-03': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  'DJ5079-01': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  'BV-162': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  'DJ0268-00': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  'BV-029BLK': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  LOV0142: { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'review' },
  'QP-SOCK-BW': { vendor: 'Queer Pathways', collection: 'Double-Outsider', status: 'review' },
  'QP-SOCK-NW': { vendor: 'Queer Pathways', collection: 'Double-Outsider', status: 'review' },
  'LP-01-SRC': { vendor: 'Queer Pathways', collection: 'Loop', status: 'review' },
  'LP-02-BSL': { vendor: 'Queer Pathways', collection: 'Loop', status: 'review' },
  'LP-03-TNS': { vendor: 'Queer Pathways', collection: 'Loop', status: 'review' },
  'LP-10-CMP': { vendor: 'Queer Pathways', collection: 'Loop', status: 'review' },
  XRAC323: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'review' },

  // Registered 2026-09-07 — reconciliation: live catalog products confirmed launch
  // King Cock / Jasper attachments (Eldorado)
  PD556021: { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'launch' },
  PD550729: { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'launch' },
  'PD5504-21': { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'launch' },
  PD553429: { vendor: 'Eldorado Trading Company', collection: 'Jasper', status: 'launch' },
  // Swiss Navy / Lube (Eldorado)
  SNSL1: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNSL4: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNSL8: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNWL2: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNWL4: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNWL8: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNWL16: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNSL1G: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  SNWB1G: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  // ID / Lube (Eldorado)
  IDGLD01: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDGLD02: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDGLD04: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDGLD08: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDGLD17: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDPLS02: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDMLL08: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  IDDGSB08C2: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  // Astroglide / Lube (Eldorado)
  AG71607: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  AG71605: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  AG71604: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  AG101519: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  AG81600: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
  AG101913: { vendor: 'Eldorado Trading Company', collection: 'Lube', status: 'launch' },
} as const;

export type CanonicalSku = keyof typeof SKU_REGISTRY;
export const CANONICAL_SKUS = new Set<string>(Object.keys(SKU_REGISTRY));

export function isCanonicalSku(value: string): value is CanonicalSku {
  return CANONICAL_SKUS.has(value);
}
