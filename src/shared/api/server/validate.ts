import { badRequest } from './errors';

type Source = FormData | Record<string, unknown>;
const read = (src: Source, key: string) => (src instanceof FormData ? src.get(key) : src[key]);

interface Rule {
  required?: boolean;
  max?: number;
  email?: boolean;
  /** Allowed values. */
  oneOf?: readonly string[];
  number?: boolean;
  url?: boolean;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reads and checks text fields. Unknown fields are dropped, values are trimmed.
 * Throws 400 with a message per field when something is wrong.
 */
export function pickFields<K extends string>(src: Source, rules: Record<K, Rule>): Record<K, string> {
  const out = {} as Record<K, string>;
  const fields: Record<string, string> = {};
  for (const [key, rule] of Object.entries(rules) as [K, Rule][]) {
    const raw = read(src, key);
    const value = typeof raw === 'string' ? raw.trim() : typeof raw === 'number' ? String(raw) : '';
    if (!value) {
      if (rule.required) fields[key] = 'required';
      out[key] = '';
      continue;
    }
    if (value.length > (rule.max ?? 500)) fields[key] = 'too_long';
    else if (rule.email && !EMAIL.test(value)) fields[key] = 'invalid_email';
    else if (rule.oneOf && !rule.oneOf.includes(value)) fields[key] = 'invalid_value';
    else if (rule.number && !(Number(value) >= 0)) fields[key] = 'invalid_number';
    else if (rule.url && !/^(https?:\/\/)?[^\s.]+\.[^\s]+$/i.test(value)) fields[key] = 'invalid_url';
    out[key] = value;
  }
  if (Object.keys(fields).length) throw badRequest('Some fields are missing or invalid', fields);
  return out;
}
