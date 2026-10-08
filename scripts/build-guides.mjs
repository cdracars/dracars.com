#!/usr/bin/env node
// Builds the Guides section: content/guides/*.md -> public/guides/**.html, plus public/sitemap.xml.
// Zero dependencies. Run with: node scripts/build-guides.mjs
// The generated HTML is committed so deployment stays a plain static `wrangler deploy`.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FIGURES } from "./figures.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content", "guides");
const PUBLIC = join(ROOT, "public");
const OUT = join(PUBLIC, "guides");
const SITE = "https://dracars.com";

// A guide that hasn't been updated in this many days is shown as "Aging" (unless marked legacy).
const AGING_AFTER_DAYS = 180;

const CATEGORIES = [
  { slug: "3d-printing", name: "3D Printing", blurb: "FDM printers, slicers, calibration, and getting good prints." },
  { slug: "resin-printing", name: "Resin Printing", blurb: "Setup, washing, curing, and handling resin safely." },
  { slug: "klipper-electronics", name: "Klipper & Electronics", blurb: "Firmware, wiring, and the boards behind the printer." },
  { slug: "projects-builds", name: "Projects & Builds", blurb: "Builds and retrospectives, including what went wrong." },
  { slug: "tools-software", name: "Tools & Software", blurb: "Software workflows and how to use the Dracars tools." },
];

const AFFILIATE_DISCLOSURE =
  "Quick heads-up: some links on this page are affiliate links. If you buy something through one of them, I may get a small kickback at no extra cost to you. I appreciate you using them—it helps support Dracars and lets me keep building the tools, guides, and projects here.";
const FOOTER_DISCLOSURE =
  "Guides may include affiliate links, disclosed on the page. Recommendations come first; links are added only where they fit.";

// ---------- helpers ----------

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) => esc(s).replace(/"/g, "&quot;");
const slugify = (s) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const fail = (msg) => { throw new Error(msg); };

const fmtDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

// ---------- frontmatter ----------
// Supported: `key: value`, `key: [a, b]`, and block lists (`key:` followed by `- item` lines).

function parseValue(v) {
  v = v.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v.startsWith("[") && v.endsWith("]")) return v.slice(1, -1).split(",").map((x) => x.trim()).filter(Boolean);
  return v.replace(/^"(.*)"$/, "$1");
}

function parseFrontmatter(src, file) {
  const m = src.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) fail(`${file}: missing frontmatter`);
  const data = {};
  let listKey = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { data[listKey].push(item[1].trim()); continue; }
    const kv = line.match(/^([A-Za-z]\w*):\s*(.*)$/);
    if (!kv) fail(`${file}: cannot parse frontmatter line "${line}"`);
    if (kv[2] === "") { listKey = kv[1]; data[listKey] = []; } else { listKey = null; data[kv[1]] = parseValue(kv[2]); }
  }
  return { data, body: m[2] };
}

// ---------- markdown (small subset) ----------
// Blocks: ## / ### headings, paragraphs, - and 1. lists, > quotes, ::: containers (tldr, note).
// Inline: `code`, **bold**, *italic*, [text](url) and [text](url "affiliate") for affiliate links.

