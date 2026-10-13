/**
 * Lists texts passed to t('…') that have no Russian/Uzbek entry in the dictionaries
 * that file actually loads (src/shared/locales/* and src/modules/<Module>/locales).
 * Texts kept in constants are checked against the dictionaries of their module.
 * Run: yarn check:locales
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src');
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f.name)) files.push(p);
  }
})(SRC);

const read = (f) => fs.readFileSync(f, 'utf8');
const unq = (s) => s.replace(/\\(.)/g, '$1');
const dictKeys = (file) =>
  new Set(
    [...read(file).matchAll(/^\s*(?:(['"])((?:\\.|(?!\1).)*)\1|([A-Za-z_$][\w$]*)):\s*\[/gm)].map((m) =>
      unq(m[2] ?? m[3]),
    ),
  );

// dictionary files by import specifier
const resolveDict = (from, spec) => {
  let p = spec.startsWith('@shared/')
    ? path.join(SRC, 'shared', spec.slice(8))
    : spec.startsWith('@modules/')
      ? path.join(SRC, 'modules', spec.slice(9))
      : path.resolve(path.dirname(from), spec);
  for (const c of [`${p}.ts`, path.join(p, 'index.ts')]) if (fs.existsSync(c)) return c;
  return null;
};
const dictsOf = (file) =>
  [...read(file).matchAll(/from '([^']*\/locales[^']*)'/g)]
    .map((m) => resolveDict(file, m[1]))
    .filter(Boolean);
const moduleOf = (file) => (path.relative(SRC, file).match(/^(modules\/[^/]+|shared)/) || [])[1];

// keys a module can reach: every dictionary any of its files loads
const moduleKeys = new Map();
for (const f of files) {
  const mod = moduleOf(f);
  if (!mod || /\/locales\//.test(f)) continue;
  const set = moduleKeys.get(mod) || new Set();
  for (const d of dictsOf(f)) dictKeys(d).forEach((k) => set.add(k));
  moduleKeys.set(mod, set);
}

const KEEP = new Set([
  // brand terms and names that stay in English on every language
  'SQB Ventures',
  'Pitch Us',
  'Content Hub',
  'Beyond Capital — Create Value',
  'Seed & Pre-Series A',
  '$50K – $500K',
  'FinTech & Embedded Finance',
  'B2B SaaS & Vertical AI',
  'Marketplaces & E-commerce',
  'Pre-Series A',
  'Series A',
]);

const missing = [];
for (const f of files) {
  if (/\/locales\//.test(f)) continue;
  const src = read(f);
  const isConst = /\/(constants|config)\//.test(f);
  const texts = [...src.matchAll(/\bt\(\s*(['"])((?:\\.|(?!\1).)*)\1/g)].map((m) => unq(m[2]));
  if (isConst)
    for (const m of src.matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g))
      if (/[A-Z].*\s/.test(m[2])) texts.push(unq(m[2]));
  if (!texts.length) continue;
  const keys = isConst
    ? moduleKeys.get(moduleOf(f)) || new Set()
    : new Set(dictsOf(f).flatMap((d) => [...dictKeys(d)]));
  for (const k of new Set(texts))
    if (!keys.has(k) && !KEEP.has(k)) missing.push(`${path.relative(SRC, f)}: ${k}`);
}
missing.forEach((m) => console.log(m));
console.log(
  missing.length ? `\n${missing.length} text(s) without a translation` : 'All texts have translations.',
);
process.exitCode = missing.length ? 1 : 0;
