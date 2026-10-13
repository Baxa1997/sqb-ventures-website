import type { TFunction } from '@shared/i18n';

const EMAIL = /^\S+@\S+\.\S+$/;
export const isEmail = (v: string) => EMAIL.test(v);

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Checks the required fields inside `scope`, top to bottom.
 * Marks each field's wrapper with .err and a message, and focuses the first bad one.
 */
export function validate(scope: HTMLElement, t: TFunction): boolean {
  let first: HTMLElement | null = null;
  scope.querySelectorAll<Field>('[required]').forEach((f) => {
    const badMail = f.type === 'email' && !!f.value && !isEmail(f.value);
    const bad =
      f instanceof HTMLInputElement && f.type === 'checkbox' ? !f.checked : !f.value.trim() || badMail;
    const box = f.closest<HTMLElement>('label, .field');
    if (box) {
      box.classList.toggle('err', bad);
      box.dataset.err = t(badMail ? 'Enter a valid email address' : 'This field is required');
    }
    // a styled select hides its native element: focus the visible button instead
    if (bad && !first) first = box?.querySelector<HTMLElement>('.select-btn') ?? f;
  });
  (first as HTMLElement | null)?.focus();
  return !first;
}

/** Removes a field's error as soon as the visitor changes it. Use as the form's onInput/onChange. */
export function clearError(e: { target: EventTarget }) {
  if (e.target instanceof Element) e.target.closest('.err')?.classList.remove('err');
}
