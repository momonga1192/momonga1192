// AI向けの案内 llms.txt を作る（npm run build の最後に実行）。
// 事業者・サービス・料金は scripts/llms-head.md に手で書き、支援事例とお役立ち記事は
// プリレンダー済みのHTMLのタイトルと説明から足す（記事が増えても書き直さなくてよい）
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const site = 'https://www.arcle.net';

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const pageInfo = (path) => {
  const html = readFileSync(join(dist, `${path}.html`), 'utf8');
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? path).replace(/\s*\|\s*(支援事例\s*-\s*)?Arcle$/, '');
  const description = decode(html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1] ?? '');
  return { title, description };
};

// 並びはサイトマップの順（新しい記事は末尾に足される）
const paths = [...readFileSync(join(dist, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const list = (prefix) =>
  paths.filter((p) => p.startsWith(prefix)).map((p) => {
    const { title, description } = pageInfo(p);
    return `- [${title}](${site}${p}): ${description}`;
  });

const out = [
  readFileSync(join(root, 'scripts', 'llms-head.md'), 'utf8').trimEnd(),
  '',
  ...list('/works/'),
  '',
  '## お役立ち記事',
  '',
  '代表の栗原勇太が、中小企業のIT・データ・生成AI・ホームページについて書いています。',
  '',
  ...list('/articles/'),
  ''
].join('\n');

writeFileSync(join(dist, 'llms.txt'), out);
console.log(`dist/llms.txt を作りました（${out.length}字）`);
