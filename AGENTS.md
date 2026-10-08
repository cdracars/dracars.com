# Repository guidance

## Read for the task

- For site content, features, or positioning, read [PRODUCT.md](PRODUCT.md) for purpose, voice, and product constraints.
- For layout, styling, or interaction changes, read [DESIGN.md](DESIGN.md) for the approved visual direction.
- For guide authoring, builds, or deployment, read [README.md](README.md) for the workflow. Use `wrangler.jsonc` as the deployment source of truth; older Cloudflare Pages references in product documentation do not describe the current Workers Static Assets setup.
- When adding product links, researching affiliate programs, or replacing links after approval, read [AFFILIATE-PROGRAMS.md](AFFILIATE-PROGRAMS.md) for current status and next steps. Record changes to program status and the link inventory there.

## Editing the site

- Preserve the plain static HTML/CSS and small JavaScript enhancement approach. Keep core content and navigation usable without JavaScript.
- Edit published guide content in `content/guides/`. Change guide templates and rendering in `scripts/build-guides.mjs`, and registered figures in `scripts/figures.mjs`. Regenerate `public/guides/` and `public/sitemap.xml` instead of editing those outputs directly.
- The guide builder supports a limited Markdown/frontmatter dialect. Check its parser and an existing source guide before introducing new syntax; inspect the rendered result because a successful build does not guarantee the syntax rendered as intended.
- Keep guide claims tied to recorded experience and evidence. Confirm missing equipment details, test results, or first-person experiences with Cody before presenting them as fact. Use the documented draft workflow for unfinished guides.

## Verify the change

- For guide content, builder, or figure changes, run `node scripts/build-guides.mjs` from the repository root. Review the generated diff and include affected generated files with the source changes; follow the README's rebuild requirement before deployment.
- For visible changes, inspect affected pages at mobile and desktop widths in light and dark themes. Check keyboard access, visible focus, and changed links or controls.
- For documentation-only changes, check referenced paths and instructions against the repository; a site rebuild is unnecessary.
- Report what changed, which checks ran, and any checks that could not be completed. Distinguish local verification from a verified deployment.
