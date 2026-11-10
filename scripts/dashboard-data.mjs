#!/usr/bin/env node
// アクセスのダッシュボード（dashboard/index.html）用のデータを作る。GA4とSearch Consoleから取り、
// dashboard/data/data.json に書く（このファイルはgitに入れない）。
// 前提: gcloud auth application-default login 済み（Search Console）、
//       ga4-reader へのトークン作成者権限（GA4。scripts/ga4.sh と同じ仕組み）
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SA = process.env.GA4_SA || 'ga4-reader@arcle-489401.iam.gserviceaccount.com';
const PROPERTY = process.env.GA4_PROPERTY_ID || '514197778';
const QUOTA_PROJECT = process.env.GCP_QUOTA_PROJECT || 'arcle-489401';
const SC_SITE = 'sc-domain:arcle.net';
const GA_START = '2026-10-29'; // GA4にデータが届き始めた日（それより前は「計測なし」）
const CAMPAIGN_START = '2026-11-01';
const RANGES = [7, 28, 90];
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'dashboard', 'data', 'data.json');

const userToken = execFileSync('gcloud', ['auth', 'application-default', 'print-access-token'], { encoding: 'utf8' }).trim();

async function post(url, body, token, extraHeaders = {}) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...extraHeaders },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000)
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`${url}: ${JSON.stringify(d.error || d).slice(0, 300)}`);
  return d;
}

const saToken = (await post(
  `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${SA}:generateAccessToken`,
  { scope: ['https://www.googleapis.com/auth/analytics.readonly'], lifetime: '900s' },
  userToken,
  { 'x-goog-user-project': QUOTA_PROJECT }
)).accessToken;

// 開発サーバー（UM350）から本番へ移った自分のアクセスは除く（11/5より前のデータに残っている）
const excludeSelf = {
  notExpression: { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'PARTIAL_REGEXP', value: 'um350|100\\.75\\.216\\.83|localhost' } } }
};
const eventIs = (name) => ({ filter: { fieldName: 'eventName', stringFilter: { value: name } } });

async function ga({ start, end, dims = [], mets, filter, limit = 50 }) {
  const body = {
    dateRanges: [{ startDate: start, endDate: end }],
    dimensions: dims.map((name) => ({ name })),
    metrics: mets.map((name) => ({ name })),
    dimensionFilter: filter ? { andGroup: { expressions: [excludeSelf, filter] } } : excludeSelf,
    orderBys: [{ metric: { metricName: mets[0] }, desc: true }],
    limit
  };
  const d = await post(`https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY}:runReport`, body, saToken);
  return (d.rows || []).map((r) => ({
    d: (r.dimensionValues || []).map((v) => v.value),
    m: (r.metricValues || []).map((v) => Number(v.value))
  }));
}

