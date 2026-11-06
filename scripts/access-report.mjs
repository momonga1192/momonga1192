#!/usr/bin/env node
// Arcleのアクセス日報。GA4とSearch Consoleの数字をMarkdownにまとめて標準出力に出す。
// 使い方: node scripts/access-report.mjs > report.md
// 前提: gcloud auth application-default login 済み（Search Console）、
//       ga4-reader へのトークン作成者権限（GA4。scripts/ga4.sh と同じ仕組み）
import { execFileSync } from 'node:child_process';

const SA = process.env.GA4_SA || 'ga4-reader@arcle-489401.iam.gserviceaccount.com';
const PROPERTY = process.env.GA4_PROPERTY_ID || '514197778';
const QUOTA_PROJECT = process.env.GCP_QUOTA_PROJECT || 'arcle-489401';
const SC_SITE = 'sc-domain:arcle.net';
const CAMPAIGN_START = '2026-11-01';

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

async function ga({ start, end, dims = [], mets, filter, order, limit = 10 }) {
  const body = {
    dateRanges: [{ startDate: start, endDate: end }],
    dimensions: dims.map((name) => ({ name })),
    metrics: mets.map((name) => ({ name })),
    dimensionFilter: filter ? { andGroup: { expressions: [excludeSelf, filter] } } : excludeSelf,
    limit
  };
  if (order) body.orderBys = [order];
  else if (mets.length) body.orderBys = [{ metric: { metricName: mets[0] }, desc: true }];
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
  // 表示回数の多い順にする（APIはクリック順で返す）
  return (d.rows || []).sort((a, b) => b.impressions - a.impressions || b.clicks - a.clicks);
}

// 日付（日本時間）
const jst = (offsetDays = 0) => {
  const t = new Date(Date.now() + 9 * 3600e3 + offsetDays * 86400e3);
  return t.toISOString().slice(0, 10);
};
const addDays = (ymd, n) => new Date(Date.parse(ymd + 'T00:00:00Z') + n * 86400e3).toISOString().slice(0, 10);
const md = (ymd) => `${Number(ymd.slice(5, 7))}/${Number(ymd.slice(8, 10))}`;
const wd = (ymd) => '日月火水木金土'[new Date(ymd + 'T00:00:00Z').getUTCDay()];
const diff = (now, before) => {
  if (before === 0) return now === 0 ? '±0' : `+${now}`;
  const d = now - before;
  return `${d >= 0 ? '+' : ''}${Math.round(d * 10) / 10}`;
};
const pct = (x) => `${Math.round(x * 100)}%`;
const r1 = (x) => Math.round(x * 10) / 10;

const today = jst(0);
const y = jst(-1);
const lastWeekSameDay = addDays(y, -7);
const w0s = addDays(y, -6); // 直近7日
const w1s = addDays(y, -13); // その前7日
const w1e = addDays(y, -7);

const METS = ['sessions', 'activeUsers', 'screenPageViews', 'keyEvents'];
const total = async (start, end) => (await ga({ start, end, mets: METS }))[0]?.m || [0, 0, 0, 0];

const [yd, lw, w0, w1] = await Promise.all([total(y, y), total(lastWeekSameDay, lastWeekSameDay), total(w0s, y), total(w1s, w1e)]);
const [sources, pages, events, leads, meishi, meishiLeads] = await Promise.all([
  ga({ start: w0s, end: y, dims: ['sessionSourceMedium'], mets: ['sessions', 'engagedSessions'], limit: 8 }),
  ga({ start: w0s, end: y, dims: ['pagePath'], mets: ['screenPageViews', 'activeUsers'], limit: 10 }),
  ga({ start: w0s, end: y, dims: ['eventName'], mets: ['eventCount'], filter: { filter: { fieldName: 'eventName', inListFilter: { values: ['generate_lead', 'it_check_banner_click', 'it_check_start', 'it_check_complete'] } } } }),
  ga({ start: w0s, end: y, dims: ['customEvent:form', 'customEvent:campaign'], mets: ['eventCount'], filter: { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } } }).catch(() => []),
  ga({ start: CAMPAIGN_START, end: y, mets: ['sessions', 'activeUsers'], filter: { filter: { fieldName: 'sessionCampaignName', stringFilter: { value: 'meishi' } } } }),
  ga({ start: CAMPAIGN_START, end: y, mets: ['eventCount'], filter: { andGroup: { expressions: [
    { filter: { fieldName: 'eventName', stringFilter: { value: 'generate_lead' } } },
    { filter: { fieldName: 'customEvent:campaign', stringFilter: { value: 'meishi' } } }
  ] } } }).catch(() => [])
]);

// Search Console は2〜3日遅れて確定するので、データのある最後の日までの7日で比べる
const scDays = await sc(addDays(today, -10), today, ['date'], 20);
const scEnd = scDays.length ? scDays.map((r) => r.keys[0]).sort().at(-1) : addDays(today, -3);
const s0s = addDays(scEnd, -6), s1s = addDays(scEnd, -13), s1e = addDays(scEnd, -7);
const [sc0, sc1, queries, prevQueries, scPages] = await Promise.all([
  sc(s0s, scEnd),
  sc(s1s, s1e),
  sc(s0s, scEnd, ['query'], 200),
  sc(addDays(s0s, -28), addDays(s0s, -1), ['query'], 1000),
  sc(s0s, scEnd, ['page'], 10)
]);
const t0 = sc0[0] || { clicks: 0, impressions: 0, position: 0 };
const t1 = sc1[0] || { clicks: 0, impressions: 0, position: 0 };
const known = new Set(prevQueries.map((r) => r.keys[0]));
const newQueries = queries.filter((r) => !known.has(r.keys[0]));
const josysQueries = queries.filter((r) => /情シス|it|ｉｔ|サポート|パソコン|pc|ネットワーク|一宮|稲沢|尾張|名古屋|岐阜|三重|愛知|東海/i.test(r.keys[0]) && !/arcle|アークル/i.test(r.keys[0]));

