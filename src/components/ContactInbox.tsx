import { useState } from 'react';
import { apiUrl } from '../config/api';
type Contact = { id: string; name: string; email: string; subject: string; message: string; status: string; created_at: string };
export default function ContactInbox() {
  const [token, setToken] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function request(url: string, options: RequestInit = {}) {
    const res = await fetch(apiUrl(url), { ...options, signal: AbortSignal.timeout(30000), headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed.');
    return data;
  }
  async function load(nextPage: number) {
    setBusy(true); setError('');
    try { const data = await request(`/api/admin/contacts?page=${nextPage}`); setContacts(data.contacts); setPage(nextPage); setLoaded(true); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to load contacts.'); }
    finally { setBusy(false); }
  }
  async function update(id: string, status: string) {
    setBusy(true); setError('');
    try { const data = await request(`/api/admin/contacts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }); setContacts(items => items.map(item => item.id === id ? data.contact : item)); }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to update contact.'); }
    finally { setBusy(false); }
  }
  return <main className="inbox section"><a href="/">Back to portfolio</a><h1>Contact inbox</h1>
    <form className="contact-form" onSubmit={event => { event.preventDefault(); void load(1); }}>
      <label>Admin access token<input type="password" value={token} required autoComplete="off" onChange={event => { setToken(event.target.value); setLoaded(false); setContacts([]); }} /></label>
      <button className="primary-button" disabled={busy}>{busy ? 'Loading...' : 'Open / refresh inbox'}</button>
    </form>
    <p role="alert">{error}</p>
    {loaded && <><button onClick={() => { setToken(''); setContacts([]); setLoaded(false); }}>Lock inbox</button><p>Page {page} / {contacts.length} messages</p></>}
    {contacts.map(contact => <article className="inbox-card" key={contact.id}>
      <h2>{contact.subject}</h2><p>{contact.name} / <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      <time dateTime={contact.created_at}>{new Date(contact.created_at).toLocaleString()}</time>
      <p className="inbox-message">{contact.message}</p>
      <label>Status <select aria-label="Contact status" disabled={busy} value={contact.status} onChange={event => void update(contact.id, event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="archived">Archived</option></select></label>
    </article>)}
    {loaded && <div className="inbox-pages"><button disabled={busy || page === 1} onClick={() => void load(page - 1)}>Previous</button><button disabled={busy || contacts.length < 50} onClick={() => void load(page + 1)}>Next</button></div>}
  </main>;
}
