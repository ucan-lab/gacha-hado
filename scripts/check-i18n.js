// paraglide-js compile は翻訳漏れを警告するだけで終了コードを 0 のままにするため、
// キーとプレースホルダの不一致は CI で落ちない。ここで落とす。
import { readFileSync } from 'node:fs';

const { baseLocale, locales } = JSON.parse(readFileSync('project.inlang/settings.json', 'utf8'));

const load = (locale) => {
  const messages = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8'));
  delete messages.$schema;
  return messages;
};

const placeholders = (pattern) => [...pattern.matchAll(/\{[^}]+\}/g)].map((m) => m[0]).sort();

const base = load(baseLocale);
const errors = [];

for (const locale of locales.filter((l) => l !== baseLocale)) {
  const target = load(locale);

  for (const key of Object.keys(base)) {
    if (!(key in target)) errors.push(`${locale}.json: キーが無い: ${key}`);
  }
  for (const key of Object.keys(target)) {
    if (!(key in base)) errors.push(`${locale}.json: ${baseLocale}.json に無いキー: ${key}`);
  }
  for (const [key, pattern] of Object.entries(target)) {
    if (!(key in base)) continue;
    const expected = placeholders(base[key]).join(' ');
    const actual = placeholders(pattern).join(' ');
    if (expected !== actual) {
      errors.push(`${locale}.json: ${key} のプレースホルダ不一致: [${expected}] → [${actual}]`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  console.error(
    `\n${errors.length} 件の i18n 不整合。messages/{${locales.join(',')}}.json を揃えてください。`
  );
  process.exit(1);
}
