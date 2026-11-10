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
// サービスページへのリンクの文字（例：「愛知・東海の情シス代行のページ」）は、依頼の検索をサービスページへ送るためのものなので数えない
const serviceLink = /<a[^>]*href="\/(josys|data-consulting|gen-ai|web-production)"[^>]*>[\s\S]*?<\/a>/g;
const regions = body.replace(serviceLink, '').match(/愛知|東海|一宮|名古屋/g) ?? [];

const checks = [
  ['title', /<title[^>]*>[^<]+<\/title>/.test(html)],
  ['description', /<meta[^>]*name="description" content="[^"]{60,}"/.test(html)],
  ['canonical', html.includes(`https://www.arcle.net/articles/${slug}"`)],
  ['h1が1つ', (body.match(/<h1[\s>]/g) ?? []).length === 1],
  ['本文4,000字以上', text.length >= 4000],
  ['本文に地域名なし', regions.length === 0],
  ['titleに地域名なし', !/愛知|東海|一宮|名古屋|岐阜|三重/.test(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '')],
  ['結論がある', article.includes('aria-label="この記事の結論"')],
  // 出典は 2026-11-10 からのルール。それより前の記事は、出典の記録が残っていないものがあるので問わない
  ['出典がある', article.includes('id="sources"') || (html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/)?.[1] ?? '9999') < '2026-11-10'],
  ['目次がある', /<nav aria-label="目次"/.test(article) && article.includes('href="#sec-1"') && article.includes('id="sec-1"')],
  ['sitemapに登録', readFileSync('public/sitemap.xml', 'utf8').includes(`/articles/${slug}<`)]
];

for (const [name, ok] of checks) console.log(`${ok ? 'OK ' : 'NG '} ${name}`);
console.log(`本文 ${text.length}字`);
if (checks.some(([, ok]) => !ok)) process.exit(1);
