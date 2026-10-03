import pg from 'pg';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.');
if (!process.env.ADMIN_TOKEN || process.env.ADMIN_TOKEN.length < 32) throw new Error('ADMIN_TOKEN must contain at least 32 characters.');
if (process.env.NODE_ENV === 'production' && !process.env.PUBLIC_ORIGIN) throw new Error('PUBLIC_ORIGIN must specify your frontend origin in production.');
const trustProxy = Number(process.env.TRUST_PROXY_HOPS || 0);
if (!Number.isInteger(trustProxy) || trustProxy < 0) throw new Error('TRUST_PROXY_HOPS must be a nonnegative integer.');
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 10, connectionTimeoutMillis: 10000 });
db.on('error', (err) => console.error('Database connection error:', err.code));
await db.query(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'));
const app = createApp({ db, adminToken: process.env.ADMIN_TOKEN, publicOrigin: process.env.PUBLIC_ORIGIN, trustProxy: trustProxy || false, staticDir: process.env.SERVE_FRONTEND === 'false' ? undefined : fileURLToPath(new URL('../dist', import.meta.url)) });
const server = app.listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('Portfolio server ready'));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => {
  server.close(async () => { await db.end(); process.exit(0); });
  setTimeout(() => process.exit(1), 10000).unref();
});
