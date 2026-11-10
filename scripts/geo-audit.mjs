#!/usr/bin/env node
// 公開中のサイトを1ページずつ見て、AIの答えに引用されやすい形になっているかを100点満点で採点する（じんらいの「GEOサイト診断」のまね）。
// サイトマップのURLを本番から取り、ページの種類ごとに当てはまる項目だけで点を出す。
// 結果は ~/.local/state/arcle-report/geo-audit.json（ダッシュボードの scripts/dashboard-data.mjs が読む）。
// 使い方: node scripts/geo-audit.mjs [--site https://www.arcle.net]
import { mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

const arg = (name, fallback) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : fallback; };
const SITE = arg('--site', 'https://www.arcle.net');
const OUT = join(homedir(), '.local', 'state', 'arcle-report', 'geo-audit.json');
// AIの検索・学習用のボット。robots.txt で止めていないかを見る
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Bingbot'];

const get = async (path) => {
  const r = await fetch(SITE + path, { headers: { 'user-agent': 'arcle-geo-audit' } });
  return { status: r.status, text: r.status === 200 ? await r.text() : '' };
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');

// robots.txt の User-agent ごとの Disallow を読み、ボットがトップを読めるかを返す
function robotsAllows(robots, bot) {
  const groups = [];
  let cur = null;
  for (const raw of robots.split('\n')) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^(user-agent|allow|disallow)\s*:\s*(.*)$/i);
    if (!m) continue;
    const [, key, value] = m;
    if (/user-agent/i.test(key)) {
      if (!cur || cur.rules.length) groups.push((cur = { agents: [], rules: [] }));
      cur.agents.push(value.toLowerCase());
    } else if (cur) cur.rules.push({ allow: /allow/i.test(key) && !/dis/i.test(key), path: value });
  }
  const mine = groups.find((g) => g.agents.includes(bot.toLowerCase())) || groups.find((g) => g.agents.includes('*'));
  if (!mine) return true;
  const hit = mine.rules.filter((r) => r.path && '/'.startsWith(r.path)).sort((a, b) => b.path.length - a.path.length)[0];
  return !hit || hit.allow;
}

const typeOf = (p) =>
  p === '/' ? 'top'
    : p.startsWith('/articles/') ? 'article'
      : p.startsWith('/works/') ? 'work'
        : ['/josys', '/data-consulting', '/gen-ai', '/web-production'].includes(p) ? 'service'
          : 'other';

// 項目：label・点の重み・当てはまるページの種類・判定
const CHECKS = [
  { label: 'タイトル（10〜45字）', w: 8, types: 'all', test: (x) => x.title.length >= 10 && x.title.length <= 45 },
  { label: '説明文（50〜160字）', w: 6, types: 'all', test: (x) => x.description.length >= 50 && x.description.length <= 160 },
  { label: '見出しh1が1つ', w: 6, types: 'all', test: (x) => x.h1 === 1 },
  { label: '構造化データ', w: 10, types: 'all', test: (x) => x.ld.length > 0 },
  { label: '画像のalt', w: 4, types: 'all', test: (x) => x.imgNoAlt === 0 },
  { label: '次の行動（相談・診断への導線）', w: 6, types: ['top', 'service', 'work', 'article'], test: (x) => x.cta },
  { label: 'よくある質問（FAQPage）', w: 10, types: ['service', 'article'], test: (x) => x.ldTypes.has('FAQPage') },
  { label: '結論を先に（この記事の結論）', w: 12, types: ['article'], test: (x) => x.summary },
  { label: '目次', w: 4, types: ['article'], test: (x) => x.toc },
  { label: '出典（確かめた公式ページ）', w: 8, types: ['article'], test: (x) => x.sources },
  { label: '更新日・著者', w: 6, types: ['article'], test: (x) => !!x.dateModified && x.hasAuthor },
  { label: '具体的な数字（10個以上）', w: 8, types: ['service', 'work', 'article'], test: (x) => x.numbers >= 10 },
  { label: '一文が短い（平均60字以内）', w: 8, types: ['top', 'service', 'work', 'article'], test: (x) => x.avgSentence > 0 && x.avgSentence <= 60 },
  { label: '現場の実例（Arcleの現場では）', w: 4, types: ['article'], test: (x) => x.fieldNote }
];

