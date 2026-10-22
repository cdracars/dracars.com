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

// Header CSS checks. The site has no browser test runner, so these read the stylesheet directly.
const css = readFileSync(new URL('styles.css', root), 'utf8');
const rootBlock = css.match(/:root \{([^}]*)\}/)[1];
const token = (name, side) => {
  const value = rootBlock.match(new RegExp(`--${name}: light-dark\\((#[0-9a-f]{6}), (#[0-9a-f]{6})\\)`))[side === 'light' ? 1 : 2];
  return value;
};
const declaration = (selector, property) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rule = css.match(new RegExp(`(?:^|\\n)${escaped} \\{([^}]*)\\}`));
  assert.ok(rule, `styles.css: missing rule ${selector}`);
  return rule[1].match(new RegExp(`(?:^|;)\\s*${property}:\\s*([^;]+)`))?.[1].trim();
};
const luminance = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const varName = value => value.match(/^var\(--([\w-]+)\)$/)?.[1];

// On the narrowest phones the logo and the labelled toggle are wider than the header row. The toggle then runs
// under the GitHub corner and the stretched grid makes the page scroll sideways, so its text label must go.
const narrowToggle = css.match(/@media \(max-width: (\d+)px\) \{[^@]*?\.theme-toggle span \{[^}]*clip-path: inset\(50%\)/);
assert.ok(narrowToggle && Number(narrowToggle[1]) >= 374, 'theme toggle needs an icon-only layout up to at least 374px');

// The current page needs a cue besides colour on every page, not only the homepage.
assert.equal(declaration('.site-nav a[aria-current]', 'text-decoration-thickness'), '2px', 'current nav link needs a thicker underline');

// GitHub corner: the triangle stays visible against the page (3:1) and the cat against the triangle, at rest and on hover.
const cornerFill = varName(declaration('.github-corner svg', 'fill'));
const cornerInk = varName(declaration('.github-corner svg', 'color'));
const cornerHover = varName(declaration('.github-corner:hover svg', 'fill'));
for (const side of ['light', 'dark']) {
  const paper = token('paper', side);
  for (const [fill, state] of [[cornerFill, 'rest'], [cornerHover, 'hover']]) {
    assert.ok(contrast(token(fill, side), paper) >= 3, `GitHub corner (${state}, ${side}) is under 3:1 against the page`);
    assert.ok(contrast(token(cornerInk, side), token(fill, side)) >= 3, `GitHub cat (${state}, ${side}) is under 3:1 against the corner`);
  }
}
console.log('PASS header CSS: icon-only toggle on narrow phones, current-page cue, corner contrast');
