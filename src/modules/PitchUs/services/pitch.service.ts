import { SITE } from '@shared/config';
import { STARTUPS } from '@shared/data/startups';

export interface Credentials {
  ref: string;
  login: string;
  password: string;
}

/** One deck per startup: an email that already has an application cannot apply again. */
export async function emailTaken(email: string): Promise<boolean> {
  const mail = email.trim().toLowerCase();
  if (!SITE.apiUrl) return STARTUPS.some((s) => s.memberEmails.includes(mail));
  const res = await fetch(`${SITE.apiUrl}/applications/exists?email=${encodeURIComponent(mail)}`);
  return res.ok && ((await res.json()) as { exists: boolean }).exists;
}

/**
 * Submits the application with the pitch deck and returns the Founder Account login.
 * Without NEXT_PUBLIC_API_URL it runs in demo mode and makes the credentials up locally.
 */
export async function submitApplication(form: FormData): Promise<Credentials> {
  const login = String(form.get('email')).trim().toLowerCase();
  if (!SITE.apiUrl) {
    await new Promise((r) => setTimeout(r, 400));
    const n = String(STARTUPS.length + 1 + Math.floor(Math.random() * 90)).padStart(4, '0');
    return {
      ref: `SQBV-${new Date().getFullYear()}-${n}`,
      login,
      password: Math.random().toString(36).slice(2, 10),
    };
  }
  const res = await fetch(`${SITE.apiUrl}/applications`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Application failed: ${res.status}`);
  return (await res.json()) as Credentials;
}
