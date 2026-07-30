import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

type DrizzleDb = ReturnType<typeof drizzle>;

// Defer initialization until first query so the build succeeds without DATABASE_URL
let _db: DrizzleDb | undefined;

function getInstance(): DrizzleDb {
  if (!_db) _db = drizzle(neon(process.env.DATABASE_URL!));
  return _db;
}

export const db = new Proxy({} as DrizzleDb, {
  get(_, prop) {
    const instance = getInstance();
    const val = (instance as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === 'function' ? (val as (...a: unknown[]) => unknown).bind(instance) : val;
  },
});
