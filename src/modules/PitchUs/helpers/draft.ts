import { DRAFT_KEY } from '../constants';

export type Draft = Record<string, string>;

/** The unfinished application is kept in this browser so a closed pop-up loses nothing. */
export function readDraft(): Draft {
  try {
    return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') as Draft;
  } catch {
    return {};
  }
}

export function saveDraft(form: HTMLFormElement) {
  const data: Draft = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === 'string' && k !== 'consent') data[k] = v;
  });
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable */
  }
}
