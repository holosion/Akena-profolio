import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { createHash, timingSafeEqual, randomUUID } from 'node:crypto';
import path from 'node:path';

export function createApp({ db, adminToken, publicOrigin, trustProxy = false, staticDir }) {
  if (!adminToken || adminToken.length < 32) throw new Error('ADMIN_TOKEN must contain at least 32 characters.');
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', trustProxy);
  app.use(helmet({ contentSecurityPolicy: { directives: { 'img-src': ["'self'", 'data:', 'blob:'], 'worker-src': ["'self'", 'blob:'] } } }));
  app.use(express.json({ limit: '16kb' }));
  app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
  const limit = (max) => rateLimit({ windowMs: 15 * 60 * 1000, limit: max, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many requests. Please try again later.' } });
  const expected = createHash('sha256').update(adminToken).digest();
  function authenticate(req, res, next) {
    const token = req.get('authorization')?.replace(/^Bearer /, '') || '';
    const actual = createHash('sha256').update(token).digest();
    if (!timingSafeEqual(expected, actual)) return res.status(401).json({ error: 'Invalid access token.' });
    next();
  }
  app.get('/api/health', async (_req, res) => {
    await db.query('SELECT 1');
    res.json({ status: 'ok' });
  });
  app.post('/api/contacts', limit(5), async (req, res) => {
    if (publicOrigin && req.get('origin') && req.get('origin') !== publicOrigin) return res.status(403).json({ error: 'Origin not allowed.' });
    const body = req.body;
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Please provide your contact details.' });
    if (typeof body.website === 'string' && body.website) return res.status(201).json({ success: true });
    const fields = {};
    for (const [key, max] of [['name', 100], ['email', 254], ['subject', 150], ['message', 5000]]) {
      if (typeof body[key] !== 'string' || !body[key].trim() || body[key].trim().length > max) return res.status(400).json({ error: `Please enter a valid ${key} (maximum ${max} characters).` });
      fields[key] = body[key].trim();
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
    await db.query('INSERT INTO contacts (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5)', [randomUUID(), fields.name, fields.email.toLowerCase(), fields.subject, fields.message]);
    res.status(201).json({ success: true });
  });
  app.use('/api/admin', limit(60), authenticate);
  app.get('/api/admin/contacts', async (req, res) => {
    const page = Math.max(1, Math.min(100000, Number.parseInt(req.query.page, 10) || 1));
    const result = await db.query('SELECT * FROM contacts ORDER BY created_at DESC, id DESC LIMIT 50 OFFSET $1', [(page - 1) * 50]);
    res.json({ contacts: result.rows, page });
  });
  app.patch('/api/admin/contacts/:id', async (req, res) => {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(req.params.id) || !['new', 'contacted', 'archived'].includes(req.body?.status)) return res.status(400).json({ error: 'Invalid contact or status.' });
    const result = await db.query('UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *', [req.body.status, req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Contact not found.' });
    res.json({ contact: result.rows[0] });
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Endpoint not found.' }));
  if (staticDir) {
    app.use(express.static(staticDir));
    app.get('/{*path}', (_req, res) => res.sendFile(path.join(staticDir, 'index.html')));
  }
  app.use((err, _req, res, _next) => {
    const status = err.status === 400 || err.status === 413 ? err.status : 500;
    if (status === 500) console.error('API request failed:', err.code || err.name);
    res.status(status).json({ error: status === 500 ? 'Unable to process your request. Please try again later.' : 'Invalid request body.' });
  });
  return app;
}
