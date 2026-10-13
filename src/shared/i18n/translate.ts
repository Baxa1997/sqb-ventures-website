import type { Locale } from './config';

/**
 * English text is the key. Each entry holds [Russian, Uzbek].
 * A text with no entry stays in English.
 */
export type Dict = Record<string, readonly [ru: string, uz: string]>;
export type Vars = Record<string, string | number>;
export type TFunction = (text: string, vars?: Vars) => string;

const IX = { ru: 0, uz: 1 } as const;

export function createT(locale: Locale, ...dicts: Dict[]): TFunction {
  const merged: Dict = Object.assign({}, ...dicts);
  return (text, vars) => {
    const entry = locale === 'en' ? undefined : merged[text];
    let out = (entry && locale !== 'en' && entry[IX[locale]]) || text;
    if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
    return out;
  };
}

/** Localized field of a { en, ru, uz } record, falling back to English. */
export function pick<T extends Record<string, string | undefined>>(
  value: Partial<Record<Locale, T>>,
  field: keyof T,
  locale: Locale,
): string {
  return value[locale]?.[field] || value.en?.[field] || '';
}
