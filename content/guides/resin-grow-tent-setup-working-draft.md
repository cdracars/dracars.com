---
title: Resin grow-tent setup guide — working draft
slug: resin-grow-tent-setup-working-draft
description: Unpublished reference notes for the resin grow-tent setup guide, preserved while the workspace is being built and tested.
publishedAt: 2026-10-12
updatedAt: 2026-10-12
author: Dracars
category: resin-printing
status: coming-soon
statusNote: Unpublished working draft
featured: false
tags: [resin, grow-tent, garage, workspace]
testedWith:
  - AC Infinity CLOUDLAB 866 (AC-CBA866), 5 × 5 ft grow tent (setup in progress)
affiliateLinksPresent: false
draft: true
---

:::tldr Working notes — unpublished
These notes preserve the reusable setup, safety, equipment, and research material while the workspace is still being built. They are not a tested guide. The dated project updates and photos remain in the [build log](/build-logs/resin-grow-tent-setup/).
:::

## My workspace plan

The AC Infinity CLOUDLAB 866 (model `AC-CBA866`), a 5 × 5 ft grow tent, is up in my garage. Both printers are planned to go inside, with a roughly 58-inch standing desk as the main work surface. The plan is to keep printing, washing, curing, and contaminated tools together. During the dry fit, I still need to check room for opening the printers, lifting build plates, and moving dripping parts to the wash area.

Once resin work starts, the tent will also draw a boundary: **if it's inside here, assume it has been near uncured resin.**

**Where I'll put the Wash & Cure.** I plan to put the Anycubic Wash & Cure 3 Max on the tent floor, out of the way. The dirty wash will go in the pickle jars, and I'll use the machine for the final wash and curing if I can get it working. Its UV light only turns on with the lid closed. I haven't confirmed the machine works yet, and I won't use IPA in the tent until the exhaust is ready.

### A tent is not ventilation

A tent draws a boundary around the work area. It does not remove anything from the air, and I'm not treating its fabric or floor as verified UV protection or spill containment.

Elegoo's [resin printing guide](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing) calls for a well-ventilated workspace away from UV, plus protective equipment such as nitrile gloves and safety goggles. I want to exhaust the tent outside, but I haven't built that system yet.

Two rules until that's done:

1. **No resin in either machine until the exhaust works.** Setup and dry fit only.
2. **Treat IPA as a fire hazard, not just a fumes problem.** I'll keep containers lidded and away from ignition sources, and check the solvent's safety data sheet before choosing ventilation equipment. I'll document the actual exhaust build when it exists.

The build log records my plan to use the printers before the exhaust is ready, along with the precautions I intend to take and the limits of that choice. The eventual guide will distinguish my actual experience from setup guidance I can stand behind.

OSHA's [flammable-liquids standard](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.106) says to cover containers when they're not in use and keep ignition sources away from flammable vapors (1910.106(e)(2)(iv)); its list includes electrical and static sparks. I'm using it as a workplace safety reference. I'm not claiming my garage meets that standard or that all of its requirements apply here.

That list matters for my own tent: the light and its red rocker switch are inside it. Before open IPA goes in there, I'll revisit where the electrical pieces sit and document what I change.

**I can't size the exhaust from tent volume and a fan's advertised CFM alone.** OSHA's [ventilation primer](https://www.osha.gov/otm/section-3-health-hazards/chapter-3) distinguishes capturing contaminants where they start from diluting them in room air. I still need to account for replacement air, duct resistance, outdoor discharge, and equipment suitable for the vapors. An inward-pulling tent won't answer those questions or prove the setup is safe.

## Protecting the floor

I don't want resin curing onto the tent floor, so I'm adding layers I can replace. Here's the setup I'm working toward:

!figure floor-layers

The tray on top will be the wet zone for the printers and vats. I'm planning to put the Wash & Cure on the tent floor instead.

Two 3.5 mil layers aren't equivalent to one perfect 7 mil liner, since seams and punctures still matter. But they give me two disposable layers before a spill reaches the tent. If the top layer gets bad enough, I replace it.