function inline(text, ctx) {
  const parts = text.split(/(`[^`]+`)/);
  return parts.map((p, i) => {
    if (i % 2) return `<code>${esc(p.slice(1, -1))}</code>`;
    let h = esc(p);
    h = h.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, label, url, title) => {
      const external = /^https?:\/\//.test(url);
      if (title === "affiliate") {
        ctx.affiliateLinks++;
        return `<a href="${url}" rel="sponsored nofollow noopener" target="_blank">${label}</a>`;
      }
      return `<a href="${url}"${external ? ' rel="noopener" target="_blank"' : ""}>${label}</a>`;
    });
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
    return h;
  }).join("");
}

function renderBlocks(lines, ctx) {
  const out = [];
  let i = 0;
  const isBlockStart = (l) => /^(#{2,3}\s|[-*]\s|\d+\.\s|>\s?|:::|!figure\s|```)/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const container = line.match(/^:::(\w+)\s*(.*)$/);
    if (container) {
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") inner.push(lines[i++]);
      i++;
      const [kind, label] = [container[1], container[2]];
      if (kind === "tldr") ctx.hasTldr = true;
      const heading = label ? `<p class="callout-label">${inline(label, ctx)}</p>` : "";
      out.push(`<aside class="callout callout-${kind}"${kind === "tldr" ? ' id="tldr" aria-labelledby="tldr-label"' : ""}>${
        kind === "tldr" ? `<p class="callout-label" id="tldr-label">${inline(label, ctx)}</p>` : heading
      }${renderBlocks(inner, ctx)}</aside>`);
      continue;
    }

    const fig = line.match(/^!figure\s+(\S+)\s*$/);
    if (fig) {
      if (!FIGURES[fig[1]]) fail(`unknown figure "${fig[1]}"`);
      out.push(FIGURES[fig[1]]);
      i++; continue;
    }

    if (line.startsWith("```")) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
      continue;
    }

    const h = line.match(/^(#{2,3})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level} id="${slugify(h[2])}">${inline(h[2], ctx)}</h${level}>`);
      i++; continue;
    }

    if (/^[-*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const ordered = /^\d+\./.test(line);
      const items = [];
      while (i < lines.length && (ordered ? /^\d+\.\s/ : /^[-*]\s/).test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^([-*]|\d+\.)\s+/, ""), ctx)}</li>`);
        i++;
      }
      out.push(`<${ordered ? "ol" : "ul"}>${items.join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }

    if (/^>\s?/.test(line)) {
      const q = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
      out.push(`<blockquote>${renderBlocks(q, ctx)}</blockquote>`);
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) para.push(lines[i++]);
    out.push(`<p>${inline(para.join(" "), ctx)}</p>`);
  }
  return out.join("\n");
}

// ---------- guide loading + validation ----------

const REQUIRED = ["title", "slug", "description", "publishedAt", "updatedAt", "author", "category"];
const ISO = /^\d{4}-\d{2}-\d{2}$/;

