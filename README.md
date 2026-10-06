# dracars.com

The personal home of Cody Dracars: a small, durable directory for free tools,
open-source projects, and optional support links.

## Initial scope

- Introduce Cody and link to `cdracars` on GitHub.
- Feature the Task Prioritizer and Stitch Counter.
- Provide a voluntary Ko-fi support link once the destination URL is confirmed.
- Deploy as a static site on Cloudflare Pages.

The site intentionally has no accounts, tracking-heavy features, paywalls, or
gated downloads. Its purpose is to help people find useful free tools and
support their upkeep if they choose.

## Project structure

```text
index.html          The public landing page
styles.css          Responsive visual system and interaction styles
PRODUCT.md          Durable site purpose and constraints
DESIGN.md           Approved visual direction
```

## Cloudflare Pages deployment

1. Create a Cloudflare Pages project and connect this GitHub repository.
2. Select **no framework** and leave the build command empty.
3. Set the output directory to `/`.
4. In the Pages project, add `dracars.com` and `www.dracars.com` under
   **Custom domains**.
5. In IONOS, replace the retired Linode nameservers with the two nameservers
   Cloudflare assigns to the zone.

Cloudflare will issue HTTPS certificates after DNS activation.

## Included links

- [Task Prioritizer](https://task-prioritizer-one.vercel.app)
- [Stitch Shaper source](https://github.com/cdracars/stich-shaper)
- [Local Screen Recorder](https://cdracars.github.io/local-screen-recorder/)
- [Ko-fi support](https://ko-fi.com/cdracars66494)
