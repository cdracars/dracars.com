# dracars.com

The personal home of Cody Dracars: a small, durable directory for free tools,
open-source projects, and optional support links.

## Initial scope

- Introduce Cody and link to `cdracars` on GitHub.
- Feature the Task Prioritizer and Stitch Counter.
- Provide a voluntary Ko-fi support link for anyone who wants to help maintain
  the work.
- Deploy as a static site using Cloudflare Workers Static Assets.

The site intentionally has no accounts, tracking-heavy features, paywalls, or
gated downloads. Its purpose is to help people find useful free tools and
support their upkeep if they choose.

## Project structure

```text
public/index.html   The public landing page
public/styles.css   Responsive visual system and interaction styles
PRODUCT.md          Durable site purpose and constraints
DESIGN.md           Approved visual direction
wrangler.jsonc      Cloudflare Workers Static Assets configuration
```

## Cloudflare Workers deployment

This site uses Cloudflare Workers Static Assets—the current deployment model
for a new static site. There is no Worker script or server-side code.

1. In Cloudflare, go to **Workers & Pages** and choose **Continue with GitHub**.
2. Select this repository. Keep the generated `npx wrangler deploy` command;
   `wrangler.jsonc` tells it to deploy the contents of `public/` as static assets.
3. Deploy the Worker, then add `dracars.com` and `www.dracars.com` as custom
   domains for it.

Cloudflare will issue HTTPS certificates after the custom domains are attached.

## Included links

- [Task Prioritizer](https://task-prioritizer.dracars.com/)
- [Stitch Shaper](https://stitch-shaper.dracars.com/)
- [Local Screen Recorder](https://screen-recorder.dracars.com/)
- [Ko-fi support](https://ko-fi.com/cdracars66494)

## Support

If the site or one of its projects is useful to you, you can support its
continued upkeep on [Ko-fi](https://ko-fi.com/cdracars66494).
