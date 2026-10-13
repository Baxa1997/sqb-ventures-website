import type { TFunction } from '@shared/i18n';

const EMAIL = /^\S+@\S+\.\S+$/;
export const isEmail = (v: string) => EMAIL.test(v);

/**
 * Checks the required fields inside `scope` (all of the form by default).
 * Marks each field's label with .err and a message, focuses the first bad one.
 */
export function validate(scope: HTMLElement, t: TFunction): boolean {
  let ok = true;
  scope
    .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[required]')
    .forEach((f) => {
      const badMail = f.type === 'email' && !!f.value && !isEmail(f.value);
      const bad =
        f instanceof HTMLInputElement && f.type === 'checkbox' ? !f.checked : !f.value.trim() || badMail;
      const label = f.closest('label');
      if (label) {
        label.classList.toggle('err', bad);
        label.dataset.err = t(badMail ? 'Enter a valid email address' : 'This field is required');
      }
      if (bad && ok) f.focus();
      if (bad) ok = false;
    });
  return ok;
}
