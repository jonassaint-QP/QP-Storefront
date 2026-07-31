import fs from 'fs';
import path from 'path';

export type IncomingRawProduct = {
  sku: string;
  name: string;
  categorySlug: 'technical-toys' | 'lubes' | 'internal-expansion' | 'double-outsider';
  costPrice: number;
  description?: string;
  material?: string;
  vendor?: 'Eldorado SFTP' | 'STD Manual Portal' | 'Williams Trading';
  image?: string;
};

/**
 * Calculates retail price based on cost price and markup rules.
 * Default: 2.2x markup (keystone + 20%)
 */
export function calculateRetailPrice(costPrice: number, markupFactor = 2.2): number {
  return Math.ceil(costPrice * markupFactor) - 0.01;
}

/**
 * Converts product name to URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Parses TSV/CSV feed file into raw product records.
 */
export function parseFeedFile(filePath: string): IncomingRawProduct[] {
  if (!fs.existsSync(filePath)) {
    console.error(`Feed file not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const delimiter = filePath.endsWith('.tsv') ? '\t' : ',';
  const headers = lines[0].split(delimiter).map((h) => h.trim().toLowerCase());

  const products: IncomingRawProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(delimiter).map((c) => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] || '';
    });

    const sku = row['sku'] || row['item_number'] || row['item'] || `SKU-${i}`;
    const name = row['title'] || row['name'] || row['product_name'] || 'Unnamed Product';
    const costPrice = parseFloat(row['wholesale_price'] || row['cost'] || row['price'] || '0');

    if (isNaN(costPrice) || costPrice <= 0) continue;

    products.push({
      sku,
      name,
      categorySlug: 'technical-toys', // Default category
      costPrice,
      description: row['description'] || row['body'] || '',
      material: row['material'] || 'Body-safe material',
      vendor: filePath.toLowerCase().includes('eldorado') ? 'Eldorado SFTP' : 'STD Manual Portal',
      image: row['image_url'] || row['image'] || `/images/products/${slugify(name)}.jpg`,
    });
  }

  return products;
}