async function sc(start, end, dims = [], rowLimit = 25) {
  const d = await post(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SC_SITE)}/searchAnalytics/query`,
    { startDate: start, endDate: end, dimensions: dims, rowLimit },
    userToken,
    { 'x-goog-user-project': QUOTA_PROJECT }
  );
  return (d.rows || []).sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

const jstNow = () => new Date(Date.now() + 9 * 3600e3);
const addDays = (ymd, n) => new Date(Date.parse(ymd + 'T00:00:00Z') + n * 86400e3).toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400e3);
const md = (ymd) => `${Number(ymd.slice(5, 7))}/${Number(ymd.slice(8, 10))}`;
const today = jstNow().toISOString().slice(0, 10);
const gaEnd = addDays(today, -1);

// Search Console は2〜3日遅れて確定するので、データのある最後の日を終わりにする
const scRecent = await sc(addDays(today, -10), today, ['date'], 20);
const scEnd = scRecent.length ? scRecent.map((r) => r.keys[0]).sort().at(-1) : addDays(today, -3);

// 日ごとの数字（GA4は計測開始より前を null にする。Search Console は行がない日を0にする）
const maxN = Math.max(...RANGES);
const gaDailyRows = await ga({ start: addDays(gaEnd, -(2 * maxN - 1)), end: gaEnd, dims: ['date'], mets: ['sessions', 'activeUsers', 'screenPageViews', 'keyEvents'], limit: 500 });
const gaByDate = Object.fromEntries(gaDailyRows.map((r) => [`${r.d[0].slice(0, 4)}-${r.d[0].slice(4, 6)}-${r.d[0].slice(6, 8)}`, r.m]));
const gaDaily = [];
for (let i = 2 * maxN - 1; i >= 0; i--) {
  const date = addDays(gaEnd, -i);
  const m = date < GA_START ? null : (gaByDate[date] || [0, 0, 0, 0]);
  gaDaily.push({ date, sessions: m && m[0], users: m && m[1], pageviews: m && m[2], leads: m && m[3] });
}
const scDailyRows = await sc(addDays(scEnd, -(2 * maxN - 1)), scEnd, ['date'], 500);
const scByDate = Object.fromEntries(scDailyRows.map((r) => [r.keys[0], r]));
const scDaily = [];
for (let i = 2 * maxN - 1; i >= 0; i--) {
  const date = addDays(scEnd, -i);
  const r = scByDate[date];
  scDaily.push({ date, clicks: r ? r.clicks : 0, impressions: r ? r.impressions : 0, position: r ? Math.round(r.position * 10) / 10 : null });
}

const JOSYS = /情シス|ｉｔ|\bit\b|サポート|パソコン|\bpc\b|ネットワーク|一宮|稲沢|尾張|名古屋|岐阜|三重|愛知|東海/i;
const BRAND = /arcle|アークル/i;
// AIの答えから来た訪問の参照元（ChatGPT・Perplexity・Gemini・Copilot・Claude など）
const AI_SOURCES = 'chatgpt|openai|perplexity|gemini|bard|copilot|claude\\.ai|you\\.com|felo\\.ai|genspark|grok|deepseek|phind|meta\\.ai';
const aiFilter = { filter: { fieldName: 'sessionSource', stringFilter: { matchType: 'PARTIAL_REGEXP', value: AI_SOURCES, caseSensitive: false } } };
const EVENTS = ['it_check_banner_click', 'it_check_start', 'it_check_complete', 'generate_lead'];

async function rangeData(n) {
  const start = addDays(gaEnd, -(n - 1));
  const prevStart = addDays(start, -n), prevEnd = addDays(start, -1);
  const scStart = addDays(scEnd, -(n - 1));
  const scPrevStart = addDays(scStart, -n), scPrevEnd = addDays(scStart, -1);
  const totals = (s, e) => ga({ start: s, end: e, mets: ['sessions', 'activeUsers', 'screenPageViews', 'keyEvents'] }).then((r) => r[0]?.m || [0, 0, 0, 0]);
  const aiTotal = (s, e) => ga({ start: s, end: e, mets: ['sessions'], filter: aiFilter }).then((r) => r[0]?.m[0] || 0);
  const [cur, prev, sources, pages, events, leads, scCur, scPrev, queries, prior, scPages, aiCur, aiPrev, aiSources, aiPages] = await Promise.all([
    totals(start, gaEnd),
    totals(prevStart, prevEnd),
    ga({ start, end: gaEnd, dims: ['sessionSourceMedium'], mets: ['sessions', 'engagedSessions'], limit: 10 }),
    ga({ start, end: gaEnd, dims: ['pagePath'], mets: ['screenPageViews', 'activeUsers'], limit: 15 }),
    ga({ start, end: gaEnd, dims: ['eventName'], mets: ['eventCount'], filter: { filter: { fieldName: 'eventName', inListFilter: { values: EVENTS } } } }),
    ga({ start, end: gaEnd, dims: ['customEvent:form', 'customEvent:campaign'], mets: ['eventCount'], filter: eventIs('generate_lead') }).catch(() => []),
    sc(scStart, scEnd),
    sc(scPrevStart, scPrevEnd),
    sc(scStart, scEnd, ['query'], 100),
    sc(addDays(scStart, -28), addDays(scStart, -1), ['query'], 1000),
    sc(scStart, scEnd, ['page'], 15),
    aiTotal(start, gaEnd),
    aiTotal(prevStart, prevEnd),
    ga({ start, end: gaEnd, dims: ['sessionSource'], mets: ['sessions'], filter: aiFilter, limit: 10 }),
    ga({ start, end: gaEnd, dims: ['landingPage'], mets: ['sessions'], filter: aiFilter, limit: 10 })
  ]);
  const known = new Set(prior.map((r) => r.keys[0]));
  const ev = Object.fromEntries(events.map((r) => [r.d[0], r.m[0]]));
  const s0 = scCur[0] || { clicks: 0, impressions: 0, position: null };
  const s1 = scPrev[0] || { clicks: 0, impressions: 0, position: null };
  return {
    days: n,
    ga: { start, end: gaEnd, prevStart, prevEnd, prevMeasured: prevEnd >= GA_START, prevPartial: prevStart < GA_START && prevEnd >= GA_START },
    sc: { start: scStart, end: scEnd, prevStart: scPrevStart, prevEnd: scPrevEnd },
    totals: {
      sessions: [cur[0], prev[0]], users: [cur[1], prev[1]], pageviews: [cur[2], prev[2]], leads: [cur[3], prev[3]],
      clicks: [s0.clicks, s1.clicks], impressions: [s0.impressions, s1.impressions],
      position: [s0.position && Math.round(s0.position * 10) / 10, s1.position && Math.round(s1.position * 10) / 10]
    },
    sources: sources.map((r) => ({ name: r.d[0], sessions: r.m[0], engaged: r.m[1] })),
    pages: pages.map((r) => ({ path: r.d[0], views: r.m[0], users: r.m[1] })),
    funnel: EVENTS.map((name) => ({ name, count: ev[name] || 0 })),
    leads: leads.map((r) => ({ form: r.d[0], campaign: r.d[1], count: r.m[0] })),
    queries: queries.map((r) => ({
      query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: Math.round(r.position * 10) / 10,
      isNew: !known.has(r.keys[0]), isLocal: JOSYS.test(r.keys[0]) && !BRAND.test(r.keys[0]), isBrand: BRAND.test(r.keys[0])
    })),
    ai: {
      sessions: [aiCur, aiPrev],
      sources: aiSources.map((r) => ({ name: r.d[0], sessions: r.m[0] })),
      pages: aiPages.map((r) => ({ path: r.d[0], sessions: r.m[0] }))
    },
    searchPages: scPages.map((r) => ({ url: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: Math.round(r.position * 10) / 10 }))
  };
}

const ranges = {};
for (const n of RANGES) ranges[n] = await rangeData(n);

const [todaySoFar, meishi, meishiLeads] = await Promise.all([
  ga({ start: today, end: today, mets: ['sessions', 'activeUsers'] }).then((r) => r[0]?.m || [0, 0]),
  ga({ start: CAMPAIGN_START, end: today, mets: ['sessions', 'activeUsers'], filter: { filter: { fieldName: 'sessionCampaignName', stringFilter: { value: 'meishi' } } } }).then((r) => r[0]?.m || [0, 0]),
  ga({ start: CAMPAIGN_START, end: today, mets: ['eventCount'], filter: { andGroup: { expressions: [eventIs('generate_lead'), { filter: { fieldName: 'customEvent:campaign', stringFilter: { value: 'meishi' } } }] } } }).then((r) => r[0]?.m[0] || 0).catch(() => 0)
]);

// AIの答えに出たか（scripts/ai-citations.mjs の記録）。最新の回の質問ごとの結果と、回ごとの推移をまとめる
function aiCitations() {
  const file = join(homedir(), '.local', 'state', 'arcle-report', 'ai-citations.jsonl');
  if (!existsSync(file)) return null;
  const rows = readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  if (!rows.length) return null;
  const dates = [...new Set(rows.map((r) => r.date))].sort();
  const last = dates.at(-1);
  const latest = rows.filter((r) => r.date === last);
  const groups = {};
  for (const r of latest) {
    const g = (groups[`${r.engine}|${r.question}`] ||= { engine: r.engine, question: r.question, service: r.service, tries: 0, mentioned: 0, cited: 0, answer: '' });
    g.tries++; g.mentioned += r.mentioned ? 1 : 0; g.cited += r.cited ? 1 : 0;
    if (!g.answer || (r.mentioned && !g.mentionedAnswer)) { g.answer = r.answer.slice(0, 400); g.mentionedAnswer = r.mentioned; }
  }
  const domainCount = {};
  for (const r of latest.filter((x) => x.service !== 'brand')) for (const d of r.domains) domainCount[d] = (domainCount[d] || 0) + 1;
  return {
    last, engines: [...new Set(latest.map((r) => r.engine))],
    results: Object.values(groups).map(({ mentionedAnswer, ...g }) => g),
    domains: Object.entries(domainCount).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([domain, count]) => ({ domain, count })),
    history: dates.map((date) => {
      const rs = rows.filter((r) => r.date === date && r.service !== 'brand');
      return { date, answers: rs.length, mentioned: rs.filter((r) => r.mentioned).length, cited: rs.filter((r) => r.cited).length };
    })
  };
}

// ページの診断（scripts/geo-audit.mjs の結果）と、記事・サービスページの手直しの順番（じんらいの「リライト優先度」のまね）。
// Search Consoleの直近90日のページ別の表示・順位から A〜D に分ける。
// 直してから WAIT_DAYS 日たっていないページは、Googleが読み直すまで数字が変わらないので A・B から外す。
// あわせて、同じ検索語に2つ以上のページが出ているもの（重なり）を拾う
const WAIT_DAYS = 60;
const sitemapFile = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');
const sitemapXml = existsSync(sitemapFile) ? readFileSync(sitemapFile, 'utf8') : '';
const lastmod = Object.fromEntries([...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map((m) => [new URL(m[1]).pathname, m[2]]));
const STATE = join(homedir(), '.local', 'state', 'arcle-report');
const readJson = (name) => { const f = join(STATE, name); return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null; };
const geoAudit = readJson('geo-audit.json');
async function rewritePlan() {
  if (!geoAudit) return null;
  const start = addDays(scEnd, -89);
  const [byPage, byPageQuery] = await Promise.all([sc(start, scEnd, ['page'], 1000), sc(start, scEnd, ['page', 'query'], 5000)]);
  const pathOf = (u) => { try { return new URL(u).pathname.replace(/\.html$/, '').replace(/^\/index$/, '/') || '/'; } catch { return u; } };
  const stats = {};
  for (const r of byPage) {
    const s = (stats[pathOf(r.keys[0])] ||= { impressions: 0, clicks: 0, posSum: 0, queries: {} });
    s.impressions += r.impressions; s.clicks += r.clicks; s.posSum += r.position * r.impressions;
  }
  for (const r of byPageQuery) {
    const s = stats[pathOf(r.keys[0])];
    if (s) s.queries[r.keys[1]] = (s.queries[r.keys[1]] || 0) + r.impressions;
  }
  // 検索語ごとに、出ているページを集める（屋号での検索は複数のページが出て当たり前なので除く）
  const titles = Object.fromEntries(geoAudit.pages.map((p) => [p.path, p.title]));
  const byQuery = {};
  for (const r of byPageQuery) {
    if (BRAND.test(r.keys[1])) continue;
    const path = pathOf(r.keys[0]);
    const q = (byQuery[r.keys[1]] ||= {});
    const e = (q[path] ||= { path, title: titles[path] || null, impressions: 0, clicks: 0, posSum: 0 });
    e.impressions += r.impressions; e.clicks += r.clicks; e.posSum += r.position * r.impressions;
  }
  const overlaps = Object.entries(byQuery).filter(([, pages]) => Object.keys(pages).length >= 2).map(([query, pages]) => {
    const list = Object.values(pages).map(({ posSum, ...e }) => ({ ...e, position: Math.round((posSum / e.impressions) * 10) / 10 })).sort((a, b) => a.position - b.position);
    return { query, impressions: list.reduce((n, e) => n + e.impressions, 0), pages: list };
  }).sort((a, b) => b.impressions - a.impressions).slice(0, 30);
  const rows = geoAudit.pages.filter((p) => p.type === 'article' || p.type === 'service').map((p) => {
    const s = stats[p.path] || { impressions: 0, clicks: 0, posSum: 0, queries: {} };
    const position = s.impressions ? Math.round((s.posSum / s.impressions) * 10) / 10 : null;
    const ctr = s.impressions ? s.clicks / s.impressions : 0;
    const age = daysBetween(p.datePublished || '2026-03-06', today);
    let rank, reason;
    if (s.impressions >= 5 && position > 8 && position <= 30) { rank = 'A'; reason = '表示はあるが2〜3ページ目。見出しと中身を足せば1ページ目に届く'; }
    else if (s.impressions >= 10 && position <= 8 && ctr < 0.03) { rank = 'B'; reason = '上位に出ているのにクリックが少ない。タイトルと説明文を直す'; }
    else if (s.impressions < 5 && age >= 45) { rank = 'C'; reason = '検索にほとんど出ていない。狙う言葉を見直すか、ほかのページからリンクを足す'; }
    else { rank = 'D'; reason = age < 45 ? '公開から日が浅いので様子を見る' : '今のままでよい'; }
    // 直したばかりのページは、直す前の数字で A・B になっているだけなので、様子を見るほうへ回す
    const editedAt = p.dateModified || lastmod[p.path] || null;
    const waitUntil = editedAt && addDays(editedAt, WAIT_DAYS);
    let heldRank = null;
    if ((rank === 'A' || rank === 'B') && waitUntil && waitUntil > today) {
      heldRank = rank; rank = 'D';
      reason = `${md(editedAt)}に直したばかり。${md(waitUntil)}ごろまで様子を見る（直す前の数字では${heldRank}：${reason}）`;
    }
    return {
      editedAt, heldRank,
      path: p.path, title: p.title, type: p.type, rank, reason, impressions: s.impressions, clicks: s.clicks, position,
      queries: Object.entries(s.queries).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([q]) => q),
      score: p.score, fails: p.fails
    };
  });
  return { start, end: scEnd, waitDays: WAIT_DAYS, overlaps, rows: rows.sort((a, b) => a.rank.localeCompare(b.rank) || b.impressions - a.impressions || a.score - b.score) };
}
const rewrite = await rewritePlan();

const data = {
  generatedAt: jstNow().toISOString().slice(0, 16).replace('T', ' '),
  today, gaStart: GA_START, gaEnd, scEnd, scLagDays: daysBetween(scEnd, today),
  todaySoFar: { sessions: todaySoFar[0], users: todaySoFar[1] },
  campaign: { name: '名刺キャンペーン', start: CAMPAIGN_START, sessions: meishi[0], users: meishi[1], leads: meishiLeads },
  daily: { ga: gaDaily, sc: scDaily },
  aiCitations: aiCitations(),
  geoAudit: geoAudit && { date: geoAudit.date, average: geoAudit.average, site: geoAudit.site, commonFails: geoAudit.commonFails, pages: geoAudit.pages.map(({ path, type, title, score, fails }) => ({ path, type, title, score, fails })) },
  rewrite,
  citedPages: readJson('ai-cited-pages.json'),
  ranges
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT + '.tmp', JSON.stringify(data));
renameSync(OUT + '.tmp', OUT);
console.log(`${OUT} を更新しました（GA4 ${gaEnd}まで / Search Console ${scEnd}まで）`);