// 気づき（数字から機械的に拾う）
const notes = [];
if (yd[3] > 0) notes.push(`昨日、問い合わせ・診断の申し込み（キーイベント）が${yd[3]}件ありました。フォームの通知を確認してください。`);
if (meishi[0]?.m[0]) notes.push(`名刺のQRから、11/1以降で${meishi[0].m[0]}セッションの訪問がありました。`);
if (w0[0] >= 2 * Math.max(w1[0], 1) && w0[0] >= 10) notes.push(`直近7日のセッションが前の7日の${r1(w0[0] / Math.max(w1[0], 1))}倍に増えています。`);
if (newQueries.length) notes.push(`Google検索で新しく表示された検索語が${newQueries.length}個あります（下の一覧）。`);
if (josysQueries.length) notes.push(`情シス代行・地域に関わる検索語が${josysQueries.length}個、表示されています。`);
if (t0.impressions > t1.impressions * 1.5 && t0.impressions >= 20) notes.push(`検索での表示回数が前の7日より${t0.impressions - t1.impressions}回増えました。`);
if (!notes.length) notes.push('大きな動きはありません。');

const out = [];
const hm = new Date(Date.now() + 9 * 3600e3).toISOString().slice(11, 16);
out.push(`更新：${md(today)}（${wd(today)}）${hm}　対象：GA4は${md(y)}（${wd(y)}）まで、Search Consoleは${md(scEnd)}まで`);
out.push('', '## 気づき', ...notes.map((n) => `- ${n}`));
out.push('', `## 昨日（${md(y)}・${wd(y)}）`);
out.push(`- セッション ${yd[0]}（先週の${wd(y)}曜 ${lw[0]}）／ユーザー ${yd[1]}／ページビュー ${yd[2]}／問い合わせ ${yd[3]}`);
out.push('', `## 直近7日（${md(w0s)}〜${md(y)}）`);
out.push(`- セッション ${w0[0]}（前の7日 ${w1[0]}、${diff(w0[0], w1[0])}）`);
out.push(`- ユーザー ${w0[1]}（${diff(w0[1], w1[1])}）／ページビュー ${w0[2]}（${diff(w0[2], w1[2])}）／問い合わせ ${w0[3]}（${diff(w0[3], w1[3])}）`);
out.push('', '### 参照元');
out.push(...(sources.length ? sources.map((r) => `- ${r.d[0]}：${r.m[0]}セッション（エンゲージ ${pct(r.m[1] / Math.max(r.m[0], 1))}）`) : ['- なし']));
out.push('', '### よく見られたページ');
out.push(...(pages.length ? pages.map((r) => `- ${r.d[0]}：${r.m[0]}PV・${r.m[1]}人`) : ['- なし']));
out.push('', '### 問い合わせ・診断');
const ev = Object.fromEntries(events.map((r) => [r.d[0], r.m[0]]));
out.push(`- 問い合わせ・申し込み（generate_lead） ${ev.generate_lead || 0}件${leads.length ? `（${leads.map((r) => `${r.d[0] === '(not set)' ? '不明' : r.d[0]}${r.d[1] && r.d[1] !== '(not set)' ? '・' + r.d[1] : ''} ${r.m[0]}`).join('、')}）` : ''}`);
out.push(`- IT健康診断：バナーのクリック ${ev.it_check_banner_click || 0}／開始 ${ev.it_check_start || 0}／完了 ${ev.it_check_complete || 0}`);
out.push(`- 名刺キャンペーン（11/1から累計）：${meishi[0]?.m[0] || 0}セッション・${meishi[0]?.m[1] || 0}人、問い合わせ ${meishiLeads[0]?.m[0] || 0}件`);
out.push('', `## Google検索（${md(s0s)}〜${md(scEnd)}）`);
out.push(`- クリック ${t0.clicks}（前の7日 ${t1.clicks}）／表示 ${t0.impressions}（${t1.impressions}）／平均順位 ${r1(t0.position)}（${r1(t1.position)}）`);
const qline = (r) => `- ${r.keys[0]}：表示${r.impressions}・クリック${r.clicks}・${r1(r.position)}位`;
out.push('', '### 表示が多い検索語');
out.push(...(queries.length ? queries.slice(0, 10).map(qline) : ['- なし']));
if (josysQueries.length) out.push('', '### 情シス代行・地域の検索語', ...josysQueries.slice(0, 10).map(qline));
if (newQueries.length) out.push('', '### 新しく表示された検索語（その前の28日になかったもの）', ...newQueries.slice(0, 10).map(qline));
out.push('', '### 表示が多いページ');
out.push(...(scPages.length ? scPages.map((r) => `- ${r.keys[0].startsWith('https://arcle.net') ? r.keys[0].replace('https://', '') + '（wwwなし）' : r.keys[0].replace('https://www.arcle.net', '')}：表示${r.impressions}・クリック${r.clicks}・${r1(r.position)}位`) : ['- なし']));
out.push('', '---', '自分のアクセス（?internal=1 のブラウザ・UM350の開発サーバー経由）は除いています。数字はGA4とSearch Consoleから自動で取っています（scripts/access-report.mjs）。');

console.log(out.join('\n'));
