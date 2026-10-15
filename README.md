# dracars.com

The personal home of Cody Dracars: current projects, Build Logs, practical
guides, software, and maker tools made to be useful.

## What it is

Dracars Workshop is the long-term home for Cody's practical projects. Project
pages describe the current state; Build Logs keep the dated story. Guides and
tools make useful results easier to find and use. The site is deliberately
small: no accounts, tracking-heavy features, or gated downloads. Its current
tools and projects are free to use, with optional support through Ko-fi.

## Licensing

This repository does not have one blanket license. The root [LICENSE](LICENSE)
explains the scope: MIT covers only the original code and configuration listed
in [LICENSE-SCOPE.md](LICENSE-SCOPE.md), under
[LICENSE-MIT-CODE.md](LICENSE-MIT-CODE.md). Guides, build logs, photos, and
Dracars brand assets are reserved; see [CONTENT-RIGHTS.md](CONTENT-RIGHTS.md).
Third-party material remains subject to its owner's terms. Adding a store or
affiliate links does not change these boundaries.

## Project structure

```text
public/index.html   The public landing page (managed header/footer blocks are generated)
public/styles.css   Responsive visual system and interaction styles
public/theme.js     Light/dark theme toggle
content/guides/     Guide sources
content/build-logs/ Build Log sources
content/projects/   Persistent Workshop project records
content/resources/  Resource page sources
public/guides/, public/build-logs/, public/workshop/, public/resources/,
public/404.html, public/sitemap.xml
                    Generated output; rebuild instead of editing
scripts/build-guides.mjs     Site builder (guides, logs, projects, resources, sitemap)
scripts/figures.mjs          Registered guide figures
scripts/site-chrome.mjs      Shared header, GitHub corner, and footer markup
scripts/check-site-chrome.mjs Verifies generated pages carry current shared chrome
PRODUCT.md          Durable site purpose and constraints
DESIGN.md           Approved visual direction
BUILD-LOGS.md       Evidence, voice, image, and update guidance for project journals
ROADMAP.md           12-month goals, milestones, and current status
BUILD-LOG-BACKLOG.md Candidate project logs and fact-checking notes
wrangler.jsonc      Cloudflare Workers Static Assets configuration
```

Use [ROADMAP.md](ROADMAP.md) to track business and publishing milestones. It is
planning documentation; current public offerings and product constraints are
defined by the site and [PRODUCT.md](PRODUCT.md).
Use [BUILD-LOG-BACKLOG.md](BUILD-LOG-BACKLOG.md) to track possible project logs
and the details to confirm before drafting or publishing them.

## Guides

Guides live in `content/guides/<slug>.md`, Build Logs in
`content/build-logs/<slug>.md`, and Workshop project records in
`content/projects/<slug>.md` (frontmatter + Markdown). They build to static
HTML under `public/` with a dependency-free script:

```sh
node scripts/build-guides.mjs
```

Commit the generated `public/guides/`, `public/build-logs/`, `public/workshop/`,
`public/resources/`, `public/404.html`, and `public/sitemap.xml` along with the
source, then run `node scripts/check-site-chrome.mjs`. The same build refreshes the managed header/footer blocks in
`public/index.html`; include that file when shared chrome changes. Edit shared
markup in `scripts/site-chrome.mjs` and styling in `public/styles.css`, rather
than editing the homepage's `site-header` / `site-footer` comment blocks.
Homepage content and metadata remain directly editable in `public/index.html`.

The build fails if a guide is missing required metadata or a `:::tldr`
block, contains an unfinished placeholder, or if `affiliateLinksPresent`
doesn't match the body. Mark an affiliate link with `[text](url "affiliate")`;
that adds `rel="sponsored"` and turns on the disclosure. Freshness is computed
from `updatedAt` at build time (Aging after 180 days; `status: legacy` overrides),
so rebuild when you deploy. Set `draft: true` to keep a guide unpublished.

The resin-workspace project lives at `/workshop/saturn-4-ultra/`; its dated
Build Log lives at `/build-logs/resin-grow-tent-setup/`.
Its future reference guide lives at `/guides/resin-grow-tent-setup/` and is
intentionally marked Coming Soon until the workspace has been used and tested.
`public/_redirects` preserves the former `/guides/saturn-4-ultra-setup/` URL
with a permanent redirect for Workers Static Assets. Keep that file when deploying.

When adding product links, researching affiliate programs, or replacing links
after approval, use [AFFILIATE-PROGRAMS.md](AFFILIATE-PROGRAMS.md) for the current
program status, product inventory, and next steps.

## Cloudflare Workers deployment

This site uses Cloudflare Workers Static Assets—the current deployment model
for a new static site. There is no Worker script or server-side code.

