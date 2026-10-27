import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Arcle V6 landscape page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /ばらばらの流れを/);
  assert.match(html, /Arcle/);
  assert.match(html, /CONNECTED LANDSCAPE|3Dストーリー|ひとつの景色/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("uses a real 3D camera path and five natural spaces", async () => {
  const source = await readFile(new URL("../app/LandscapeJourney.tsx", import.meta.url), "utf8");
  assert.match(source, /<Canvas/);
  assert.match(source, /CatmullRomCurve3/);
  assert.match(source, /CameraRig/);
  assert.match(source, /Confluence/);
  assert.match(source, /StoneBridge/);
  assert.match(source, /DataTerrace/);
  assert.match(source, /KnowledgeGrove/);
  assert.match(source, /OpenHorizon/);
  assert.doesNotMatch(source, /robot|character|monitor/i);
  assert.match(source, /prefers-reduced-motion/);
});
