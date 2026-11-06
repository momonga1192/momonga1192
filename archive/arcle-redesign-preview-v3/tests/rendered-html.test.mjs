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

test("server-renders the Arcle V3 page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /会社のITが/);
  assert.match(html, /Arcle/);
  assert.match(html, /Natural Journey|3Dストーリー|ひとつにつながる/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("uses a real 3D camera path and five distinct spaces", async () => {
  const source = await readFile(new URL("../app/NaturalJourney.tsx", import.meta.url), "utf8");
  assert.match(source, /<Canvas/);
  assert.match(source, /CatmullRomCurve3/);
  assert.match(source, /CameraRig/);
  assert.match(source, /ConnectionGarden/);
  assert.match(source, /ItStudio/);
  assert.match(source, /DataTerrace/);
  assert.match(source, /AiLibrary/);
  assert.match(source, /WebAtelier/);
  assert.match(source, /prefers-reduced-motion/);
});