1. In Cloudflare, go to **Workers & Pages** and choose **Continue with GitHub**.
2. Select this repository. Keep the generated `npx wrangler deploy` command;
   `wrangler.jsonc` tells it to deploy the contents of `public/` as static assets.
3. Deploy the Worker, then add `dracars.com` and `www.dracars.com` as custom
   domains for it.

Cloudflare will issue HTTPS certificates after the custom domains are attached.

## Search and social previews

The homepage title and description live in `public/index.html`; the build copies
them into its Open Graph/Twitter tags and uses the featured Workshop project's
PNG/JPEG for the homepage preview, falling back to the branded image for other
formats. Generated project pages use their
`featuredImage`; guides and build logs use `heroImage` or `indexImage` when it is
a PNG or JPEG. Pages without a supported image use the branded fallback,
`public/social-preview.png` (1200 × 630). When a PNG/JPEG project image has a
same-named `.webp` beside it, pages display the WebP and keep the original for
social previews.
Card-sized images (Workshop and Build Log indexes, homepage lists) use a
same-named `-thumb.webp` (800px wide) when one exists, and the builder adds
width/height from the image file so pages do not shift while loading. Fonts are
self-hosted from `public/fonts/`; no third-party font requests are made. Guide and build log titles,
descriptions, and image fields come from their content frontmatter. Run
`node scripts/build-guides.mjs` after changing those sources so the published
HTML stays in sync. The build publishes a content-hashed filename for the
fallback image so social platforms receive a new image URL whenever the artwork
changes. Social platforms may cache previews; they pick up deployed metadata
and images when they re-fetch the page.

The homepage has `WebSite`, `Person`, and project `ItemList` structured data.
Its four Dracars-hosted browser tools use
[`WebApplication`](https://schema.org/WebApplication), a subtype of
`SoftwareApplication`, with descriptions matching the visible project list.
Guides use `CollectionPage` and `TechArticle`. Keep this data factual; don't add
unverified ratings or reviews just to qualify for a search feature.

`public/robots.txt` permits crawling and advertises the generated
`https://dracars.com/sitemap.xml`. The sitemap lists this deployment's canonical
pages only and excludes drafts and redirected URLs. Rebuild before deployment.
The tool subdomains are separate deployments; their HTML, robots files, and
sitemaps must be maintained in their own repositories.

After deployment, use Google Search Console to verify submission and indexing:

1. Select or verify the `dracars.com` **Domain property** using DNS verification.
   A Domain property covers its subdomains too.
2. Open **Sitemaps**, submit `https://dracars.com/sitemap.xml` if absent, and check
   the status and last-read date.
3. For Task Prioritizer, Stitch Shaper, Local Screen Recorder, and TunePrint,
   verify that each deployed app has unique metadata, software schema, and a
   sitemap of its own canonical pages. Check that each sitemap returns XML
   rather than an app's HTML fallback, and advertise it in that host's robots.txt.
   Submit each verified sitemap URL in the Domain property's Sitemaps report.
4. Use **URL Inspection** on the homepage and each tool URL to check Google's
   selected canonical and indexing status; request indexing when appropriate.

A robots.txt sitemap directive enables discovery; it is not proof of a Search
Console submission. Submission and indexing status require authenticated Search
Console access and are not verified by a local build. Sitemaps help discovery
but do not guarantee indexing. If consolidating multiple hosts into one sitemap
later, follow Google's cross-site verification requirements first.

References: [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
and [Search Console property scope](https://support.google.com/webmasters/answer/34592).

## Projects

- [Task Prioritizer](https://task-prioritizer.dracars.com/)
- [Stitch Shaper](https://stitch-shaper.dracars.com/)
- [Local Screen Recorder](https://screen-recorder.dracars.com/)
- [TunePrint](https://tuneprint.dracars.com/)
- [Voron Mod Hub](https://cdracars.github.io/voron-mod-hub/)
- [Book Scanner Copy Stand](https://github.com/cdracars/book-scanner-copy-stand) — maintained build; [original design by caj](https://www.thingiverse.com/thing:2466704)
- [STL to STEP for FreeCAD](https://github.com/cdracars/stl2step-freecad/releases)
- [STL to STEP for Fusion 360](https://github.com/cdracars/stl2step-fusion/releases)
- [SafeSync](https://github.com/cdracars/SafeSync)

## Support

If the site or one of its projects is useful to you, you can support its
continued upkeep on [Ko-fi](https://ko-fi.com/cdracars66494).

## License

See [Licensing](#licensing): MIT covers only the code and configuration listed in
[LICENSE-SCOPE.md](LICENSE-SCOPE.md); content and brand assets are reserved.
