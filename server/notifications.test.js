import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createContactNotifier } from './notifications.js';

const contact = { id: 'contact-123', name: 'Visitor', email: 'visitor@example.com', subject: 'Work together\r\nHello', message: '<script>plain text</script>' };
test('notification has fixed recipient, safe subject, reply address, and full plain-text message', async () => {
  const notify = createContactNotifier({ apiKey: 'test-key', to: 'owner@example.com', inboxUrl: 'https://portfolio.example/admin', fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, ['owner@example.com']);
    assert.equal(payload.reply_to, contact.email);
    assert.ok(!/[\r\n]/.test(payload.subject));
    assert.ok(payload.text.includes(contact.message));
    assert.ok(payload.text.includes('https://portfolio.example/admin'));
    assert.equal(payload.html, undefined);
    assert.equal(options.headers['Idempotency-Key'], 'contact-contact-123');
    return { ok: true };
  } });
  await notify(contact);
});
test('temporary errors retry with the same idempotency key; permanent errors stop', async () => {
  let calls = 0;
  const notify = createContactNotifier({ apiKey: 'key', to: 'owner@example.com', wait: async () => {}, fetchImpl: async () => ({ ok: ++calls === 3, status: 503 }) });
  await notify(contact);
  assert.equal(calls, 3);
  calls = 0;
  const denied = createContactNotifier({ apiKey: 'key', to: 'owner@example.com', wait: async () => {}, fetchImpl: async () => { calls++; return { ok: false, status: 403 }; } });
  await assert.rejects(denied(contact), { code: 'EMAIL_HTTP_403' });
  assert.equal(calls, 1);
});