function loadGuides() {
  const guides = [];
  for (const file of readdirSync(CONTENT).filter((f) => f.endsWith(".md")).sort()) {
    const { data, body } = parseFrontmatter(readFileSync(join(CONTENT, file), "utf8"), file);
    for (const k of REQUIRED) if (!data[k]) fail(`${file}: missing "${k}"`);
    if (!ISO.test(data.publishedAt) || !ISO.test(data.updatedAt)) fail(`${file}: dates must be YYYY-MM-DD`);
    if (data.updatedAt < data.publishedAt) fail(`${file}: updatedAt is before publishedAt`);
    if (!/^[a-z0-9-]+$/.test(data.slug)) fail(`${file}: slug must be lowercase letters, numbers, hyphens`);
    if (!CATEGORIES.some((c) => c.slug === data.category)) fail(`${file}: unknown category "${data.category}"`);
    if (data.status && !["current", "aging", "legacy"].includes(data.status)) fail(`${file}: status must be current|aging|legacy`);
    if (!data.testedWith?.length) fail(`${file}: testedWith is required (say what you actually used)`);
    if (data.draft) continue;
    if (/TODO|\(Cody:|\(add link/i.test(body)) fail(`${file}: contains an unfinished placeholder; finish it or set draft: true`);

    const ctx = { affiliateLinks: 0, hasTldr: false };
    const html = renderBlocks(body.replace(/\r\n/g, "\n").split("\n"), ctx);
    if (!ctx.hasTldr) fail(`${file}: needs a ":::tldr" block at the top`);
    const declared = data.affiliateLinksPresent === true;
    if (declared !== ctx.affiliateLinks > 0)
      fail(`${file}: affiliateLinksPresent is ${declared} but body has ${ctx.affiliateLinks} affiliate link(s)`);

    guides.push({ ...data, tags: data.tags ?? [], testedWith: data.testedWith, relatedGuides: data.relatedGuides ?? [], relatedTools: data.relatedTools ?? [], affiliateLinksPresent: declared, html, file });
  }
  const slugs = new Set();
  for (const g of guides) {
    if (slugs.has(g.slug)) fail(`duplicate slug ${g.slug}`);
    slugs.add(g.slug);
  }
  for (const g of guides) for (const r of g.relatedGuides) if (!slugs.has(r)) fail(`${g.file}: relatedGuides references unknown slug "${r}"`);
  return guides;
}

function freshness(g, today = new Date()) {
  const days = Math.floor((today - new Date(g.updatedAt + "T00:00:00Z")) / 86400000);
  const key = g.status === "legacy" ? "legacy" : days > AGING_AFTER_DAYS ? "aging" : "current";
  const label = { current: "Current", aging: "Aging", legacy: "Legacy" }[key];
  const hint = {
    current: "Recently reviewed and believed to still be accurate.",
    aging: "Not reviewed recently enough to assume everything is still current.",
    legacy: "Kept on purpose for older hardware, software, or workflows.",
  }[key];
  return { key, label, hint, text: g.statusNote ? `${label} — ${g.statusNote}` : label };
}

// ---------- templates ----------

const catName = (slug) => CATEGORIES.find((c) => c.slug === slug).name;

function page({ title, description, path, body, jsonld, type = "website" }) {
  const url = SITE + path;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${escAttr(description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#eee2e7" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#160f18" media="(prefers-color-scheme: dark)" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Dracars" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${escAttr(title)}" />
    <meta property="og:description" content="${escAttr(description)}" />
    <meta property="og:image" content="${SITE}/social-preview.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:alt" content="Dracars — useful software, browser tools, and hardware projects by Cody Dracars." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escAttr(title)}" />
    <meta name="twitter:description" content="${escAttr(description)}" />
    <meta name="twitter:image" content="${SITE}/social-preview.png" />
    <meta name="twitter:image:alt" content="Dracars — useful software, browser tools, and hardware projects by Cody Dracars." />
    <link rel="icon" href="/dracars-mark.webp" type="image/webp" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  </head>
  <body class="guides">
    <a class="skip-link" href="#content">Skip to content</a>
    <header class="site-header">
      <a class="wordmark" href="/" aria-label="dracars home">
        <img class="brand-lockup" src="/dracars-wordmark.webp" alt="" width="96" height="32" />
      </a>
      <nav class="site-nav" aria-label="Site"><a href="/">Tools</a><a href="/guides/"${path === "/guides/" ? ' aria-current="page"' : ""}>Guides</a></nav>
    </header>
    <main id="content">
${body}
    </main>
    <footer class="guide-footer">
      <span>Built by Cody Dracars.</span>
      <span class="footer-disclosure">${esc(FOOTER_DISCLOSURE)}</span>
      <a href="/">dracars.com</a>
    </footer>
  </body>
</html>
`;
}

function statusBadge(f) {
  return `<span class="status status-${f.key}" title="${escAttr(f.hint)}">${esc(f.label)}</span>`;
}

function guideCard(g) {
  const f = freshness(g);
  return `<a class="guide-card" href="/guides/${g.slug}/">
  <p class="guide-card-meta"><span>${esc(catName(g.category))}</span> ${statusBadge(f)}</p>
  <h3>${esc(g.title)}</h3>
  <p class="guide-card-desc">${esc(g.description)}</p>
  <p class="guide-card-updated">Updated <time datetime="${g.updatedAt}">${fmtDate(g.updatedAt)}</time></p>
</a>`;
}

function guidePage(g, all) {
  const f = freshness(g);
  const contents = [...g.html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)]
    .map(([, id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("");
  const related = g.relatedGuides.map((s) => all.find((x) => x.slug === s));
  const tools = g.relatedTools.map((t) => {
    const [name, url] = t.split("|").map((x) => x.trim());
    return `<li><a href="${escAttr(url)}" rel="noopener" target="_blank">${esc(name)}</a></li>`;
  });
  const body = `      <article class="guide">
        <p class="crumbs"><a href="/guides/">Guides</a> <span aria-hidden="true">/</span> ${esc(catName(g.category))}</p>
        <h1>${esc(g.title)}</h1>
        <p class="guide-deck">${esc(g.description)}</p>
        <div class="guide-meta">
          <span>By ${esc(g.author)}</span>
          <span>Updated <time datetime="${g.updatedAt}">${fmtDate(g.updatedAt)}</time></span>
          <span>${statusBadge(f)}${g.statusNote ? ` <span class="status-note">${esc(g.statusNote)}</span>` : ""}</span>
        </div>
        <div class="guide-details">
${contents ? `          <details class="guide-contents"><summary>On this page</summary><nav aria-label="On this page"><ul><li><a href="#tldr">At a glance</a></li>${contents}</ul></nav></details>` : ""}
          <details class="guide-equipment"><summary>Equipment &amp; guide details</summary><p>Published <time datetime="${g.publishedAt}">${fmtDate(g.publishedAt)}</time></p><p>Used for this guide:</p><ul>${g.testedWith.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>
        </div>
${g.affiliateLinksPresent ? `        <p class="disclosure">${esc(AFFILIATE_DISCLOSURE)}</p>\n` : ""}        <div class="guide-body">
${g.html}
        </div>
${tools.length ? `        <section class="guide-related"><h2 id="related-tools">Related Dracars tools</h2><ul>${tools.join("")}</ul></section>\n` : ""}${related.length ? `        <section class="guide-related"><h2 id="related-guides">Related Dracars guides</h2><ul>${related.map((r) => `<li><a href="/guides/${r.slug}/">${esc(r.title)}</a></li>`).join("")}</ul></section>\n` : ""}      </article>`;

  return page({
    title: `${g.title} — Dracars Guides`,
    description: g.description,
    path: `/guides/${g.slug}/`,
    type: "article",
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: g.title,
      description: g.description,
      datePublished: g.publishedAt,
      dateModified: g.updatedAt,
      author: { "@type": "Person", name: g.author, url: SITE + "/" },
      mainEntityOfPage: `${SITE}/guides/${g.slug}/`,
      keywords: g.tags.join(", "),
      ...(g.heroImage ? { image: SITE + g.heroImage } : {}),
    },
  });
}

function indexPage(guides) {
  const byUpdated = [...guides].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const featured = guides.find((g) => g.featured) ?? byUpdated[0];
  const ff = freshness(featured);
  const remaining = byUpdated.filter((g) => g.slug !== featured.slug);
  const categories = CATEGORIES.filter((c) => remaining.some((g) => g.category === c.slug));
  const topics = categories.length > 1 ? `<nav class="topic-links" aria-label="Guide topics">${categories.map((c) => `<a href="#topic-${c.slug}">${esc(c.name)}</a>`).join("")}</nav>` : "";
  const groups = categories.map((c) =>
    `<section class="topic-group" id="topic-${c.slug}" aria-labelledby="topic-${c.slug}-h"><h3 id="topic-${c.slug}-h">${esc(c.name)}</h3><div class="guide-grid">${remaining.filter((g) => g.category === c.slug).map(guideCard).join("\n")}</div></section>`).join("\n");

  const body = `      <section class="guides-hero" aria-labelledby="page-title">
        <h1 id="page-title">Guides.</h1>
        <p class="hero-intro">Notes from my workshop. Practical setups, useful workflows, and what I learn along the way.</p>
      </section>

      <section class="featured" aria-labelledby="featured-h">
        <h2 id="featured-h" class="section-label">Featured guide</h2>
        <a class="featured-card" href="/guides/${featured.slug}/">
          <p class="guide-card-meta"><span>${esc(catName(featured.category))}</span> ${statusBadge(ff)}</p>
          <h3>${esc(featured.title)}</h3>
          <p class="guide-card-desc">${esc(featured.description)}</p>
          <div class="featured-card-footer"><span class="guide-card-updated">Updated <time datetime="${featured.updatedAt}">${fmtDate(featured.updatedAt)}</time></span><span class="guide-read">Read the guide <span aria-hidden="true">↗</span></span></div>
        </a>
      </section>

${remaining.length ? `
      <section aria-labelledby="all-h" class="all-guides">
        <h2 id="all-h" class="section-label">More guides</h2>
        ${topics}
${groups}
      </section>` : ""}`;

  return page({
    title: "Guides — Dracars",
    description: "Practical 3D printing, resin printing, Klipper, and build guides from someone who actually uses the gear. Answer first, details after.",
    path: "/guides/",
    body,
    jsonld: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Dracars Guides",
      url: SITE + "/guides/",
      hasPart: guides.map((g) => ({ "@type": "TechArticle", headline: g.title, url: `${SITE}/guides/${g.slug}/`, dateModified: g.updatedAt })),
    },
  });
}

// ---------- build ----------

const guides = loadGuides();
if (!guides.length) fail("no published guides found");

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "index.html"), indexPage(guides));
for (const g of guides) {
  mkdirSync(join(OUT, g.slug), { recursive: true });
  writeFileSync(join(OUT, g.slug, "index.html"), guidePage(g, guides));
}

const urls = [
  { loc: `${SITE}/` },
  { loc: `${SITE}/guides/`, lastmod: guides.map((g) => g.updatedAt).sort().at(-1) },
  ...guides.map((g) => ({ loc: `${SITE}/guides/${g.slug}/`, lastmod: g.updatedAt })),
];
writeFileSync(
  join(PUBLIC, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`)
    .join("\n")}\n</urlset>\n`,
);

console.log(`Built ${guides.length} guide(s):`);
for (const g of guides) console.log(`  /guides/${g.slug}/  [${freshness(g).label}]${g.affiliateLinksPresent ? " (affiliate)" : ""}`);
