#!/usr/bin/env node
// AIの答えに Arcle が出るか（名前が出たか・arcle.net が出典に入ったか）を調べて記録する。
// 聞くのは Claude（Claude Code）と Codex（ChatGPTの代わり）。どちらもこのマシンのログイン済みのCLIを使い、Web検索させて答えさせる。
// 質問は docs/geo/questions.json。結果は ~/.local/state/arcle-report/ai-citations.jsonl に1行ずつ足す
// （ダッシュボードの scripts/dashboard-data.mjs が読む）。
// 使い方: node scripts/ai-citations.mjs [--repeat 2] [--only claude|codex] [--limit 1]
//
// 栗原さんの個人設定（CLAUDE.md・メモリ・つないだサービス）が答えに混ざらないよう、作業場所を /tmp にし、
// Claude はユーザー設定とMCPを読まず、Codex は config.toml・メモリ・AGENTS.md（作業場所のもの）を読まない。
// ログイン情報はふだんのものをそのまま使う（別の場所に写すと、トークンの更新でふだんのログインが切れることがある）
import { spawn } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(homedir(), '.local', 'state', 'arcle-report', 'ai-citations.jsonl');
const WORK = '/tmp/arcle-ai-ask';
const arg = (name, fallback) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : fallback; };
const REPEAT = Number(arg('--repeat', 2)); // AIの答えは毎回変わるので、同じ質問を複数回聞く
const ONLY = arg('--only', null);
const LIMIT = Number(arg('--limit', 0));
const { questions: allQuestions } = JSON.parse(readFileSync(join(root, 'docs', 'geo', 'questions.json'), 'utf8'));
const questions = LIMIT ? allQuestions.slice(0, LIMIT) : allQuestions;
const NAME = /arcle|アークル/i;
const SITE = /(^|\.)arcle\.net$/i;
const SUFFIX = '\n\nWeb検索で調べてから答えてください。参考にしたページは sources に入れてください。';
const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['answer', 'sources'],
  properties: {
    answer: { type: 'string' },
    sources: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['title', 'url'], properties: { title: { type: 'string' }, url: { type: 'string' } } } }
  }
};

mkdirSync(WORK, { recursive: true });
const schemaFile = join(WORK, 'schema.json');
writeFileSync(schemaFile, JSON.stringify(SCHEMA));
const PATH = `${homedir()}/.local/bin:${process.env.PATH || '/usr/bin:/bin'}`;

function run(cmd, args, input, timeoutMs = 8 * 60_000) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: WORK, env: { ...process.env, PATH }, stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '', err = '';
    const timer = setTimeout(() => { p.kill('SIGTERM'); reject(new Error('時間切れ')); }, timeoutMs);
    p.stdout.on('data', (d) => (out += d));
    p.stderr.on('data', (d) => (err += d));
    p.on('error', (e) => { clearTimeout(timer); reject(e); });
    p.on('close', (code) => { clearTimeout(timer); code === 0 ? resolve(out) : reject(new Error(`終了コード ${code}: ${(err || out).slice(-300)}`)); });
    p.stdin.end(input);
  });
}
const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } };
const codexModel = () => readFileSync(join(homedir(), '.codex', 'config.toml'), 'utf8').match(/^model\s*=\s*"([^"]+)"/m)?.[1];

// 各AIは { answer, sources: [{ title, url }] } を返す
const engines = {
  claude: {
    model: process.env.AI_ASK_CLAUDE_MODEL || 'sonnet',
    async ask(q) {
      const out = await run('claude', [
        '-p', '--no-session-persistence', '--setting-sources', 'local', '--strict-mcp-config',
        '--model', this.model, '--output-format', 'json', '--json-schema', JSON.stringify(SCHEMA),
        '--allowedTools', 'WebSearch,WebFetch',
        '--disallowedTools', 'Bash,Edit,Write,Read,Glob,Grep,Agent,NotebookEdit'
      ], q + SUFFIX);
      const d = JSON.parse(out);
      if (d.is_error) throw new Error(String(d.result).slice(0, 300));
      return d.structured_output || JSON.parse(d.result);
    }
  },
  codex: {
    model: process.env.AI_ASK_CODEX_MODEL || codexModel(),
    async ask(q) {
      const outFile = join(WORK, `codex-${process.pid}-${Date.now()}.json`);
      await run('codex', [
        'exec', '--ephemeral', '--skip-git-repo-check', '--ignore-user-config', '--ignore-rules', '-s', 'read-only',
        ...(this.model ? ['-m', this.model] : []),
        '-c', 'model_reasoning_effort="low"', '-c', 'web_search="live"', '-c', 'features.memories=false', '-c', 'project_doc_max_bytes=0',
        '--output-schema', schemaFile, '-o', outFile, '-'
      ], q + SUFFIX);
      const d = JSON.parse(readFileSync(outFile, 'utf8'));
      rmSync(outFile, { force: true });
      return d;
    }
  }
};

const active = Object.entries(engines).filter(([name]) => !ONLY || name === ONLY);
mkdirSync(dirname(OUT), { recursive: true });
const date = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
let ok = 0, failed = 0;

// 同じ質問を Claude と Codex に同時に聞く（全体の時間を半分にする）
for (const item of questions) {
  for (let i = 0; i < REPEAT; i++) {
    await Promise.all(active.map(async ([engine, e]) => {
      try {
        const { answer = '', sources = [] } = await e.ask(item.q);
        const domains = [...new Set(sources.map((s) => hostOf(s.url)).filter(Boolean))];
        const row = {
          date, engine, model: e.model, service: item.service, question: item.q, try: i + 1,
          mentioned: NAME.test(answer), cited: domains.some((d) => SITE.test(d)),
          domains, answer: answer.slice(0, 1500)
        };
        appendFileSync(OUT, JSON.stringify(row) + '\n');
        ok++;
        console.log(`${engine.padEnd(6)} ${row.mentioned ? '名前あり' : '名前なし'} ${row.cited ? '出典あり' : '出典なし'} ${item.q.slice(0, 28)}`);
      } catch (err) {
        failed++;
        console.error(`${engine} 失敗: ${item.q.slice(0, 28)} … ${err.message}`);
      }
    }));
  }
}
console.log(`${OUT} に ${ok}件を記録しました（失敗 ${failed}件）`);
if (!ok) process.exit(1);
