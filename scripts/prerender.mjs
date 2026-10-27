import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');

const { render } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href);

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Pages to prerender are taken from the sitemap so the two never drift apart
const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8');
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
// Ad landing pages are noindex, so they stay out of the sitemap but still need static HTML
routes.push('/lp/josys-rescue', '/lp/mieruka', '/lp/hajimete-ai', '/lp/web-madoguchi');

const pick = (tagHtml, pattern) => tagHtml.match(pattern)?.[1];

const setMetaContent = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`),
    (_, before, after) => `${before}${value}${after}`
  );

const buildPage = (url) => {
  const { html: appHtml, helmet } = render(url);
  const titleTag = helmet.title.toString();
  const metaTags = helmet.meta.toString();
  const linkTags = helmet.link.toString();
  const scriptTags = helmet.script.toString();

  const title = pick(titleTag, /<title[^>]*>([^<]*)<\/title>/);
  const description = pick(metaTags, /<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  const canonical = pick(linkTags, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);

  let page = template;

  // Drop the homepage defaults that the page's Helmet tags replace, so each tag appears only once
  if (title) page = page.replace(/<title>[^<]*<\/title>/, '');
  if (description) page = page.replace(/<meta name="description"[^>]*>/, '');
  if (canonical) page = page.replace(/<link rel="canonical"[^>]*>/, '');
  if (/<meta[^>]*name="robots"/.test(metaTags)) page = page.replace(/<meta name="robots"[^>]*>/, '');

  // OGP / Twitter Card follow the page's title, description and canonical
  if (title) {
    page = setMetaContent(page, 'property', 'og:title', title);
    page = setMetaContent(page, 'name', 'twitter:title', title);
  }
  if (description) {
    page = setMetaContent(page, 'property', 'og:description', description);
    page = setMetaContent(page, 'name', 'twitter:description', description);
  }
  if (canonical) page = setMetaContent(page, 'property', 'og:url', canonical);
  if (url.startsWith('/articles/')) page = setMetaContent(page, 'property', 'og:type', 'article');


  page = page
    .replace('</head>', `${titleTag}${metaTags}${linkTags}${scriptTags}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    // The page already has its content, so the generic noscript fallback (with its own h1) is not needed
    .replace(/\s*<noscript>[\s\S]*?<\/noscript>/, '');

  // Written as /foo.html and served at /foo through cleanUrls in vercel.json
  const outFile = url === '/' ? join(distDir, 'index.html') : join(distDir, `${url}.html`);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page);
};

for (const url of routes) {
  buildPage(url);
  console.log(`prerendered ${url}`);
}
