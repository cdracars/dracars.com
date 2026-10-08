---
title: Building a garage grow-tent workspace for resin printing
slug: resin-grow-tent-setup
description: A running record of building a shared garage resin-printing workspace, from floor protection to washing and exhaust.
publishedAt: 2026-10-07
updatedAt: 2026-10-08
indexImage: /images/build-logs/resin-grow-tent-setup/08-tent-in-place.webp
author: Dracars
category: projects-builds
status: current
projectState: building
statusNote: Tent assembled — workspace still being built
featured: true
tags: [resin, grow-tent, garage, workspace, saturn-4-ultra, photon-p1]
testedWith:
  - AC Infinity CLOUDLAB 866 (AC-CBA866), 5 × 5 ft grow tent (assembled; still empty)
  - Elegoo Saturn 4 Ultra 12K (incomplete setup; not ready to print)
  - Anycubic Photon P1 (planned for this workspace; no prints yet)
  - Anycubic Wash & Cure 3 Max (powers on and display lights; function unconfirmed, cured resin in the lines)
  - Garage; ~58-inch standing desk planned as the main work surface
affiliateLinksPresent: false
---

:::tldr Where things stand and what I'm planning
- The 5 × 5 ft grow tent is assembled in the garage and still empty. Neither printer has been used for prints in this workspace.
- The Saturn 4 Ultra came with two boxes of parts. I haven't found the vat among the items checked so far; I think it may still be in one of those boxes. The printer is not ready to print.
- The Wash & Cure 3 Max powers on and its display lights up, but I haven't confirmed that it functions. There is cured resin in its lines, so its repair is still to be diagnosed.
- Planned floor protection: two layers of ~3.5 mil plastic under the work area, plus a smooth, wipeable, replaceable surface in the wet zone.
- Keep a deliberate **dirty side**. Workflow: print → drip → **dirty wash → clean wash** → dry completely → cure.
- Resin-only tools stay in the resin area. Covered containers for dirty IPA and resin waste.
- Nitrile gloves and eye protection within reach, and change gloves often.
- **The tent is not ventilation, and IPA vapor is flammable.** Exhaust is part of the plan, and I'm not putting resin in either machine until it works.
- Don't pour resin or resin-contaminated solvent down the drain.
- Build the workspace and workflow first. Printer upgrades can wait until there's a real problem to solve.
:::

So far, I've assembled the grow tent. It's still empty. The layout, floor protection, washing, curing, and exhaust described below are plans for the workspace, not an installed or tested setup. Neither printer has produced a print in this workspace. The Saturn 4 Ultra is not ready to print: it came with two boxes of parts, and I haven't found the vat in the items checked so far. I think it may still be in one of the boxes.

The Anycubic Wash & Cure 3 Max came with the printers. It powers on and the display lights up, but I haven't confirmed its functions; cured resin is in its lines. I'll track its diagnosis and repair separately from the P1 setup, and keep this log focused on the shared workspace. I'll link the printer-specific logs here as they are ready. I'll update this page as I build out and use the space, find problems, and change things. The "Updated" date at the top records when I last revised the guide.

The Saturn and P1 have different features, but they share the same need for somewhere to handle wet prints, wash parts, and keep contaminated tools. That's the focus here. This isn't a comparison or a recommendation based on print results.

## The goal

I do plenty of FDM printing, but resin is a different problem. The printer isn't the complicated part. The workflow around it is.

A resin setup needs somewhere for resin → printing → dripping → washing → drying → curing → cleanup → waste, without uncured resin spreading across every tool and surface in the shop. I'm planning the workspace around that whole process.

## From pickup to getting the tent in place

### The equipment at pickup

These photos are from the place I got the printers and cleaning station from, before bringing them home.

!photo 01-equipment-at-pickup.webp | The printers and cleaning equipment at the pickup location.

!photo 02-cleaning-station-at-pickup.webp | A closer look at the cleaning station before the move.

!photo 03-photon-p1-at-pickup.webp | The Anycubic Photon P1 at the pickup location.

