import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { siteHeader, siteFooter } from './site-chrome.mjs';

const root = new URL('../public/', import.meta.url);
const sectionPages = section => readdirSync(new URL(`${section}/`, root), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `/${section}/${entry.name}/`);
const paths = ['/', '/guides/', '/build-logs/', '/workshop/', '/resources/', ...sectionPages('workshop'), ...sectionPages('resources'), ...readdirSync(new URL('guides/', root), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `/guides/${entry.name}/`), ...readdirSync(new URL('build-logs/', root), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `/build-logs/${entry.name}/`)];
for (const path of paths) {
  const html = readFileSync(new URL(`${path.slice(1)}index.html`, root), 'utf8').replace(/\r\n/g, '\n');
  assert.ok(html.includes(siteHeader(path)), `${path}: shared header missing or stale`);
  assert.ok(html.includes(siteFooter()), `${path}: shared footer missing or stale`);
  assert.equal((html.match(/<header class="site-header"/g) || []).length, 1, `${path}: expected one site header`);
  assert.equal((html.match(/<footer class="site-footer"/g) || []).length, 1, `${path}: expected one site footer`);
  assert.equal((html.match(/class="github-corner"/g) || []).length, 1);
  assert.ok(html.includes('<main id="content">'), `${path}: skip-link target missing`);
  console.log(`PASS ${path}: shared header, footer, corner, and skip target`);
}
