// Public backend origin only. Database credentials and admin tokens stay on Render.
const base = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
export const apiUrl = (path: string) => `${base}${path}`;