function inspect(html) {
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '').replace(/\s*[|-]\s*(支援事例\s*-\s*)?Arcle$/, '');
  const description = decode(html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1] ?? '');
  const ld = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const ldText = JSON.stringify(ld);
  const ldTypes = new Set([...ldText.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]));
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/)?.[1] ?? html;
  const text = decode(main.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, '\n')).replace(/[ \t]+/g, ' ');
  // 文：句点で終わるまとまり。見出しやボタンのような短い断片は数えない
  const sentences = text.split(/\n+/).flatMap((l) => l.split(/(?<=[。！？])/)).map((s) => s.trim()).filter((s) => /[。！？]$/.test(s) && s.length >= 8);
  const article = ld.flat().find((d) => d['@type'] === 'Article') || ld.flatMap((d) => d['@graph'] || []).find((d) => d['@type'] === 'Article');
  return {
    title, description, ld, ldTypes,
    h1: (main.match(/<h1[\s>]/g) || []).length,
    imgNoAlt: [...html.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt=/.test(m[0])).length,
    cta: /href="\/(contact|it-check)(["?#/])/.test(main),
    summary: /aria-label="この記事の結論"/.test(html),
    toc: /aria-label="目次"/.test(html),
    sources: /id="sources"/.test(html),
    fieldNote: /Arcleの現場では/.test(text),
    datePublished: article?.datePublished || null,
    dateModified: article?.dateModified || null,
    hasAuthor: !!article?.author,
    numbers: (text.match(/\d[\d,.]*/g) || []).length,
    avgSentence: sentences.length ? Math.round(sentences.reduce((a, s) => a + s.length, 0) / sentences.length) : 0,
    longSentences: sentences.filter((s) => s.length > 100).length
  };
}

const [robots, llms, sitemap] = await Promise.all([get('/robots.txt'), get('/llms.txt'), get('/sitemap.xml')]);
const blockedBots = AI_BOTS.filter((b) => !robotsAllows(robots.text, b));
const site = [
  { label: 'robots.txtでAIのボットを止めていない', ok: robots.status === 200 && !blockedBots.length, note: blockedBots.length ? `止めている: ${blockedBots.join(', ')}` : '' },
  { label: 'llms.txtがある', ok: llms.status === 200 && llms.text.length > 200 },
  { label: 'サイトマップがある', ok: sitemap.status === 200 }
];

const paths = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const pages = [];
for (const path of paths) {
  const { status, text } = await get(path);
  const type = typeOf(path);
  if (status !== 200) { pages.push({ path, type, status, score: 0, fails: [`開けない（${status}）`] }); continue; }
  const x = inspect(text);
  const applicable = CHECKS.filter((c) => c.types === 'all' || c.types.includes(type));
  const fails = applicable.filter((c) => !c.test(x));
  const total = applicable.reduce((a, c) => a + c.w, 0);
  const score = Math.round((100 * (total - fails.reduce((a, c) => a + c.w, 0))) / total);
  pages.push({
    path, type, status, title: x.title, score, fails: fails.map((c) => c.label),
    datePublished: x.datePublished, dateModified: x.dateModified,
    avgSentence: x.avgSentence, longSentences: x.longSentences, numbers: x.numbers
  });
}

const average = Math.round(pages.reduce((a, p) => a + p.score, 0) / (pages.length || 1));
const failCount = {};
for (const p of pages) for (const f of p.fails) failCount[f] = (failCount[f] || 0) + 1;
const result = {
  date: new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10),
  site, average, pages,
  commonFails: Object.entries(failCount).sort((a, b) => b[1] - a[1]).map(([label, count]) => ({ label, count }))
};
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(result, null, 1));
console.log(`${pages.length}ページ 平均${average}点 → ${OUT}`);
for (const c of result.commonFails) console.log(`  ${c.label}: ${c.count}ページ`);
