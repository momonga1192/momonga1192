#!/usr/bin/env node
// 中身が変わったページを IndexNow で Bing などに知らせる（ChatGPTの検索はBingの結果を使うので、AIの答えの古い情報を早く直すため）。
// 本番のサイトマップの全ページを開き、本文（<main>）・タイトル・説明文のハッシュを前回と比べて、変わったURLだけを送る。
// 前回のハッシュは ~/.local/state/arcle-report/indexnow.json。初回は全ページを送る。
// 鍵は public/<鍵>.txt に置いてある（IndexNowの決まりで公開してよいもの）。
// 使い方: node scripts/indexnow.mjs [--dry-run]
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.arcle.net';
const STATE = join(homedir(), '.local', 'state', 'arcle-report', 'indexnow.json');
const DRY = process.argv.includes('--dry-run');
const keyFile = readdirSync(join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('public/ に IndexNow の鍵のファイルがありません');
const key = keyFile.replace('.txt', '');

// 鍵のファイルが本番に出ていないと IndexNow に断られるので、先に確かめる
const keyRes = await fetch(`${SITE}/${keyFile}`);
if (!keyRes.ok || (await keyRes.text()).trim() !== key) throw new Error(`${SITE}/${keyFile} がまだ公開されていません`);

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const prev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { hashes: {} };
const hashes = {};
const changed = [];
for (const url of urls) {
  const r = await fetch(url);
  if (!r.ok) { console.error(`開けない（${r.status}）: ${url}`); continue; }
  const html = await r.text();
  const part = [html.match(/<title[^>]*>[^<]*<\/title>/)?.[0], html.match(/<meta[^>]*name="description"[^>]*>/)?.[0], html.match(/<main[^>]*>[\s\S]*<\/main>/)?.[0]].join('\n');
  hashes[url] = createHash('sha1').update(part).digest('hex');
  if (prev.hashes[url] !== hashes[url]) changed.push(url);
}

if (!changed.length) { console.log('変わったページはありません'); process.exit(0); }
console.log(`変わったページ ${changed.length}件`);
changed.forEach((u) => console.log(`  ${u}`));
if (DRY) process.exit(0);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key, keyLocation: `${SITE}/${keyFile}`, urlList: changed })
});
// 200（受け付けた）と 202（鍵の確認待ち）は成功。それ以外は前回のハッシュを残して次回また送る
if (res.status !== 200 && res.status !== 202) throw new Error(`IndexNow が ${res.status} を返しました: ${await res.text()}`);
mkdirSync(dirname(STATE), { recursive: true });
writeFileSync(STATE, JSON.stringify({ lastSent: new Date().toISOString(), lastCount: changed.length, hashes: { ...prev.hashes, ...hashes } }, null, 1));
console.log(`IndexNow に送りました（${res.status}）`);
