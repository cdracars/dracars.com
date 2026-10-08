# Affiliate programs and product links

Last checked: October 7, 2026.

Working memory for Cody and future site work. This file stays outside `public/`;
it is repository documentation, not a page on Dracars.com.

## Current goal

Publish useful guides with ordinary product links first. Apply to relevant
affiliate programs later, then replace links where approved. Real guides give
programs examples to review; there is no assumed universal article count or
approval guarantee.

The recommendation determines the link. Keep “What I used” separate from
“What I recommend,” and keep each guide useful without purchases. Prefer one
natural product link in the equipment section over repeated sales prompts.

## Program tracker

No applications, approvals, affiliate IDs, or tracking links are recorded yet.
“Candidate” means researched for future consideration, not an active partnership.

| Program | Status | Verified entry point | Next action |
| --- | --- | --- | --- |
| ELEGOO | Candidate; no application recorded | [US affiliate program](https://us.elegoo.com/pages/elegoo-affiliate-impact-awin) | Publish the Saturn guide; when ready, follow the official application link and confirm US-store coverage. |
| AC Infinity | Candidate; eligibility unconfirmed | [Become an affiliate](https://acinfinity.com/pages/company/become-an-affiliate.html) | Confirm audience eligibility and whether resin-workspace content fits the program. |

### ELEGOO notes

The US program page welcomes websites and content creators and currently links
to Impact for signup. Its copy still mentions ShareASale; use the current signup
destination instead of assuming older network names are accurate.
An [Awin merchant listing](https://ui.awin.com/merchant-profile/61127) also exists
and lists the US storefront. Record the actual approved network before generating
links. The published contact is `affiliate@elegoo.com`.

### AC Infinity notes

The official page currently lists 1,000 followers for its Affiliate tier and
emphasizes indoor-growing creators. Cody's audience size and eligibility have
not been established here. A grow tent used for resin printing does not imply
program approval or manufacturer endorsement of that use.

Recheck terms when applying. Record the approved commission, attribution window,
eligible storefronts, and restrictions then; advertised terms may change.

## Product link inventory

Both entries are ordinary, non-affiliate links in the **What I used** section of
[`content/guides/saturn-4-ultra-setup.md`](content/guides/saturn-4-ultra-setup.md),
which generates `/guides/saturn-4-ultra-setup/`. Deployment has not been verified
as part of this link update.

| Product | Ordinary destination | Match / link status | Affiliate replacement |
| --- | --- | --- | --- |
| Elegoo Saturn 4 Ultra 12K | [Official US product page](https://us.elegoo.com/products/saturn-4-ultra-12k-10inch-monochrome-lcd-resin-3d-printer) | Exact named printer; linked. Keep the 12K distinct from the 16K. | None yet |
| AC Infinity 5 × 5 grow tent | [Current CLOUDLAB 866 product page](https://acinfinity.com/cloudlab-866-advance-grow-tent-5x5-thickest-poles-and-canvas-60-x-60-x-80/) | Brand and footprint match; linked. Cody's exact model/revision needs confirmation. | None yet |

The ~58-inch standing desk, ~3.5 mil plastic, wet-zone mat/tray, wash equipment,
PPE, resin, and ventilation equipment have no confirmed product identities here.
Add links when the actual items are known and useful to readers. Other brands
mentioned in the Guides handoff are future research candidates, not selected
affiliate programs.

## Next steps

- Confirm the tent model from its label or purchase record and adjust the destination if needed.
- Publish/review the Saturn guide and add follow-ups as real experience develops.
- Apply to the relevant programs when ready; record submission date and outcome here.
- Add approved links using the conversion checklist below.

## Converting an ordinary link after approval

1. Record the program, approved network, approval date, eligible region, and relevant terms. Keep login credentials, tax information, and payout details outside this repository.
2. Generate the product link in the approved dashboard. Keep the ordinary destination in the inventory and record the approved replacement alongside it. Never invent tracking parameters.
3. Update the source guide using `[Product name](APPROVED_URL "affiliate")` and set `affiliateLinksPresent: true`. The existing builder requires both and renders the disclosure and sponsored link attributes.
4. Run `node scripts/build-guides.mjs`. Inspect the generated guide: the link must reach the intended product and the disclosure must appear above the first affiliate link. Follow the program's rules for testing attribution.
5. Commit source and generated files together. Record affected guide paths, verification date, and deployment status here.

For ordinary links use `[Product name](PRODUCT_URL)` and retain
`affiliateLinksPresent: false` while a guide has no affiliate links. If a program
ends, restore its ordinary URLs and set the flag to match the remaining links.

## Application description draft

> Dracars publishes practical guides about 3D printing, hardware, and software, alongside free tools and open-source projects. Guides document my actual setup and experience. Affiliate links will appear only where equipment is relevant, with clear disclosure and independent recommendations.

## Activity

- **2026-10-07:** Verified official product and program pages for ELEGOO and AC Infinity. Confirmed two ordinary product links in the Saturn guide source. No applications submitted and no affiliate links activated.
