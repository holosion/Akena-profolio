import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import request from 'supertest';
import { newDb } from 'pg-mem';
import { createApp } from './app.js';

const token = 'test-token-with-at-least-32-characters';
async function setup() {
  const memory = newDb();
  memory.public.none(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'));
  const { Pool } = memory.adapters.createPg();
  const db = new Pool();
  return { db, app: createApp({ db, adminToken: token, publicOrigin: 'https://portfolio.example' }) };
}
test('contact submission persists and can be tracked only by an authenticated admin', async () => {
  const { app, db } = await setup();
  const message = { name: ' Jonathan ', email: 'PERSON@example.com', subject: 'Project enquiry', message: "Let's build something. <script>alert(1)</script>" };
  await request(app).post('/api/contacts').send(message).expect(201);
  await request(app).get('/api/admin/contacts').expect(401);
  await request(app).get('/api/admin/contacts').set('Authorization', 'Bearer wrong').expect(401);
  const inbox = await request(app).get('/api/admin/contacts').set('Authorization', `Bearer ${token}`).expect(200);
  assert.equal(inbox.body.contacts.length, 1);
  const contact = inbox.body.contacts[0];
  assert.equal(contact.name, 'Jonathan'); assert.equal(contact.email, 'person@example.com'); assert.equal(contact.message, message.message);
  await request(app).patch(`/api/admin/contacts/${contact.id}`).set('Authorization', `Bearer ${token}`).send({ status: 'contacted' }).expect(200);
  assert.equal((await db.query('SELECT status FROM contacts')).rows[0].status, 'contacted');
  await request(app).patch(`/api/admin/contacts/${contact.id}`).set('Authorization', `Bearer ${token}`).send({ status: 'invalid' }).expect(400);
  await request(app).get('/api/admin/contacts?page=2').set('Authorization', `Bearer ${token}`).expect(200).expect(res => assert.equal(res.body.contacts.length, 0));
});
test('invalid, cross-origin and honeypot submissions do not reach the database', async () => {
  const { app, db } = await setup();
  const valid = { name: 'Visitor', email: 'visitor@example.com', subject: 'Hello', message: 'Hello there' };
  await request(app).post('/api/contacts').send({ ...valid, email: 'invalid' }).expect(400);
  await request(app).post('/api/contacts').send({ ...valid, message: 'x'.repeat(5001) }).expect(400);
  await request(app).post('/api/contacts').set('Origin', 'https://other.example').send(valid).expect(403);
  await request(app).post('/api/contacts').send({ ...valid, website: 'spam.example' }).expect(201);
  assert.equal((await db.query('SELECT * FROM contacts')).rows.length, 0);
});
test('rate limiting and safe errors', async () => {
  const { app } = await setup();
  for (let i = 0; i < 5; i++) await request(app).post('/api/contacts').send({}).expect(400);
  await request(app).post('/api/contacts').send({}).expect(429);
  const failing = createApp({ db: { query: async () => { throw new Error('secret credentials'); } }, adminToken: token });
  const response = await request(failing).get('/api/health').expect(500);
  assert.ok(!JSON.stringify(response.body).includes('secret'));
  await request(app).get('/api/missing').expect(404);
});

test('cross-origin frontend can preflight and access the protected inbox', async () => {
  const { app } = await setup();
  await request(app).options('/api/admin/contacts').set('Origin', 'https://portfolio.example').set('Access-Control-Request-Method', 'PATCH').set('Access-Control-Request-Headers', 'authorization,content-type').expect(204).expect('Access-Control-Allow-Origin', 'https://portfolio.example').expect('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  await request(app).get('/api/admin/contacts').set('Origin', 'https://portfolio.example').set('Authorization', `Bearer ${token}`).expect(200).expect('Access-Control-Allow-Origin', 'https://portfolio.example');
  await request(app).options('/api/contacts').set('Origin', 'https://untrusted.vercel.app').expect(403);
  await request(app).get('/api/admin/contacts').set('Origin', 'https://untrusted.vercel.app').set('Authorization', `Bearer ${token}`).expect(403);
});
