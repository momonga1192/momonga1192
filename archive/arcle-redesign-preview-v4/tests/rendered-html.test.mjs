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

test("server-renders the Arcle character story", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /仕事の迷子を/);
  assert.match(html, /ARCLE GUIDE/);
  assert.match(html, /アル/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("contains an animated character and five story stages", async () => {
  const source = await readFile(new URL("../app/CharacterJourney.tsx", import.meta.url), "utf8");
  assert.match(source, /<Canvas/);
  assert.match(source, /GuideCharacter/);
  assert.match(source, /LooseThings/);
  assert.match(source, /ItShelter/);
  assert.match(source, /DataSteps/);
  assert.match(source, /AiBook/);
  assert.match(source, /WebWindow/);
  assert.match(source, /progress\.current\.velocity/);
  assert.match(source, /prefers-reduced-motion/);
});
