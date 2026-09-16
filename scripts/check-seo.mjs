import assert from "node:assert/strict";
import { listPortfolioMediaFiles, portfolioMediaKind } from "../lib/portfolio-media-files.mjs";

// Run against a running production server: node scripts/check-seo.mjs http://localhost:3100
const base = process.argv[2] || "http://localhost:3100";
const canonicalHost = "https://www.epitomecreatives.com";
const pages = ["/", "/services", "/portfolio", "/privacy"];
const titles = new Set();
const descriptions = new Set();
for (const path of pages) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `${path}: HTTP status`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title?.includes("Epitome Creatives"), `${path}: branded title`);
  assert.ok(title && description, `${path}: title and description`);
  assert.ok(!titles.has(title), `${path}: unique title`);
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  titles.add(title); descriptions.add(description);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one H1`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical?.replace(/\/$/, ""), `${canonicalHost}${path}`.replace(/\/$/, ""), `${path}: canonical`);
  assert.ok(!html.includes('content="noindex'), `${path}: indexable`);
  assert.ok(html.includes('max-image-preview:large'), `${path}: large image previews`);
  assert.ok(html.includes('name="twitter:title"'), `${path}: Twitter metadata`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const data = JSON.parse(match[1]);
    assert.equal(data['@context'], 'https://schema.org');
    assert.ok(!match[1].includes('addressLocality'), 'No unverified city/address');
  }
  if (path === '/' || path === '/services') assert.ok(html.includes('home-based') || html.includes('Home-based'));
  console.log(`PASS ${path}: metadata, headings, indexing, structured data`);
}
for (const path of ['/admin', '/login', '/api/portfolio', '/api/login', '/api/upload/web', '/api/admin/images', '/api/images']) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, `Removed route: ${path}`);
}
for (const path of ['/api/portfolio', '/api/login', '/api/upload', '/api/upload/web', '/api/upload/mobile', '/api/admin/images']) {
  const response = await fetch(new URL(path, base), { method: 'POST' });
  assert.equal(response.status, 404, `Removed mutation route: ${path}`);
}
const redirect = await fetch(new URL('/products',base),{redirect:'manual'});
assert.equal(redirect.status,308);
assert.equal(redirect.headers.get('location'),'/portfolio');
const missing = await fetch(new URL('/seo-check-page-does-not-exist',base));
assert.equal(missing.status,404);
const sitemap = await (await fetch(new URL('/sitemap-0.xml',base))).text();
for(const path of pages) assert.ok(sitemap.includes(`<loc>${canonicalHost}${path === '/' ? '' : path}</loc>`),`Sitemap: ${path}`);
for(const path of ['/admin','/login','/api/','/products']) assert.ok(!sitemap.includes(`${canonicalHost}${path}`),`Sitemap excludes ${path}`);
const files = (await listPortfolioMediaFiles()).filter(file=>portfolioMediaKind(file)==='image');
assert.equal((sitemap.match(/<image:image>/g)||[]).length,files.length,'Image sitemap covers the current library');
for(const file of files) assert.ok(sitemap.includes(encodeURIComponent(file)),`Sitemap image: ${file}`);
console.log(`PASS sitemap: all ${pages.length} public pages, ${files.length} photographs, no private URLs`);
const preview = await fetch(new URL('/social-preview.jpg',base));
assert.equal(preview.status,200);
assert.ok(preview.headers.get('content-type')?.includes('image/jpeg'));
console.log('PASS removed admin/API routes, legacy redirect, real 404 and social preview');
