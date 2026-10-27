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

test("server-renders the Arcle V7 unfolding page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /見えない仕組みを/);
  assert.match(html, /Arcle/);
  assert.match(html, /UNFOLD|3Dストーリー|動く力/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("uses a real 3D camera path and five constructed transformations", async () => {
  const source = await readFile(new URL("../app/UnfoldingJourney.tsx", import.meta.url), "utf8");
  assert.match(source, /<Canvas/);
  assert.match(source, /CatmullRomCurve3/);
  assert.match(source, /CameraRig/);
  assert.match(source, /FoldingEntrance/);
  assert.match(source, /FrameCorridor/);
  assert.match(source, /DataLayers/);
  assert.match(source, /RecomposeRoom/);
  assert.match(source, /OpeningStage/);
  assert.doesNotMatch(source, /robot|character|monitor/i);
  assert.match(source, /prefers-reduced-motion/);
});
