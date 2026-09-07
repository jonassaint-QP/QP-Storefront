import type { MetadataRoute } from 'next';
import { PRODUCTS, STOREFRONT_ROUTES, getStorefrontRouteForProduct } from '@/lib/products';

const SITE_URL = 'https://queerpathways.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/prepare`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const routeRoutes: MetadataRoute.Sitemap = STOREFRONT_ROUTES.map((route) => ({
    url: `${SITE_URL}/shop/${route.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/shop/${getStorefrontRouteForProduct(product)}/${product.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...routeRoutes, ...productRoutes];
}