import { test, expect } from '@playwright/test';

test('contact form sends details and shows success only after the API accepts them', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/contacts', async route => {
    expect(route.request().postDataJSON()).toMatchObject({ name: 'Test Visitor', email: 'visitor@example.com', subject: 'Collaboration', message: 'Can we work together?' });
    await route.fulfill({ status: 201, json: { success: true } });
  });
  await page.goto('/');
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject', { exact: true }).fill('Collaboration');
  await page.getByLabel('Message', { exact: true }).fill('Can we work together?');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toHaveText('Thanks! Your message has been received.');
  await expect(page.getByLabel('Your name')).toHaveValue('');
});
test('failed submission preserves the message for retry', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/api/contacts', route => route.fulfill({ status: 500, json: { error: 'Please try again later.' } }));
  await page.goto('/');
  await page.getByLabel('Your name').fill('Test Visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject', { exact: true }).fill('Hello');
  await page.getByLabel('Message', { exact: true }).fill('Keep this message');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('alert')).toHaveText('Please try again later.');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Keep this message');
});
test('inbox renders messages as text and updates contact status', async ({ page }) => {
  const contact = { id: '00000000-0000-4000-8000-000000000001', name: 'Visitor', email: 'visitor@example.com', subject: 'Hello', message: '<script>alert(1)</script>', status: 'new', created_at: '2026-10-03T10:00:00Z' };
  await page.route('**/api/admin/contacts**', async route => {
    expect(route.request().headers().authorization).toBe('Bearer test-admin-token');
    if (route.request().method() === 'PATCH') await route.fulfill({ json: { contact: { ...contact, status: 'contacted' } } });
    else await route.fulfill({ json: { contacts: [contact], page: 1 } });
  });
  await page.goto('/admin');
  await page.getByLabel('Admin access token').fill('test-admin-token');
  await page.getByRole('button', { name: 'Open / refresh inbox' }).click();
  await expect(page.getByText(contact.message, { exact: true })).toBeVisible();
  await page.getByLabel('Contact status', { exact: true }).selectOption('contacted');
  await expect(page.getByLabel('Contact status', { exact: true })).toHaveValue('contacted');
  await page.getByRole('button', { name: 'Lock inbox' }).click();
  await expect(page.getByText(contact.message, { exact: true })).toHaveCount(0);
});
