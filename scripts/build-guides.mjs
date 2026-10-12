#!/usr/bin/env node
// Builds the Guides section: content/guides/*.md -> public/guides/**.html, plus public/sitemap.xml.
// Zero dependencies. Run with: node scripts/build-guides.mjs
// The generated HTML is committed so deployment stays a plain static `wrangler deploy`.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FIGURES } from "./figures.mjs";
import { siteHeader, siteFooter } from "./site-chrome.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content", "guides");
const BUILD_LOG_CONTENT = join(ROOT, "content", "build-logs");
const PROJECT_CONTENT = join(ROOT, "content", "projects");
const PUBLIC = join(ROOT, "public");
const OUT = join(PUBLIC, "guides");
const BUILD_LOG_OUT = join(PUBLIC, "build-logs");
const PROJECT_OUT = join(PUBLIC, "workshop");
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
// Blocks: ## / ### headings, paragraphs, - and 1. lists, > quotes, ::: containers (tldr, note), and !photo blocks.
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

    const photo = line.match(/^!photo\s+(\S+)(?:\s*\|\s*(.*))?\s*$/);
    if (photo) {
      const [, file, caption = ""] = photo;
      if (!/^[a-z0-9][a-z0-9._-]*$/i.test(file)) fail(`invalid photo filename "${file}"`);
      const alt = caption || "Build log photo";
      const photoDirectory = ctx.photoDirectory ?? "resin-grow-tent-setup";
      out.push(`<figure class="photo"><img src="/images/build-logs/${escAttr(photoDirectory)}/${escAttr(file)}" alt="${escAttr(alt)}" loading="lazy" />${caption ? `<figcaption>${inline(caption, ctx)}</figcaption>` : ""}</figure>`);
      i++; continue;
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
const PROJECT_STATES = {
  "in-use": { label: "In use", hint: "Usable and mostly settled for now; it may be revisited later." },
  testing: { label: "Testing", hint: "Built and being checked before settling into regular use." },
  building: { label: "Building", hint: "Active work is still underway." },
};

function loadEntries(contentDir, label) {
  const guides = [];
  for (const file of readdirSync(contentDir).filter((f) => f.endsWith(".md")).sort()) {
    const { data, body } = parseFrontmatter(readFileSync(join(contentDir, file), "utf8"), file);
    for (const k of REQUIRED) if (!data[k]) fail(`${file}: missing "${k}"`);
    if (!ISO.test(data.publishedAt) || !ISO.test(data.updatedAt)) fail(`${file}: dates must be YYYY-MM-DD`);
    if (data.updatedAt < data.publishedAt) fail(`${file}: updatedAt is before publishedAt`);
    if (!/^[a-z0-9-]+$/.test(data.slug)) fail(`${file}: slug must be lowercase letters, numbers, hyphens`);
    if (!CATEGORIES.some((c) => c.slug === data.category)) fail(`${file}: unknown category "${data.category}"`);
    if (data.status && !["current", "aging", "legacy", "coming-soon"].includes(data.status)) fail(`${file}: status must be current|aging|legacy|coming-soon`);
    if (label === "build logs" && !PROJECT_STATES[data.projectState]) fail(`${file}: projectState must be in-use|testing|building`);
    if (!data.testedWith?.length) fail(`${file}: testedWith is required (say what you actually used)`);
    if (data.draft) continue;
    if (/TODO|\(Cody:|\(add link/i.test(body)) fail(`${file}: contains an unfinished placeholder; finish it or set draft: true`);

    const ctx = { affiliateLinks: 0, hasTldr: false, photoDirectory: label === "build logs" ? data.slug : null };
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
  if (!guides.length) fail(`no published ${label} found`);
  return guides;
}

const loadGuides = () => loadEntries(CONTENT, "guides");
const loadBuildLogs = () => loadEntries(BUILD_LOG_CONTENT, "build logs");

function loadProjects() {
  const projects = [];
  for (const file of readdirSync(PROJECT_CONTENT).filter((f) => f.endsWith(".md")).sort()) {
    const { data, body } = parseFrontmatter(readFileSync(join(PROJECT_CONTENT, file), "utf8"), file);
    for (const key of ["title", "slug", "description", "purpose", "status", "phase", "updatedAt", "nextAction"]) if (!data[key]) fail(`${file}: missing "${key}"`);
    if (!ISO.test(data.updatedAt)) fail(`${file}: updatedAt must be YYYY-MM-DD`);
    if (!/^[a-z0-9-]+$/.test(data.slug)) fail(`${file}: slug must be lowercase letters, numbers, hyphens`);
    if (!["planning", "building", "testing", "working", "troubleshooting", "experimental", "operational", "paused", "blocked", "abandoned", "complete", "converted"].includes(data.status)) fail(`${file}: invalid project status`);
    if (!data.launchGroup || !["featured", "child", "active", "established", "planned"].includes(data.launchGroup)) fail(`${file}: launchGroup must be featured|child|active|established|planned`);
    data.launchOrder = Number(data.launchOrder ?? 100);
    if (!Number.isFinite(data.launchOrder)) fail(`${file}: launchOrder must be a number`);
    if (!data.focus?.length && !data.equipment?.length && !data.workstreams?.length) fail(`${file}: add focus, equipment, or workstreams`);
    data.equipment ??= [];
    data.problems ??= [];
    data.phases ??= [];
    data.relatedLogs ??= [];
    data.relatedGuides ??= [];
    data.relatedProjects ??= [];
    data.focus ??= [];
    data.workstreams ??= [];
    const ctx = { affiliateLinks: 0, hasTldr: false };
    const html = renderBlocks(body.replace(/\r\n/g, "\n").split("\n"), ctx);
    if (/TODO|\(Cody:|\(add link/i.test(body)) fail(`${file}: contains an unfinished placeholder`);
    projects.push({ ...data, html, file });
  }
  const orderValues = projects.map((project) => project.launchOrder);
  if (new Set(orderValues).size !== orderValues.length) fail("Workshop projects must have unique launchOrder values");
  return projects.sort((a, b) => a.launchOrder - b.launchOrder);
}

function freshness(g, today = new Date()) {
  const days = Math.floor((today - new Date(g.updatedAt + "T00:00:00Z")) / 86400000);
  const key = g.status === "coming-soon" ? "coming-soon" : g.status === "legacy" ? "legacy" : days > AGING_AFTER_DAYS ? "aging" : "current";
  const label = { current: "Current", aging: "Aging", legacy: "Legacy", "coming-soon": "Coming Soon" }[key];
  const hint = {
    current: "Recently reviewed and believed to still be accurate.",
    aging: "Not reviewed recently enough to assume everything is still current.",
    legacy: "Kept on purpose for older hardware, software, or workflows.",
    "coming-soon": "Being built from the real project before it is presented as a finished guide.",
  }[key];
  return { key, label, hint, text: g.statusNote ? `${label} — ${g.statusNote}` : label };
}

// ---------- templates ----------

const catName = (slug) => CATEGORIES.find((c) => c.slug === slug).name;

function page({ title, description, path, body, jsonld, type = "website", bodyClass = "guides" }) {
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
  <body class="${escAttr(bodyClass)}">
${siteHeader(path)}
    <main id="content">
${body}
    </main>
${siteFooter()}
  </body>
</html>
`.replace(/^[ \t]+$/gm, "");
}

function statusBadge(f, label = f.label) {
  return `<span class="status status-${f.key}" title="${escAttr(f.hint)}">${esc(label)}</span>`;
}

function projectStateBadge(g) {
  const state = PROJECT_STATES[g.projectState];
  return `<span class="status project-state project-state-${g.projectState}" title="${escAttr(state.hint)}">${esc(state.label)}</span>`;
}

const WORKSHOP_STATES = {
  planning: "Planning", building: "Building", testing: "Testing", working: "Working",
  troubleshooting: "Troubleshooting", experimental: "Working / Experimental", operational: "Operational / Evolving",
  paused: "Paused", blocked: "Blocked", abandoned: "Abandoned", complete: "Complete", converted: "Converted into a guide",
};

function workshopStatus(status) {
  return `<span class="status workshop-status workshop-status-${escAttr(status)}">${esc(WORKSHOP_STATES[status])}</span>`;
}

function projectCard(project) {
  const badge = project.statusLabel ? `<span class="status workshop-status workshop-status-${escAttr(project.status)}">${esc(project.statusLabel)}</span>` : workshopStatus(project.status);
  return `<a class="workshop-project-link" href="/workshop/${project.slug}/">
    <div><p class="guide-card-meta">${badge} <span>${esc(project.phase)}</span></p><h3>${esc(project.title)}</h3><p class="guide-card-desc">${esc(project.description)}</p></div>
    <span class="workshop-open">Open project <span aria-hidden="true">↗</span></span>
  </a>`;
}

function workshopPage(projects, logs, guides) {
  const featured = projects.find((project) => project.launchGroup === "featured");
  const active = projects.filter((project) => project.launchGroup === "active");
  const established = projects.filter((project) => project.launchGroup === "established");
  const planned = projects.filter((project) => project.launchGroup === "planned");
  const shelvedItems = [
    "Geeetech A10",
    "Ender 3 v2",
    "Sculpfun S9",
    "Older printers",
    "Future SFS sensor work",
    "Future cutter work",
    "Possible conversions",
    "Other mod ideas",
  ];
  const recentLogs = [...logs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);
  const recentGuides = [...guides].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 3);
  const body = `      <section class="workshop-hero" aria-labelledby="page-title">
        <div><h1 id="page-title">The workshop.</h1><p class="hero-intro">Projects stay here as they change. Build Logs tell what happened; each project page keeps the current picture.</p></div>
        <p class="workshop-note">Making, modifying, repairing, and understanding useful things.</p>
      </section>
      ${featured ? `<section class="workshop-section" aria-labelledby="featured-project-heading"><div class="workshop-section-heading"><h2 id="featured-project-heading">Featured</h2><p>The newest and most active area of the shop.</p></div><div class="workshop-project-list">${projectCard(featured)}</div></section>` : ""}
      ${active.length ? `<section class="workshop-section" aria-labelledby="active-projects-heading"><div class="workshop-section-heading"><h2 id="active-projects-heading">Active builds</h2></div><div class="workshop-project-list">${active.map(projectCard).join("\n")}</div></section>` : ""}
      ${established.length ? `<section class="workshop-section" aria-labelledby="established-projects-heading"><div class="workshop-section-heading"><h2 id="established-projects-heading">Established machines</h2></div><div class="workshop-project-list">${established.map(projectCard).join("\n")}</div></section>` : ""}
      ${planned.length ? `<section class="workshop-section" aria-labelledby="planned-projects-heading"><div class="workshop-section-heading"><h2 id="planned-projects-heading">Planned</h2><p>Visible as a plan, not presented as an active build.</p></div><div class="workshop-project-list">${planned.map(projectCard).join("\n")}</div></section>` : ""}
      <section class="workshop-section workshop-shelf" id="on-the-shelf" aria-labelledby="shelved-projects-heading"><details><summary id="shelved-projects-heading">On the shelf <span>${shelvedItems.length} parked topics</span></summary><p>Older machines and ideas kept for reference. These are not active Workshop projects.</p><ul>${shelvedItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></details></section>
      ${recentLogs.length ? `<section class="workshop-section" aria-labelledby="recent-logs-heading"><div class="workshop-section-heading"><h2 id="recent-logs-heading">Recent Build Logs</h2><a href="/build-logs/">All Build Logs <span aria-hidden="true">↗</span></a></div><div class="workshop-activity-list">${recentLogs.map((log) => `<a href="/build-logs/${log.slug}/"><time datetime="${log.updatedAt}">${fmtDate(log.updatedAt)}</time><span>${esc(log.title)}</span><span class="activity-arrow" aria-hidden="true">↗</span></a>`).join("\n")}</div></section>` : ""}
      ${recentGuides.length ? `<section class="workshop-section" aria-labelledby="guides-heading"><div class="workshop-section-heading"><h2 id="guides-heading">Guides from the work</h2><a href="/guides/">All guides <span aria-hidden="true">↗</span></a></div><div class="workshop-guide-list">${recentGuides.map((guide) => `<a href="/guides/${guide.slug}/"><span>${esc(guide.title)}</span>${statusBadge(freshness(guide))}</a>`).join("\n")}</div></section>` : ""}`;
  return page({
    title: "Workshop — Dracars",
    description: "Current projects, workshop notes, and practical work by Cody Dracars.",
    path: "/workshop/", body, bodyClass: "workshop",
    jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dracars Workshop", url: `${SITE}/workshop/`, hasPart: projects.map((p) => ({ "@type": "CreativeWork", name: p.title, url: `${SITE}/workshop/${p.slug}/`, dateModified: p.updatedAt })) },
  });
}

function projectPage(project, allProjects, logs, guides) {
  const path = `/workshop/${project.slug}/`;
  const relatedLogs = project.relatedLogs.map((slug) => logs.find((log) => log.slug === slug)).filter(Boolean);
  const relatedGuides = (project.relatedGuides ?? []).map((slug) => guides.find((guide) => guide.slug === slug)).filter(Boolean);
  const phases = project.phases.map((phase) => {
    const [label, state] = phase.split("|").map((value) => value.trim());
    const phaseState = state || "up-next";
    return `<li class="project-phase project-phase-${escAttr(phaseState)}"${phaseState === "current" ? ' aria-current="step"' : ""}><span class="phase-marker" aria-hidden="true"></span><span>${esc(label)}</span>${phaseState === "current" ? `<span class="phase-current">Current</span>` : ""}</li>`;
  }).join("\n");
  const parent = project.parentProject ? allProjects.find((item) => item.slug === project.parentProject) : null;
  const stateBadge = project.statusLabel ? `<span class="status workshop-status workshop-status-${escAttr(project.status)}">${esc(project.statusLabel)}</span>` : workshopStatus(project.status);
  const detailSections = [
    project.phases.length ? `<section aria-labelledby="phase-heading"><h2 id="phase-heading">Project phases</h2><ol class="project-phase-list">${phases}</ol></section>` : "",
    project.focus.length ? `<section aria-labelledby="focus-heading"><h2 id="focus-heading">What this project tracks</h2><ul class="project-plain-list">${project.focus.map((item) => `<li>${inline(item, { affiliateLinks: 0 })}</li>`).join("")}</ul></section>` : "",
    project.equipment.length ? `<section aria-labelledby="equipment-heading"><h2 id="equipment-heading">Equipment and setup</h2><ul class="project-plain-list">${project.equipment.map((item) => `<li>${inline(item, { affiliateLinks: 0 })}</li>`).join("")}</ul></section>` : "",
    project.problems.length ? `<section aria-labelledby="problems-heading"><h2 id="problems-heading">Open problems</h2><ul class="project-plain-list">${project.problems.map((item) => `<li>${inline(item, { affiliateLinks: 0 })}</li>`).join("")}</ul></section>` : "",
  ].filter(Boolean).join("\n");
  const workstreams = project.workstreams.length ? `<section class="workshop-related" aria-labelledby="workstreams-heading"><h2 id="workstreams-heading">Workstreams</h2><div class="workshop-project-list">${project.workstreams.map((item) => {
    const [label, slug, state = "In scope"] = item.split("|").map((value) => value.trim());
    return slug && allProjects.some((p) => p.slug === slug) ? `<a class="workshop-project-link" href="/workshop/${escAttr(slug)}/"><div><h3>${esc(label)}</h3><p class="guide-card-desc">${esc(state)}</p></div><span class="workshop-open">Open project <span aria-hidden="true">↗</span></span></a>` : `<div class="workshop-project-link"><div><h3>${esc(label)}</h3><p class="guide-card-desc">${esc(state)}</p></div></div>`;
  }).join("")}</div></section>` : "";
  const childProjects = (project.relatedProjects ?? []).map((slug) => allProjects.find((item) => item.slug === slug)).filter(Boolean);
  const body = `      <article class="workshop-project" aria-labelledby="page-title">
        <p class="crumbs"><a href="/workshop/">Workshop</a> ${parent ? `<span aria-hidden="true">/</span> <a href="/workshop/${parent.slug}/">${esc(parent.title)}</a>` : ""} <span aria-hidden="true">/</span> Project</p>
        <header class="workshop-project-header"><div><h1 id="page-title">${esc(project.title)}</h1><p class="guide-deck">${esc(project.purpose)}</p></div><div class="workshop-project-meta">${stateBadge}<p class="workshop-updated">Status last recorded <time datetime="${project.updatedAt}">${fmtDate(project.updatedAt)}</time></p>${project.statusNote ? `<p class="workshop-updated">${esc(project.statusNote)}</p>` : ""}</div></header>
        <section class="project-current" aria-labelledby="current-state-heading"><div><h2 id="current-state-heading">Current state</h2><p>${esc(project.description)}</p><p class="project-next"><strong>Next action</strong>${esc(project.nextAction)}</p></div><div class="project-current-phase"><span>Current phase</span><strong>${esc(project.phase)}</strong></div></section>
        ${detailSections ? `<div class="project-detail-grid">${detailSections}</div>` : ""}
        ${project.html ? `<section class="project-context" aria-labelledby="project-context-heading"><h2 id="project-context-heading">Project notes</h2><div class="guide-body">${project.html}</div></section>` : ""}
        ${workstreams}
        ${childProjects.length ? `<section class="workshop-related" aria-labelledby="related-projects-heading"><h2 id="related-projects-heading">Related projects</h2><div class="workshop-project-list">${childProjects.map(projectCard).join("")}</div></section>` : ""}
        ${relatedLogs.length ? `<section class="workshop-related" aria-labelledby="project-logs-heading"><div class="workshop-section-heading"><h2 id="project-logs-heading">Build Logs</h2><p>The dated story behind this current picture.</p></div><div class="workshop-activity-list">${relatedLogs.map((log) => `<a href="/build-logs/${log.slug}/"><time datetime="${log.updatedAt}">${fmtDate(log.updatedAt)}</time><span>${esc(log.title)}</span><span class="activity-arrow" aria-hidden="true">↗</span></a>`).join("\n")}</div></section>` : ""}
        ${relatedGuides.length ? `<section class="workshop-related" aria-labelledby="project-guides-heading"><h2 id="project-guides-heading">Guides from this project</h2><div class="workshop-guide-list">${relatedGuides.map((guide) => `<a href="/guides/${guide.slug}/"><span>${esc(guide.title)}</span>${statusBadge(freshness(guide))}</a>`).join("\n")}</div></section>` : ""}
      </article>`;
  return page({ title: `${project.title} — Dracars Workshop`, description: project.description, path, body, bodyClass: "workshop", jsonld: { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, dateModified: project.updatedAt, url: SITE + path, author: { "@type": "Person", name: "Cody Dracars", url: SITE + "/" } } });
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

function articlePage(g, all) {
  const f = freshness(g);
  const sectionPath = "/guides/";
  const articlePath = `${sectionPath}${g.slug}/`;
  const contents = [...g.html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)]
    .map(([, id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("");
  const related = g.relatedGuides.map((slug) => all.find((item) => item.slug === slug));
  const tools = g.relatedTools.map((item) => {
    const [name, url] = item.split("|").map((part) => part.trim());
    return `<li><a href="${escAttr(url)}" rel="noopener" target="_blank">${esc(name)}</a></li>`;
  });
  const articleMeta = `<div class="guide-meta">
          <span>By ${esc(g.author)}</span>
          <span>Updated <time datetime="${g.updatedAt}">${fmtDate(g.updatedAt)}</time></span>
          <span>${statusBadge(f)}${g.statusNote ? ` <span class="status-note">${esc(g.statusNote)}</span>` : ""}</span>
        </div>`;
  const articleDetails = `<div class="guide-details">
          ${contents ? `<details class="guide-contents"><summary>On this page</summary><nav aria-label="On this page"><ul>${contents}</ul></nav></details>` : ""}
          <details class="guide-equipment"><summary>Equipment &amp; guide details</summary><p>Published <time datetime="${g.publishedAt}">${fmtDate(g.publishedAt)}</time></p><p>Used for this guide:</p><ul>${g.testedWith.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></details>
        </div>`;
  const body = `      <article class="guide">
        <p class="crumbs"><a href="${sectionPath}">Guides</a> <span aria-hidden="true">/</span> ${esc(catName(g.category))}</p>
        <h1>${esc(g.title)}</h1>
        <p class="guide-deck">${esc(g.description)}</p>
        ${articleMeta}
        ${articleDetails}
${g.affiliateLinksPresent ? `        <p class="disclosure">${esc(AFFILIATE_DISCLOSURE)}</p>\n` : ""}        <div class="guide-body">
${g.html}
        </div>
${tools.length ? `        <section class="guide-related"><h2 id="related-tools">Related Dracars tools</h2><ul>${tools.join("")}</ul></section>\n` : ""}${related.length ? `        <section class="guide-related"><h2 id="related-guides">Related Dracars guides</h2><ul>${related.map((item) => `<li><a href="/guides/${item.slug}/">${esc(item.title)}</a></li>`).join("")}</ul></section>\n` : ""}      </article>`;

  return page({
    title: `${g.title} — Dracars Guides`,
    description: g.description,
    path: articlePath,
    type: "article",
    body,
    bodyClass: "guides",
    jsonld: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: g.title,
      description: g.description,
      datePublished: g.publishedAt,
      dateModified: g.updatedAt,
      author: { "@type": "Person", name: g.author, url: SITE + "/" },
      mainEntityOfPage: `${SITE}${articlePath}`,
      keywords: g.tags.join(", "),
      ...(g.heroImage ? { image: SITE + g.heroImage } : {}),
    },
  });
}

function buildLogStory(html) {
  const datedHeading = /<h3 id="(update-(\d{4}-\d{2}-\d{2})-[^"]+)">([\s\S]*?)<\/h3>/g;
  const updates = [...html.matchAll(datedHeading)];
  if (!updates.length) return html;

  let output = "";
  let cursor = 0;
  for (const update of updates) {
    const start = update.index;
    if (start < cursor) continue;
    const headingEnd = start + update[0].length;
    const nextBoundary = /<h2 id="|<h3 id="update-\d{4}-\d{2}-\d{2}-/g;
    nextBoundary.lastIndex = headingEnd;
    const boundary = nextBoundary.exec(html);
    const end = boundary ? boundary.index : html.length;
    const [, id, date] = update;
    const title = update[3].replace(/^Update,\s*\d{4}-\d{2}-\d{2}:\s*/, "");

    output += html.slice(cursor, start);
    output += `<section class="build-log-update" aria-labelledby="${escAttr(id)}">
      <div class="build-log-update-stamp"><time datetime="${date}">${fmtDate(date)}</time><span>Update</span></div>
      <div class="build-log-update-content"><h3 id="${escAttr(id)}">${title}</h3>${html.slice(headingEnd, end)}</div>
    </section>`;
    cursor = end;
  }
  return output + html.slice(cursor);
}

function buildLogPage(g, all) {
  const articlePath = `/build-logs/${g.slug}/`;
  const projectHref = g.project ? `/workshop/${g.project}/` : "/workshop/";
  const intro = g.html.match(/<aside class="callout callout-tldr"[\s\S]*?<\/aside>/)?.[0] ?? "";
  const story = buildLogStory(intro ? g.html.replace(intro, "") : g.html);
  const contents = [...story.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>|<h3 id="(update-\d{4}-\d{2}-\d{2}-[^"]+)">([\s\S]*?)<\/h3>/g)]
    .map(([, h2Id, h2Label, updateId, updateLabel]) => `<li><a href="#${escAttr(h2Id ?? updateId)}">${h2Label ?? updateLabel}</a></li>`)
    .join("");
  const related = g.relatedGuides.map((slug) => all.find((item) => item.slug === slug)).filter(Boolean);
  const tools = g.relatedTools.map((item) => {
    const [name, url] = item.split("|").map((part) => part.trim());
    return `<li><a href="${escAttr(url)}" rel="noopener" target="_blank">${esc(name)}</a></li>`;
  });
  const snapshot = `<section class="build-log-snapshot" aria-labelledby="checkpoint-title">
      <div class="build-log-checkpoint">
        <p class="build-log-side-label" id="checkpoint-title">Current checkpoint</p>
        ${projectStateBadge(g)}
        ${g.statusNote ? `<p class="build-log-status-note">${esc(g.statusNote)}</p>` : ""}
        <dl class="build-log-dates"><div><dt>Started</dt><dd><time datetime="${g.publishedAt}">${fmtDate(g.publishedAt)}</time></dd></div><div><dt>Updated</dt><dd><time datetime="${g.updatedAt}">${fmtDate(g.updatedAt)}</time></dd></div></dl>
      </div>
      ${intro ? `<div class="build-log-current">${intro}</div>` : ""}
    </section>`;
  const navigation = contents ? `<details class="build-log-index">
      <summary>Jump to a section</summary>
      <nav aria-label="In this log"><ul>${contents}</ul></nav>
    </details>` : "";
  const body = `      <article class="build-log">
        <header class="build-log-masthead">
          <p class="crumbs"><a href="/build-logs/">Build Logs</a> <span aria-hidden="true">/</span> <a href="${projectHref}">${g.project ? "Project" : "Workshop"}</a></p>
          <p class="build-log-kicker">Project journal <span aria-hidden="true">·</span> ${esc(catName(g.category))}</p>
          <h1>${esc(g.title)}</h1>
        <p class="guide-deck">${esc(g.description)}</p>
        <p class="build-log-project-link">This is the dated story. <a href="${projectHref}">${g.project ? "See the project's current picture" : "Browse Workshop projects"} <span aria-hidden="true">↗</span></a></p>
        </header>
        ${snapshot}
        ${g.affiliateLinksPresent ? `        <p class="disclosure">${esc(AFFILIATE_DISCLOSURE)}</p>\n` : ""}
        ${navigation}
        <div class="build-log-layout">
          <div class="build-log-story">
            <div class="build-log-body">${story}</div>
            ${tools.length ? `<section class="guide-related"><h2 id="related-tools">Related Dracars tools</h2><ul>${tools.join("")}</ul></section>\n` : ""}${related.length ? `<section class="guide-related"><h2 id="related-guides">Related Dracars guides</h2><ul>${related.map((item) => `<li><a href="/guides/${item.slug}/">${esc(item.title)}</a></li>`).join("")}</ul></section>\n` : ""}
          </div>
        </div>
      </article>`;

  return page({
    title: `${g.title} — Dracars Build Logs`,
    description: g.description,
    path: articlePath,
    type: "article",
    body,
    bodyClass: "build-logs-site",
    jsonld: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: g.title,
      description: g.description,
      datePublished: g.publishedAt,
      dateModified: g.updatedAt,
      author: { "@type": "Person", name: g.author, url: SITE + "/" },
      mainEntityOfPage: `${SITE}${articlePath}`,
      keywords: g.tags.join(", "),
      ...(g.heroImage ? { image: SITE + g.heroImage } : {}),
    },
  });
}

const guidePage = (g, all) => articlePage(g, all);

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

function buildLogIndexPage(logs) {
  const byUpdated = [...logs].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const cards = byUpdated.map((g) => {
    return `<a class="guide-card${g.indexImage ? " guide-card-with-image" : ""}" href="/build-logs/${g.slug}/">${g.indexImage ? `
  <img class="guide-card-image" src="${escAttr(g.indexImage)}" alt="" loading="lazy" />` : ""}
  <div class="guide-card-content">
  <p class="guide-card-meta"><span>${esc(catName(g.category))}</span> ${projectStateBadge(g)}</p>
  <h3>${esc(g.title)}</h3>
  <p class="guide-card-desc">${esc(g.description)}</p>
  <p class="guide-card-updated">Updated <time datetime="${g.updatedAt}">${fmtDate(g.updatedAt)}</time></p>
  </div>
</a>`;
  }).join("\n");
  const body = `      <section class="guides-hero" aria-labelledby="page-title">
        <h1 id="page-title">Build Logs.</h1>
        <p class="hero-intro">The real work behind the guides: experiments, unfinished setups, mistakes, fixes, and what changes after the gear gets used.</p>
      </section>

      <section aria-labelledby="logs-h" class="all-guides">
        <h2 id="logs-h" class="section-label">Project status</h2>
        <div class="guide-grid">${cards}</div>
      </section>`;
  return page({
    title: "Build Logs — Dracars",
    description: "Real workshop build logs from Cody Dracars, including experiments, mistakes, fixes, and the guides that come out of them.",
    path: "/build-logs/",
    body,
    jsonld: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dracars Build Logs", url: `${SITE}/build-logs/`, hasPart: logs.map((g) => ({ "@type": "BlogPosting", headline: g.title, url: `${SITE}/build-logs/${g.slug}/`, dateModified: g.updatedAt })) },
  });
}

// ---------- build ----------

const guides = loadGuides();
const buildLogs = loadBuildLogs();
const projects = loadProjects();
const allProjects = projects;
const projectSlugs = new Set(allProjects.map((project) => project.slug));
if (projects.filter((project) => project.launchGroup === "featured").length !== 1) fail("exactly one Workshop project must use launchGroup: featured");
for (const project of projects) {
  if (project.parentProject && !projectSlugs.has(project.parentProject)) fail(`${project.file}: parentProject references unknown Workshop slug "${project.parentProject}"`);
  for (const slug of project.relatedProjects) if (!projectSlugs.has(slug)) fail(`${project.file}: relatedProjects references unknown slug "${slug}"`);
  for (const slug of project.relatedLogs) if (!buildLogs.some((log) => log.slug === slug)) fail(`${project.file}: relatedLogs references unknown slug "${slug}"`);
  for (const slug of project.relatedGuides) if (!guides.some((guide) => guide.slug === slug)) fail(`${project.file}: relatedGuides references unknown slug "${slug}"`);
}
for (const log of buildLogs) {
  log.project = projects.find((project) => project.relatedLogs.includes(log.slug))?.slug ?? null;
}

// Keep the homepage's managed chrome blocks in sync with guide templates.
const homePath = join(PUBLIC, "index.html");
let home = readFileSync(homePath, "utf8");
for (const [name, markup] of [["header", siteHeader("/")], ["footer", siteFooter()]]) {
  const start = `    <!-- site-${name}:start -->`;
  const end = `    <!-- site-${name}:end -->`;
  const from = home.indexOf(start);
  const to = home.indexOf(end);
  if (from < 0 || to < from) fail(`homepage missing managed site-${name} markers`);
  home = home.slice(0, from) + start + "\n" + markup + "\n" + home.slice(to);
}
writeFileSync(homePath, home);
const featuredProject = projects.find((project) => project.launchGroup === "featured");
const homeWorkshop = `      <section class="home-workshop" id="workshop-home" aria-labelledby="home-workshop-heading">
        <div class="home-workshop-heading"><p class="home-workshop-label">Workshop preview</p><h2 id="home-workshop-heading">${esc(featuredProject.title)}</h2><p>A quick look at the resin setup. The Workshop holds the full project list and the changing details.</p></div>
        <div class="home-workshop-meta"><span class="home-project-status">${esc(featuredProject.statusLabel ?? WORKSHOP_STATES[featuredProject.status])}</span><a href="/workshop/${featuredProject.slug}/">View Resin Workshop <span aria-hidden="true">↗</span></a></div>
      </section>`;
const homeStart = "      <!-- home-workshop:start -->";
const homeEnd = "      <!-- home-workshop:end -->";
const homeFrom = home.indexOf(homeStart);
const homeTo = home.indexOf(homeEnd);
if (homeFrom < 0 || homeTo < homeFrom) fail("homepage missing managed home-workshop markers");
home = home.slice(0, homeFrom) + homeStart + "\n" + homeWorkshop + "\n" + homeEnd + home.slice(homeTo + homeEnd.length);
home = home.replace(/<a class="text-link"[^>]*>[\s\S]*?<\/a>/, '<a class="text-link" href="/workshop/">Explore the Workshop <span aria-hidden="true">↗</span></a>');
writeFileSync(homePath, home);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "index.html"), indexPage(guides));
for (const g of guides) {
  mkdirSync(join(OUT, g.slug), { recursive: true });
  writeFileSync(join(OUT, g.slug, "index.html"), guidePage(g, guides));
}
rmSync(BUILD_LOG_OUT, { recursive: true, force: true });
mkdirSync(BUILD_LOG_OUT, { recursive: true });
writeFileSync(join(BUILD_LOG_OUT, "index.html"), buildLogIndexPage(buildLogs));
for (const g of buildLogs) {
  mkdirSync(join(BUILD_LOG_OUT, g.slug), { recursive: true });
  writeFileSync(join(BUILD_LOG_OUT, g.slug, "index.html"), buildLogPage(g, buildLogs));
}
rmSync(PROJECT_OUT, { recursive: true, force: true });
mkdirSync(PROJECT_OUT, { recursive: true });
writeFileSync(join(PROJECT_OUT, "index.html"), workshopPage(allProjects, buildLogs, guides));
for (const project of allProjects) {
  mkdirSync(join(PROJECT_OUT, project.slug), { recursive: true });
  writeFileSync(join(PROJECT_OUT, project.slug, "index.html"), projectPage(project, allProjects, buildLogs, guides));
}

const urls = [
  { loc: `${SITE}/` },
  { loc: `${SITE}/guides/`, lastmod: guides.map((g) => g.updatedAt).sort().at(-1) },
  ...guides.map((g) => ({ loc: `${SITE}/guides/${g.slug}/`, lastmod: g.updatedAt })),
  { loc: `${SITE}/build-logs/`, lastmod: buildLogs.map((g) => g.updatedAt).sort().at(-1) },
  ...buildLogs.map((g) => ({ loc: `${SITE}/build-logs/${g.slug}/`, lastmod: g.updatedAt })),
  { loc: `${SITE}/workshop/`, lastmod: allProjects.map((p) => p.updatedAt).sort().at(-1) },
  ...allProjects.map((p) => ({ loc: `${SITE}/workshop/${p.slug}/`, lastmod: p.updatedAt })),
];
writeFileSync(
  join(PUBLIC, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`)
    .join("\n")}\n</urlset>\n`,
);

console.log(`Built ${guides.length} guide(s):`);
for (const g of guides) console.log(`  /guides/${g.slug}/  [${freshness(g).label}]${g.affiliateLinksPresent ? " (affiliate)" : ""}`);
console.log(`Built ${buildLogs.length} build log(s):`);
for (const g of buildLogs) console.log(`  /build-logs/${g.slug}/  [${freshness(g).label}]`);
console.log(`Built ${allProjects.length} Workshop project(s):`);
for (const project of allProjects) console.log(`  /workshop/${project.slug}/  [${WORKSHOP_STATES[project.status]}]`);
