import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the interactive Arcle Pocket site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /その「なんか困る」を/);
  assert.match(html, /ポッケ/);
  assert.match(html, /PC・アカウント/);
  assert.match(html, /AIどう使う/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("builds routes from interactive issue selection without 3D", async () => {
  const source = await readFile(new URL("../app/InteractivePocket.tsx", import.meta.url), "utf8");
  assert.match(source, /draggable/);
  assert.match(source, /onDrop/);
  assert.match(source, /aria-pressed/);
  assert.match(source, /selectedIssues/);
  assert.match(source, /route-builder/);
  assert.doesNotMatch(source, /Canvas|three|video/);
});
