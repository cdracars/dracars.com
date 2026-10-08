// Reusable figures for guides. In a guide, put `!figure <name>` on its own line.
// Markup uses classes only (the site CSP forbids inline style attributes); colors live in styles.css.

const arrow = `<svg class="flow-arrow" aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M5 12h13m-5-5 5 5-5 5" /></svg>`;

// steps: [label, kind?, tag?]  kind: "dirty" | "clean" | "end"
const flow = (steps, label) => {
  const items = steps
    .map(([text, kind, tag], i) => `<li class="flow-step${kind ? ` flow-${kind}` : ""}"><div class="flow-card"><span class="flow-num" aria-hidden="true">${i + 1}</span><span class="flow-label">${text}</span>${tag ? `<span class="flow-tag">${tag}</span>` : ""}</div>${i < steps.length - 1 ? arrow : ""}</li>`)
    .join("");
  return `<figure class="figure figure-flow"><ol class="flow" aria-label="${label}">${items}</ol></figure>`;
};

export const FIGURES = {
  "floor-layers": `<figure class="figure">
<svg class="figure-svg" viewBox="0 0 480 290" role="img" aria-labelledby="fl-t fl-d">
  <title id="fl-t">Floor protection cross-section</title>
  <desc id="fl-d">From the top down: a silicone mat or tray with raised edges, the desk, then two layers of plastic and finally the tent floor. The desk stands on the plastic.</desc>
  <defs>
    <pattern id="fl-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line class="fig-hatch" x1="0" y1="0" x2="0" y2="9" />
    </pattern>
  </defs>
  <ellipse class="fig-shadow" cx="240" cy="203" rx="205" ry="5" />
  <rect class="fig-lip" x="36" y="14" width="12" height="40" rx="4" />
  <rect class="fig-lip" x="432" y="14" width="12" height="40" rx="4" />
  <rect class="fig-tray" x="46" y="26" width="388" height="28" />
  <text class="fig-text fig-text-on-accent" x="240" y="45" text-anchor="middle">Silicone mat or tray</text>
  <rect class="fig-desk" x="30" y="58" width="420" height="40" rx="6" />
  <rect class="fig-desk-edge" x="30" y="58" width="420" height="5" rx="2.5" />
  <text class="fig-text" x="240" y="86" text-anchor="middle">Desk / work area</text>
  <path class="fig-leg" d="M66 98h18l-3 56H69z" />
  <path class="fig-leg" d="M396 98h18l-3 56h-12z" />
  <rect class="fig-plastic fig-plastic-2" x="30" y="154" width="420" height="22" rx="3" />
  <text class="fig-text" x="240" y="170" text-anchor="middle">Plastic layer 2</text>
  <rect class="fig-plastic fig-plastic-1" x="30" y="178" width="420" height="22" rx="3" />
  <text class="fig-text" x="240" y="194" text-anchor="middle">Plastic layer 1</text>
  <rect class="fig-floor" x="30" y="204" width="420" height="46" rx="6" />
  <rect class="fig-floor-tex" x="30" y="204" width="420" height="46" rx="6" />
  <text class="fig-text fig-text-on-floor" x="240" y="233" text-anchor="middle">Tent floor</text>
</svg>
<figcaption>Not to scale. The two plastic layers (about 3.5 mil each) are the replaceable barrier; the raised-edge tray catches spills in the wet zone.</figcaption>
</figure>`,

  "post-process-flow": flow(
    [
      ["Print"],
      ["Drip"],
      ["Dirty wash", "dirty", "dirty"],
      ["Clean wash", "clean", "clean"],
      ["Dry completely"],
      ["Cure"],
      ["Finished part", "end"],
    ],
    "Post-processing order",
  ),
};