**Foam shop mats** would make standing more comfortable, but they wouldn't contain spills. I don't want textured foam under the wet zone; I'd rather use a smooth, nonporous surface that I can wipe down or replace.

## The workflow matters more than the printer

!figure post-process-flow

My plan is to do most of the cleaning in a dirty wash, then use a clean wash before drying and curing. That's consistent with Elegoo's [post-processing guidance](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing), which says to dry the model completely before curing and wear eye protection during curing.

### A deliberate dirty side

I want these tools to stay in the resin area and never drift back into my regular toolbox:

- resin scraper, funnels, filters, wash baskets
- contaminated paper towels
- dirty IPA containers

I know how easy it is to grab something and think, “I'm pretty sure that's clean.” A few cheap tools that belong to resin work should save me from that guess.

### Dirty IPA is still waste

I'm keeping contaminated solvent in labeled, covered containers until I have disposal instructions from my local waste service. The EPA's [household hazardous waste guidance](https://www.epa.gov/hw/household-hazardous-waste-hhw) says improper disposal includes drains, the ground, and storm sewers, and directs households to local authorities. Curing resin residue isn't permission to pour the remaining solvent away.

**My rule: no resin and no resin-contaminated solvent goes down the drain.**

I'll check with my local environmental or solid-waste program before taking anything in. I need to know whether it accepts uncured resin and resin-contaminated IPA, and what its packaging, quantity, and residency rules are. I'll also check Section 13 of the product SDS.

## Gloves and skin

I'm keeping resin off bare skin and replacing contaminated or damaged gloves. I'll use the resin and solvent safety data sheets to choose suitable gloves and other protection. The resin for this setup is SUNLU 1000G ABS-Like Resin, and I've pulled its safety data sheet (summarized below).

NIOSH's [Safe Desktop Vat Photopolymerization 3-D Printing](https://www.cdc.gov/niosh/media/pdfs/2025/01/Safe-3D-Printing.pdf) calls for gloves that protect against acrylates and IPA, frequent changes, and immediate replacement of PPE contaminated by uncured resin or solvents. I can't assume “nitrile” alone means a glove is compatible with every resin, solvent, or thickness.

I'm looking for the manufacturer's data for the exact glove and chemicals. Ansell's [example permeation chart and its limitations](https://www.ansell.com/-/media/projects/ansell/website/pdf/industrial/ansell-guardian/sample-chemical-report.ashx) explain that laboratory breakthrough times aren't safe wear times and that mixture effects aren't accounted for. I use it to understand the data, not as a recommendation for the gloves in that chart or a timed replacement schedule for my setup.

**Glove check, October 10, 2026.** The gloves I bought are Hardy 9 mil black nitrile (see Where the gear came from). I looked for evidence that they protect against this resin's acrylates and against IPA, and I couldn't confirm it. NIOSH says to use gloves that protect against acrylates and isopropyl alcohol and to change them frequently, but it doesn't name a material. [Harbor Freight's listing](https://www.harborfreight.com/9-mil-nitrile-powder-free-gloves-medium-50-pack-68510.html) says the gloves resist chemicals better than latex and suit industrial solvents, but it gives no permeation or breakthrough data and lists no ASTM or EN standards. A [dental study of nitrile and latex gloves](https://medicaljournalssweden.se/actaodontologica/article/view/39113) found a mean breakthrough of about 16 minutes against undiluted methacrylate monomers, with wide variation between gloves, and much shorter times when ethanol or acetone was present. Those are different chemicals and different gloves, so it isn't proof either way, but it's a reason to be careful around IPA.

Until I have real data, I treat these gloves as short-contact, splash-level protection: I change them right after any contact with resin, and I don't rinse them in IPA and keep wearing them. To close this out I need permeation data from the manufacturer, or a glove that publishes its own acrylate and IPA data.

I'm not a safety professional, and this is what I'm doing, not a guarantee. Read the safety data sheet for whatever resin and solvent you use.

### Which parts of the SDS to check

I get the current SDS from the supplier for the exact resin formulation and IPA product/concentration. OSHA's [SDS guide](https://www.osha.gov/Publications/OSHA3514.html) explains the sections:

- **Sections 2 and 5:** hazard identification and firefighting measures.
- **Section 7:** handling and storage precautions.
- **Section 8:** exposure controls and personal protection.
- **Section 13:** disposal considerations; confirm local acceptance and disposal instructions separately.

The resin is SUNLU 1000G ABS-Like Resin. On October 10, 2026, I pulled the SDS that SUNLU links from its [ABS-Like Resin product page](https://www.sunlu.com/products/abs-like-resin) ([SDS PDF](https://media.sunlu.com/prod/20260331/796b9835-c2e6-42d6-af1f-f36c17671a03.pdf?filename=SDS), version 1.0, dated February 11, 2025). It's one sheet for the whole ABS-Like line, not specific to my color or bottle size. This is what it says that affects this setup:

- **Hazards (Section 2):** signal word "Danger." Harmful if swallowed, skin irritation, may cause an allergic skin reaction, severe eye damage, respiratory irritation, and possible organ damage from prolonged or repeated exposure. Toxic to aquatic life with long-lasting effects.
- **Ventilation (Sections 2, 7 and 8):** use outdoors or in a well-ventilated area, and ensure adequate ventilation.
- **Fire (Section 5):** foam, dry extinguishing agents or water spray, not a water jet. Burning produces carbon monoxide and nitrogen oxides. No flash point is listed.
- **Storage (Section 7):** original, tightly closed container in a cool, well-ventilated place, out of direct sunlight, away from strong acids and oxidizers, and upright after opening.
- **Disposal (Section 13):** not down the drain. The sheet classes the resin and its empty packaging as dangerous waste, to be disposed of under local rules.
- **Gloves and eyes (Section 8):** it only says "suitable" gloves, with no material named. It also says eye protection isn't necessary under normal conditions, which conflicts with the severe eye damage hazard in Section 2, so eye protection stays in my plan regardless.

The sheet has gaps. Sections 9, 10 and 12 are mostly "N/A" or empty, and it lists "H355" for respiratory irritation, which looks like a typo for H335. I haven't recorded the exact IPA product yet, so its SDS link will come once I have it.

## Setting up each printer

Each machine gets its own setup check, following its manufacturer's manual. I'm not assuming that leveling, startup checks, or exposure tests work the same way on both. Before any resin goes in a vat, I'm checking:

- shipping material fully removed
- build plate installed correctly
- vat installed correctly
- release film clean and undamaged
- no cured resin or debris in the vat
- printer level and stable
- LCD and exposure system working
- network connection and any external antenna set up according to the manual
- firmware and settings checked
- resin mixed per its instructions

I'll label the resin in each vat and keep each machine's parts together. Two printers don't have to mean two different resins, but I don't want to rely on memory if I change materials. There's little upside to discovering a setup problem with a vat full of liquid resin.

## The gear I'm starting with

Here's what I have, and what I'm planning around it. I haven't tested this setup as a whole:

- **Printer:** [Elegoo Saturn 4 Ultra 12K](https://us.elegoo.com/products/saturn-4-ultra-12k-10inch-monochrome-lcd-resin-3d-printer), not ready to print until the setup checks are done; its vat and build plate have turned up, boxed in the photos
- **Printer being added:** [Anycubic Photon P1](https://store.anycubic.com/products/photon-p1-resin-3d-printer), not yet used in the workspace
- **Wash and cure:** Anycubic Wash & Cure 3 Max, planned for the tent floor; powers on and lights its display; function unconfirmed, with cured resin in the lines
- **Enclosure:** [AC Infinity CLOUDLAB 866](https://acinfinity.com/cloudlab-866-advance-grow-tent-5x5-thickest-poles-and-canvas-60-x-60-x-80/) (model `AC-CBA866`), 5 × 5 ft grow tent
- **Floor protection:** two layers of roughly 3.5 mil plastic
- **Main work surface:** a standing desk of about 58 inches
- **Planned wet zone:** a smooth, wipeable, replaceable surface, such as a silicone mat or rigid tray. I've bought a 36.2" × 24" extra large silicone mat; I haven't used it yet
- **Resin:** SUNLU 1000G ABS-Like Resin, delivered; not yet used

For the wet-zone surface, I'm considering the [Wham Bam Slap Mat](https://www.whambamsystems.com/products/slap-mat) and [Mach5ive Splat Mat](https://mach5ive.com/products/mach5ive-splat-mat-silicon-work-surface-for-resin-3d-printing-crafts-medium-400mm-x-600mm). Both are silicone work mats marketed for resin printing. I haven't picked or tested either yet; these are options I'm considering, not equipment I've used or recommendations.

I chose a 5 × 5 grow tent because I have the room and want printing and post-processing contained together. The desk, floor covering, containers, and eventual exhaust are how I'm trying to make that work. I'll know which parts are worth recommending after I've used them.

The resin is SUNLU 1000G ABS-Like Resin. I haven't recorded firmware or slicer versions yet; I'll add them when I start printing.

### Planned power load

Everything in the tent will run through the orange 16 gauge cord, so I added up the ratings. These are manufacturer power-supply figures, which are maximums, not what each machine actually draws, and I haven't measured anything with a meter yet:

- **Elegoo Saturn 4 Ultra 12K:** 144 W. Elegoo's own product page doesn't list power, so this comes from a [spec listing](https://printer-hub.ru/en/printers/elegoo-saturn-4-ultra), and it matches the 24 V, 6 A adapter rating on a [retailer's page](https://spool3d.ca/elegoo-saturn-4-ultra-12k-resin-3d-printer).
- **Anycubic Photon P1:** 215 W power supply, per [Anycubic's store page](https://store.anycubic.com/products/photon-p1-resin-3d-printer).
- **Anycubic Wash & Cure 3 Max:** 120 W power supply, per [Anycubic's store page](https://store.anycubic.com/products/wash-cure-3-max). The page doesn't say whether that covers washing, curing or both.

- **Braun 5500 lumen LED light:** 55 W at 120 V, per its [Harbor Freight listing](https://www.harborfreight.com/5500-lumen-4-ft-linkable-led-hanging-shop-light-59506.html).

That adds up to about 534 W, roughly 4.5 amps at 120 V. The orange cord's [Harbor Freight listing](https://www.harborfreight.com/25-ft-x-163-gauge-indooroutdoor-extension-cord-orange-62938.html) says 13 amps, 1,625 W and 125 V, so 534 W is well inside it. The listing says its specs are approximate, so I'll still check the label on the cord itself.

That cord feeds a surge protector, which is how I get the extra outlets, so the surge protector's own rating matters too. I'll record its model and rating when I'm at the setup.

The total doesn't include a possible heater. The old fish tank fixture has been replaced with the new LED light (see the 2026-10-11 update above), and its 55 W is in the total. I haven't confirmed it puts out no UV. If I add a small chamber heater, I'll add its wattage here. A heater is also an ignition-source question next to IPA vapor, so I'm treating it as a separate decision from the cord load. I'll also check the rating on the red inline switch, since a switch is often rated lower than the cord.

### Where the gear came from

Several of the supplies came from Harbor Freight. I haven't tested any of this gear for resin work yet:

- **Extension cord:** [Vanguard 25 ft. x 16/3 gauge indoor/outdoor extension cord, orange](https://www.harborfreight.com/25-ft-x-163-gauge-indooroutdoor-extension-cord-orange-62938.html).
- **Gloves:** [Hardy 9 mil nitrile powder-free gloves, medium](https://www.harborfreight.com/9-mil-nitrile-powder-free-gloves-medium-50-pack-68510.html), the black ones. I wear a medium, and they run a little tight on me, though not too bad.
- **Floor-protection plastic:** [Husky 10 ft. x 25 ft. poly sheeting](https://www.harborfreight.com/10-ft-x-25-ft-poly-sheeting-95144.html), which I've been calling the drop cloth. Harbor Freight's page lists it as 3 mil, and the packaging on mine says 3.5 mil.
- **Shop towels:** [Toolbox disposable blue shop towels](https://www.harborfreight.com/disposable-blue-shop-towels-64395.html). Mine came on a roll, not in a box.
- **LED light:** [Braun 5500 lumen, 4 ft linkable LED hanging shop light](https://www.harborfreight.com/5500-lumen-4-ft-linkable-led-hanging-shop-light-59506.html).

The printers and the wash station came from the pickup described above, and the other supplies are linked in the update above.

## What I want close at hand

This is my near-at-hand list for when I start printing:

- nitrile gloves and eye protection
- washable or disposable work surface
- wash containers and a wash solvent suited to the resin
- curing solution or station
- funnels, filters, paper towels or shop wipes
- resin-only tools
- covered containers for contaminated waste
- ventilation, and a fire extinguisher nearby

Everything else gets decided after I hit a real problem.

## What I want ready before the first print

Before filling either printer, I want these parts of the workspace ready. Ventilation is a prerequisite, not a later upgrade:

1. Ventilation
2. Containment
3. Washing
4. Curing
5. Storage and organization
6. Printer mods that fix an actual problem

A shiny mod doesn't help if I still don't know where to put a dripping build plate.

## What's next

- set up the dirty and clean washes
- work out the curing workflow
- tidy the floor liner with more printed clips and see how well they hold
- build the exhaust and update my "Do as I say, not as I do" note
- inspect the Saturn's vat and build plate, then work through the setup checks
- diagnose the Wash & Cure
- set up the standing desk
- check whether the new LED light emits UV
- record the surge protector and red switch ratings, and check the label on the orange cord
- record the IPA product and concentration, then pull its SDS
- get permeation data for these nitrile gloves or switch to gloves with published acrylate and IPA data
- put a fire extinguisher nearby
- record the first print and carry any workflow notes into this guide
- figure out which printer mods help and which accessories I don't need

I'll keep adding the next steps here as I work through them, and link any separate writeup from this log.

## Sources

- [NIOSH: Safe Desktop Vat Photopolymerization 3-D Printing](https://www.cdc.gov/niosh/media/pdfs/2025/01/Safe-3D-Printing.pdf), for resin-printing exposure controls, glove selection, and replacing contaminated PPE.
- [OSHA: 1910.106 — Flammable liquids](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.106), especially (e)(2)(iv) and (e)(6), for covered containers and ignition sources. A workplace reference, not a compliance assessment of this garage.
- [OSHA: Ventilation Investigation](https://www.osha.gov/otm/section-3-health-hazards/chapter-3), including the ventilation primer, for source capture, dilution, and system-selection considerations.
- [Ansell: Example Chemical Permeation Report](https://www.ansell.com/-/media/projects/ansell/website/pdf/industrial/ansell-guardian/sample-chemical-report.ashx), for the limits of breakthrough-time data; not a product selection for this setup.
- [OSHA: Hazard Communication Standard — Safety Data Sheets](https://www.osha.gov/Publications/OSHA3514.html), for navigating the actual products' SDS documents.
- [Elegoo: Get Started in Resin Printing](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing), for workspace precautions and wash, dry, and cure guidance. Follow each printer's own manual for setup.
- [EPA: Household Hazardous Waste](https://www.epa.gov/hw/household-hazardous-waste-hhw), for household waste handling and finding local disposal instructions.
- [Acta Odontologica: Permeability of protective gloves by HEMA and TEGDMA in the presence of solvents](https://medicaljournalssweden.se/actaodontologica/article/view/39113), for how solvents can shorten nitrile glove breakthrough times. Different monomers and gloves than mine, so context, not proof.
