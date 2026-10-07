# dracars.com

The personal home of Cody Dracars: software, maker tools, and open projects
made to be useful.

## What it is

This is the directory for Cody's browser tools, open-source projects, and
practical work around 3D printers and the systems that make them better. The
site is deliberately small: no accounts, tracking-heavy features, or gated
downloads. Its current tools and projects are free to use, with optional
support through Ko-fi.

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

[MIT](LICENSE)
