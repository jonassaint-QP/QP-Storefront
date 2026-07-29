import { drizzle } from 'drizzle-orm/netlify-db';
import * as schema from './schema';

/**
 * Netlify Database (managed Postgres). The connection is configured by the
 * platform at runtime — there is no connection string to pass or store.
 *
 * The client is created on first use rather than at import time. `drizzle()`
 * throws when NETLIFY_DB_URL is absent, and route handler modules get imported
 * during `next build`, where the variable may not be present. Constructing it
 * lazily keeps that a request-time error instead of a build failure.
 */
function createClient() {
  return drizzle({ schema });
}

let client: ReturnType<typeof createClient> | undefined;

export function getDb(): ReturnType<typeof createClient> {
  client ??= createClient();
  return client;
}