The Wash & Cure 3 Max was part of the same pickup. Its display lights when powered on, but I haven't established that the machine functions. Cured resin is in the lines, so it needs inspection before I can count on it for the wash workflow.

### Airing out the tent at home

Back at my house, I fully unzipped and opened up the AC Infinity tent to air it out and work on curing small resin spills on its floor and elsewhere on the tent. I forgot to photograph it fully opened, so the photo below only catches part of that process. This was part of getting the equipment ready for the new workspace.

!photo 05-tent-airing-out.webp | The AC Infinity tent on the grass at home. I fully unzipped and opened it for curing and airing out, but forgot to photograph that step.

### Wrestling it into place

Then came the less graceful part: wrestling the tent into place in the garage. These are the frame, the fabric partway into position, and the tent finally standing where I want it. It's still empty and waiting for the work surface and the rest of the setup.

!photo 04-tent-frame.webp | The bare tent frame in its garage spot.

!photo 06-tent-fabric.webp | Getting the reflective tent fabric into position around the frame.

!photo 07-tent-going-in.webp | Partway through wrestling the tent into place.

!photo 08-tent-in-place.webp | The tent standing in place, still empty while I plan the interior.

## My workspace plan

The AC Infinity CLOUDLAB 866 (model `AC-CBA866`), a 5 × 5 ft grow tent, is up in my garage. Both printers are planned to go inside, with a roughly 58-inch standing desk as the main work surface. The plan is to keep printing, washing, curing, and contaminated tools together. During the dry fit, I still need to check room for opening the printers, lifting build plates, and moving dripping parts to the wash area.

Once resin work starts, the tent will also draw a boundary: **if it's inside here, assume it has been near uncured resin.**

### A tent is not ventilation

A tent draws a boundary around the work area. It does not remove anything from the air, and I'm not treating its fabric or floor as verified UV protection or spill containment.

Elegoo's [resin printing guide](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing) describes a well-ventilated workspace away from UV and protective equipment including nitrile gloves and safety goggles. My plan is to exhaust the tent outside; that build isn't finished yet.

Two rules until that's done:

1. **No resin in either machine until the exhaust works.** Setup and dry fit only.
2. **Treat IPA as a fire hazard, not just a fumes problem.** I'll keep containers lidded and away from ignition sources, and check the solvent's safety data sheet before choosing ventilation equipment. I'll document the actual exhaust build when it exists.

OSHA's [flammable-liquids standard](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.106) addresses covered containers when not in use and keeping ignition sources out of the path of flammable vapors (1910.106(e)(2)(iv)). Its ignition-source list includes electrical and static sparks. I'm using this as a workplace safety reference, not claiming that this garage setup meets a code or that a household installation has the same requirements.

**Tent volume and a fan's advertised CFM aren't enough to establish safe exhaust.** OSHA's [ventilation primer](https://www.osha.gov/otm/section-3-health-hazards/chapter-3) distinguishes capturing contaminants at their source from diluting them in room air. System selection depends on emissions, air movement, and the work being done. The unfinished exhaust needs to account for replacement air, duct resistance, outdoor discharge, and equipment suitability for the vapors involved. A grow-tent airflow rule or inward-pulling fabric won't by itself demonstrate exposure control or fire safety.

## Protecting the floor

A grow-tent floor looks like containment, but I don't want resin curing into the tent itself. This is the floor protection I'm planning:

!figure floor-layers

In this planned layout, the tray on top forms the wet zone for the printer, vat, and wash station.

Two 3.5 mil layers aren't equivalent to one perfect 7 mil liner, since seams and punctures still matter. But they give me two disposable layers before a spill reaches the tent. If the top layer gets bad enough, I replace it.

**Foam shop mats** are comfort, not spill containment. They're fine if I'm willing to throw away a contaminated section, but I don't want textured foam under repeated resin handling. In the wet zone I want something smooth and nonporous.

## The workflow matters more than the printer

!figure post-process-flow

The planned dirty wash does the bulk of the cleaning before the clean wash. Elegoo's [post-processing guidance](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing) follows the wash → dry → cure order, says to dry the model completely before curing, and calls for eye protection during curing.

