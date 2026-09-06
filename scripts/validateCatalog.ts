/**
 * Catalog integrity migration validator.
 *
 * Run with: npm run validate:catalog
 * During migration this reports legacy records without failing the build.
 * The fail gate is enabled after the launch shelf is normalized.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CANONICAL_SKUS } from '../src/lib/sku-registry';
import { PRODUCTS } from '../src/lib/products';

type Product = {
  name?: string;
  sku?: string;
  image?: string;
  images?: string[];
};

const errors: string[] = [];
const legacy: string[] = [];
const seen = new Map<string, string>();
const productList = PRODUCTS as Product[];

for (const product of productList) {
  const name = product.name ?? '(unnamed product)';
  const sku = product.sku;

  if (!sku) {
    legacy.push(`${name}: missing SKU`);
    continue;
  }

  if (seen.has(sku)) {
    errors.push(`duplicate SKU ${sku}: ${seen.get(sku)} and ${name}`);
  } else {
    seen.set(sku, name);
  }

  if (/-QP$/i.test(sku)) {
    errors.push(`${name}: forbidden internal suffix in SKU ${sku}`);
  }

  if (!CANONICAL_SKUS.has(sku)) {
    legacy.push(`${name}: SKU ${sku} is not yet in the registry`);
  }

  const references = [product.image, ...(product.images ?? [])].filter(Boolean) as string[];
  for (const reference of references) {
    const relative = reference.replace(/^\//, '');
    const filePath = path.join(process.cwd(), 'public', relative.replace(/^public\//, ''));
    if (!fs.existsSync(filePath)) {
      errors.push(`${name} (${sku}): missing image ${reference}`);
    }
  }
}

console.log(`Catalog scan: ${productList.length} product records`);
console.log(`Canonical SKU registry: ${CANONICAL_SKUS.size} entries`);

if (errors.length) {
  console.error('\nBlocking integrity errors:');
  for (const error of errors) console.error(`- ${error}`);
}

if (legacy.length) {
  console.warn('\nMigration items (not yet build-blocking):');
  for (const item of legacy) console.warn(`- ${item}`);
}

if (errors.length) process.exitCode = 1;
