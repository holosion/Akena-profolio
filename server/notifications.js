import { setTimeout as delay } from 'node:timers/promises';

export function createContactNotifier({ apiKey, to, from = 'AKENA Portfolio <onboarding@resend.dev>', inboxUrl, fetchImpl = fetch, wait = delay }) {
  if (!apiKey) return undefined;
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('NOTIFICATION_EMAIL must be a valid email address.');
  return async function notifyContact(contact) {
    const body = JSON.stringify({
      from,
      to: [to],
      reply_to: contact.email,
      subject: `New portfolio message: ${contact.subject.replace(/[\r\n]/g, ' ')}`,
      text: [
        'You received a new message through your portfolio.',
        '', `Name: ${contact.name}`, `Email: ${contact.email}`, `Subject: ${contact.subject}`,
        '', contact.message, '', ...(inboxUrl ? [`View your inbox: ${inboxUrl}`, ''] : []),
        `Contact reference: ${contact.id}`,
      ].join('\n'),
    });
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetchImpl('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${contact.id}` },
          body,
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) return;
        const error = new Error('Email provider rejected notification.');
        error.code = `EMAIL_HTTP_${response.status}`;
        if (response.status !== 429 && response.status < 500) throw Object.assign(error, { permanent: true });
        throw error;
      } catch (error) {
        if (error.permanent || attempt === 2) throw error;
        await wait(500 * (attempt + 1));
      }
    }
  };
}
