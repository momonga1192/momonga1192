// お役立ち記事のビルド結果を確認する（npm run build のあとに実行）
// 使い方: node scripts/check-article.mjs <slug>
import { readFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug) {
  console.error('使い方: node scripts/check-article.mjs <slug>');
  process.exit(1);
}

const html = readFileSync(`dist/articles/${slug}.html`, 'utf8');
const body = html.split('<body')[1].replace(/<script[\s\S]*?<\/script>/g, '');
const article = body.split('<article')[1]?.split('</article>')[0] ?? '';
const text = article.replace(/<[^>]+>/g, '');
const regions = body.match(/愛知|東海|一宮|名古屋/g) ?? [];

const checks = [
  ['title', /<title[^>]*>[^<]+<\/title>/.test(html)],
  ['description', /<meta[^>]*name="description" content="[^"]{60,}"/.test(html)],
  ['canonical', html.includes(`https://www.arcle.net/articles/${slug}"`)],
  ['h1が1つ', (body.match(/<h1[\s>]/g) ?? []).length === 1],
  ['本文4,000字以上', text.length >= 4000],
  ['本文に地域名なし', regions.length === 0],
  ['sitemapに登録', readFileSync('public/sitemap.xml', 'utf8').includes(`/articles/${slug}<`)]
];

for (const [name, ok] of checks) console.log(`${ok ? 'OK ' : 'NG '} ${name}`);
console.log(`本文 ${text.length}字`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
