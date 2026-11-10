#!/usr/bin/env node
// AIの答えに Arcle が出るか（名前が出たか・arcle.net が出典に入ったか）を調べて記録する。
// 質問は docs/geo/questions.json。結果は ~/.local/state/arcle-report/ai-citations.jsonl に1行ずつ足す
// （ダッシュボードの scripts/dashboard-data.mjs が読む）。
// キーがあるAIだけを使う（.env.local に書く。gitには入らない）:
//   GEMINI_API_KEY      … Gemini（Google検索で調べてから答える。GoogleのAIによる概要に近い）
//   OPENAI_API_KEY      … ChatGPT（Web検索つき）
//   PERPLEXITY_API_KEY  … Perplexity
// 使い方: node scripts/ai-citations.mjs [--repeat 2]
import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = join(root, '.env.local');
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const OUT = join(homedir(), '.local', 'state', 'arcle-report', 'ai-citations.jsonl');
const repeatArg = process.argv.indexOf('--repeat');
const REPEAT = repeatArg > 0 ? Number(process.argv[repeatArg + 1]) : 2; // AIの答えは毎回変わるので、同じ質問を複数回聞く
const { questions } = JSON.parse(readFileSync(join(root, 'docs', 'geo', 'questions.json'), 'utf8'));
const NAME = /arcle|アークル/i;
const SITE = /(^|\.)arcle\.net$/i;

async function postJson(url, body, headers) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body), signal: AbortSignal.timeout(120_000) });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(d.error || d).slice(0, 300)}`);
  return d;
}
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };

// 各AIは { text, sources: [{ url, domain }] } を返す
const engines = {
  gemini: process.env.GEMINI_API_KEY && {
    model: process.env.GEMINI_MODEL || 'gemini-flash-latest',
    async ask(q) {
      const d = await postJson(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`,
        { contents: [{ parts: [{ text: q }] }], tools: [{ google_search: {} }] },
        { 'x-goog-api-key': process.env.GEMINI_API_KEY }
      );
      const c = d.candidates?.[0];
      const text = (c?.content?.parts || []).map((p) => p.text || '').join('');
      // 出典のURLはGoogleの転送用URLなので、ドメインは title（例: arcle.net）から取る
      const sources = (c?.groundingMetadata?.groundingChunks || []).map((g) => ({ url: g.web?.uri || '', domain: (g.web?.title || hostOf(g.web?.uri)).replace(/^www\./, '') }));
      return { text, sources };
    }
  },
  chatgpt: process.env.OPENAI_API_KEY && {
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
    async ask(q) {
      const d = await postJson('https://api.openai.com/v1/responses', { model: this.model, input: q, tools: [{ type: 'web_search' }] }, { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` });
      const msgs = (d.output || []).filter((o) => o.type === 'message').flatMap((o) => o.content || []);
      const text = msgs.map((c) => c.text || '').join('');
      const sources = msgs.flatMap((c) => c.annotations || []).filter((a) => a.url).map((a) => ({ url: a.url, domain: hostOf(a.url) }));
      return { text, sources };
    }
  },
  perplexity: process.env.PERPLEXITY_API_KEY && {
    model: process.env.PERPLEXITY_MODEL || 'sonar',
    async ask(q) {
      const d = await postJson('https://api.perplexity.ai/chat/completions', { model: this.model, messages: [{ role: 'user', content: q }] }, { Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}` });
      const text = d.choices?.[0]?.message?.content || '';
      const urls = d.search_results?.map((s) => s.url) || d.citations || [];
      return { text, sources: urls.map((url) => ({ url, domain: hostOf(url) })) };
    }
  }
};

const active = Object.entries(engines).filter(([, e]) => e);
if (!active.length) {
  console.error('AIのキーがありません。.env.local に GEMINI_API_KEY などを書いてください。');
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
const date = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
let ok = 0, failed = 0;
for (const [engine, e] of active) {
  for (const item of questions) {
    for (let i = 0; i < REPEAT; i++) {
      try {
        const { text, sources } = await e.ask(item.q);
        const domains = [...new Set(sources.map((s) => s.domain).filter(Boolean))];
        const row = {
          date, engine, model: e.model, service: item.service, question: item.q, try: i + 1,
          mentioned: NAME.test(text), cited: domains.some((d) => SITE.test(d)),
          domains, answer: text.slice(0, 1500)
        };
        appendFileSync(OUT, JSON.stringify(row) + '\n');
        ok++;
        console.log(`${engine} ${row.mentioned ? '名前あり' : '名前なし'} ${row.cited ? '出典あり' : '      '} ${item.q.slice(0, 30)}`);
      } catch (err) {
        failed++;
        console.error(`${engine} 失敗: ${item.q.slice(0, 30)} … ${err.message}`);
      }
    }
  }
}
console.log(`${OUT} に ${ok}件を記録しました（失敗 ${failed}件）`);
if (!ok) process.exit(1);