### A deliberate dirty side

Once the workspace is in use, these will stay in the resin area and never go back to my normal toolbox:

- resin scraper, funnels, filters, wash baskets
- contaminated paper towels
- dirty IPA containers

This is less about special equipment and more about avoiding the "I think this screwdriver is clean…" problem. A few cheap tools permanently assigned to resin work is the fix.

### Dirty IPA is still waste

I'm keeping contaminated solvent in labeled, covered containers until I have disposal instructions from my local waste service. The EPA's [household hazardous waste guidance](https://www.epa.gov/hw/household-hazardous-waste-hhw) says improper disposal includes drains, the ground, and storm sewers, and directs households to local authorities. Curing resin residue isn't permission to pour the remaining solvent away.

**My rule: no resin and no resin-contaminated solvent goes down the drain.**

For U.S. readers, the EPA page points to local environmental, health, or solid-waste agencies for household collection options. Before a drop-off, confirm that the program accepts uncured printing resin and resin-contaminated IPA, along with its packaging, quantity, and residency rules. Check Section 13 of the actual product SDS too; it doesn't replace the receiving program's instructions.

## Gloves and skin

I'm keeping resin off bare skin and replacing contaminated or damaged gloves. I'll use the resin and solvent safety data sheets to choose suitable gloves and other protection; I haven't recorded the specific resin for this setup yet.

NIOSH's [Safe Desktop Vat Photopolymerization 3-D Printing](https://www.cdc.gov/niosh/media/pdfs/2025/01/Safe-3D-Printing.pdf) calls for gloves that protect against acrylates and IPA, frequent changes, and immediate replacement of PPE contaminated by uncured resin or solvents. So “nitrile” alone isn't a compatibility check for every resin, solvent, or glove thickness.

Use the glove manufacturer's data for the exact glove and chemicals. Ansell's [example permeation chart and its limitations](https://www.ansell.com/-/media/projects/ansell/website/pdf/industrial/ansell-guardian/sample-chemical-report.ashx) explain that laboratory breakthrough times aren't safe wear times and that mixture effects aren't accounted for. This is a reference for interpreting data, not a recommendation for the gloves in that chart or a timed replacement schedule for this setup.

I'm not a safety professional, and this is what I'm doing, not a guarantee. Read the safety data sheet for whatever resin and solvent you use.

### Which parts of the SDS to check

Get the current SDS from the supplier for the exact resin formulation and IPA product/concentration. OSHA's [SDS guide](https://www.osha.gov/Publications/OSHA3514.html) explains the sections:

- **Sections 2 and 5:** hazard identification and firefighting measures.
- **Section 7:** handling and storage precautions.
- **Section 8:** exposure controls and personal protection.
- **Section 13:** disposal considerations; confirm local acceptance and disposal instructions separately.

I haven't recorded the exact resin and IPA products yet, so product-specific SDS links will come once those are known.

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

## Equipment and materials for the plan

This is the equipment around which I'm planning the workspace. It isn't a shopping list or a tested recommendation:

- **Printer:** [Elegoo Saturn 4 Ultra 12K](https://us.elegoo.com/products/saturn-4-ultra-12k-10inch-monochrome-lcd-resin-3d-printer), not ready to print while I check the two boxes of parts and find the vat
- **Printer being added:** [Anycubic Photon P1](https://store.anycubic.com/products/photon-p1-resin-3d-printer), not yet used in the workspace
- **Wash and cure:** Anycubic Wash & Cure 3 Max, powers on and lights its display; function unconfirmed, with cured resin in the lines
- **Enclosure:** [AC Infinity CLOUDLAB 866](https://acinfinity.com/cloudlab-866-advance-grow-tent-5x5-thickest-poles-and-canvas-60-x-60-x-80/) (model `AC-CBA866`), 5 × 5 ft grow tent
- **Floor protection:** two layers of roughly 3.5 mil plastic
- **Main work surface:** a standing desk of about 58 inches
- **Planned wet zone:** a smooth, wipeable, replaceable surface, such as a silicone mat or rigid tray

For the wet-zone surface, I'm considering the [Wham Bam Slap Mat](https://www.whambamsystems.com/products/slap-mat) and [Mach5ive Splat Mat](https://mach5ive.com/products/mach5ive-splat-mat-silicon-work-surface-for-resin-3d-printing-crafts-medium-400mm-x-600mm). Both are silicone work mats marketed for resin printing. I haven't picked or tested either yet; these are options I'm considering, not equipment I've used or recommendations.

You don't need a 5 × 5 grow tent to use a resin printer. I'm using one because I have the room and want printing and post-processing contained together. The desk, floor covering, containers, and eventual exhaust are examples of how I'm solving the problem. I'll call out useful recommendations separately once I have experience with them.

I haven't recorded the resin, firmware, or slicer versions for this guide yet. I'll add them when I start printing.

## What I'm not upgrading yet

I'm holding off on printer mods. There are printable changes I want to try eventually, but I don't know what either machine needs until I've used it. For now, I'm spending the effort on the workspace.

## What I consider essential

- nitrile gloves and eye protection
- washable or disposable work surface
- wash containers and a wash solvent suited to the resin
- curing solution or station
- funnels, filters, paper towels or shop wipes
- resin-only tools
- covered containers for contaminated waste
- ventilation, and a fire extinguisher nearby

Everything else gets decided after I hit a real problem.

## Where I'd spend money first

Before filling either printer, I want these parts of the workspace ready. Ventilation is a prerequisite, not a later upgrade:

1. Ventilation
2. Containment
3. Washing
4. Curing
5. Storage and organization
6. Printer mods that fix an actual problem

A shiny mod doesn't help if I still don't know where to put a dripping build plate.

## One thing I already got wrong

When moving my resin equipment, I left it in my truck for a day before getting it into the garage. The machines had been emptied for the move, and it reached about 85°F that day. My concern is sunlight reaching any uncured resin residue left on the equipment.

I don't know whether anything was affected: I haven't run either machine yet. I'll inspect the vats and build plates before use and record any problems I find. I can't call the move harmless or claim that heat damaged the machines.

I've also had cured resin end up in places I didn't want it on another resin machine. That's why I'm planning a defined dirty zone before this workspace sees any resin.

## What I'd do differently

This will change as I use the setup. So far the lesson is: **design the resin workflow before filling the printer.** I started with "where does the printer go?" The better question is "where does everything go after the print finishes?"

## What's next

- my actual dirty-wash and clean-wash setup
- curing workflow
- the exhaust build
- first-print experience
- which printer mods are worth it, and which accessories turned out unnecessary

When one of these gets big enough, I'll split it into its own guide and link it here.

## Sources

- [NIOSH: Safe Desktop Vat Photopolymerization 3-D Printing](https://www.cdc.gov/niosh/media/pdfs/2025/01/Safe-3D-Printing.pdf), for resin-printing exposure controls, glove selection, and replacing contaminated PPE.
- [OSHA: 1910.106 — Flammable liquids](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.106), especially (e)(2)(iv) and (e)(6), for covered containers and ignition sources. A workplace reference, not a compliance assessment of this garage.
- [OSHA: Ventilation Investigation](https://www.osha.gov/otm/section-3-health-hazards/chapter-3), including the ventilation primer, for source capture, dilution, and system-selection considerations.
- [Ansell: Example Chemical Permeation Report](https://www.ansell.com/-/media/projects/ansell/website/pdf/industrial/ansell-guardian/sample-chemical-report.ashx), for the limits of breakthrough-time data; not a product selection for this setup.
- [OSHA: Hazard Communication Standard — Safety Data Sheets](https://www.osha.gov/Publications/OSHA3514.html), for navigating the actual products' SDS documents.
- [Elegoo: Get Started in Resin Printing](https://us.elegoo.com/blogs/3d-printer-user-guide/getstarted-in-resin-printing), for workspace precautions and wash, dry, and cure guidance. Follow each printer's own manual for setup.
- [EPA: Household Hazardous Waste](https://www.epa.gov/hw/household-hazardous-waste-hhw), for household waste handling and finding local disposal instructions.
