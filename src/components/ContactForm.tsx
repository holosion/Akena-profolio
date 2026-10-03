import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [failed, setFailed] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true); setNotice(''); setFailed(false);
    try {
      const response = await fetch('/api/contacts', { method: 'POST', signal: AbortSignal.timeout(15000), headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to send your message.');
      form.reset(); setNotice('Thanks! Your message has been received.');
    } catch (error) {
      setFailed(true); setNotice(error instanceof Error ? error.message : 'Unable to send your message. Please try again.');
    } finally { setBusy(false); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-fields">
      <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label>Subject<input name="subject" required maxLength={150} /></label>
    <label>Message<textarea name="message" required maxLength={5000} rows={5} /></label>
    <label className="contact-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <p className="contact-privacy">Your details will be saved so I can respond to your enquiry.</p>
    <button className="primary-button" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
    <p role={failed ? 'alert' : 'status'} aria-live="polite">{notice}</p>
  </form>;
}
