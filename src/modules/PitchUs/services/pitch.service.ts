import { apiFetch } from '@shared/api/client';

export interface Credentials {
  ref: string;
  login: string;
  /** Only in demo mode. With ucode the login is created and emailed by the platform. */
  password?: string;
}

/** One deck per startup: an email that already has an application cannot apply again. */
export async function emailTaken(email: string): Promise<boolean> {
  const { exists } = await apiFetch<{ exists: boolean }>(
    `/api/applications/exists?email=${encodeURIComponent(email.trim().toLowerCase())}`,
  );
  return exists;
}

/** Sends the application with the pitch deck to /api/applications. */
export const submitApplication = (form: FormData) =>
  apiFetch<Credentials>('/api/applications', { method: 'POST', body: form });
