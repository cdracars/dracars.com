---
title: My Saturn 4 Ultra garage setup
slug: saturn-4-ultra-setup
description: Setting up an Elegoo Saturn 4 Ultra 12K in an AC Infinity 5×5 grow tent, with a contained workspace and a wash-dry-cure routine.
publishedAt: 2026-10-07
updatedAt: 2026-10-07
author: Dracars
category: resin-printing
status: current
statusNote: Initial Setup
featured: true
tags: [saturn-4-ultra, resin, grow-tent, garage, workspace]
testedWith:
  - Elegoo Saturn 4 Ultra 12K (setup stage; no prints yet)
  - AC Infinity 5 × 5 grow tent
  - Garage, with a ~58-inch standing desk as the main work surface
affiliateLinksPresent: false
---

:::tldr The setup at a glance
- Saturn 4 Ultra on a stable surface inside a 5 × 5 ft grow tent in the garage. The tent is a **contained resin workspace**.
- Two layers of ~3.5 mil plastic under the work area, replaced when they get nasty, plus a smooth, wipeable, replaceable surface in the wet zone.
- Keep a deliberate **dirty side**. Workflow: print → drip → **dirty wash → clean wash** → dry completely → cure.
- Resin-only tools stay in the resin area. Covered containers for dirty IPA and resin waste.
- Nitrile gloves and eye protection within reach, and change gloves often.
- **The tent is not ventilation, and IPA vapor is flammable.** Exhaust is part of the plan, and I'm not putting resin in the machine until it works.
- Don't pour resin or resin-contaminated solvent down the drain.
- Don't start by buying Saturn upgrades. Set it up, build a clean workflow, print, then fix the problems you actually have.
:::

This is my initial setup, not a six-month review pretending I already know everything about the machine. I'll update this page as I use it, find problems, and change things. The "Last updated" date at the top is the honest measure of how fresh any of it is.

The Saturn doesn't need upgrades to start. It already has automatic leveling, a 10-inch 12K LCD, Wi-Fi, and a build volume of 218.88 × 122.88 × 220 mm.

## The goal

I do plenty of FDM printing, but resin is a different problem. The printer isn't the complicated part. The workflow around it is.

A resin setup needs somewhere for resin → printing → dripping → washing → drying → curing → cleanup → waste, without uncured resin spreading across every tool and surface in the shop. I designed the workspace around that process rather than around where the Saturn would physically fit.

## My workspace

The Saturn is going into a 5 × 5 ft AC Infinity grow tent in my garage. Inside, a roughly 58-inch standing desk is the work surface. It holds the printer, wash area, curing area, and contaminated-tool area, so I'm not carrying resin-covered parts around the garage.

The tent also draws a boundary: **if it's inside here, assume it has been near uncured resin.**

### A tent is not ventilation

A tent helps isolate the workspace, block stray UV, and contain spills. It does not remove anything from the air.

Elegoo's resin safety and cleaning guidance calls for a well-ventilated area, nitrile gloves, and eye protection. My finished setup exhausts the tent outside.

Two rules until that's done:

1. **No resin in the machine until the exhaust works.** Setup and dry fit only.
2. **Treat IPA as a fire hazard, not just a fumes problem.** Its vapor is flammable. That affects the exhaust fan (many cheap inline fans aren't built to be spark-safe), what else is plugged in inside the tent, and how much IPA I keep out. I'll keep quantities small, containers lidded, and a fire extinguisher within reach. I'll document the actual exhaust build when it exists.

## Protecting the floor

A grow-tent floor looks like containment, but I don't want resin curing into the tent itself. My solution is cheap and replaceable:

!figure floor-layers

The wet zone, where the printer, vat, and wash station sit, is the tray on top.

Two 3.5 mil layers aren't equivalent to one perfect 7 mil liner, since seams and punctures still matter. But they give me two disposable layers before a spill reaches the tent. If the top layer gets bad enough, I replace it.

**Foam shop mats** are comfort, not spill containment. They're fine if I'm willing to throw away a contaminated section, but I don't want textured foam under repeated resin handling. In the wet zone I want something smooth and nonporous.

## The workflow matters more than the printer

!figure post-process-flow

The dirty wash does the ugly work, so the clean wash stays clean longer. Elegoo's own post-processing guidance follows the same wash → dry → cure order and says to let the model dry before curing.

### A deliberate dirty side

These stay in the resin area and never go back to my normal toolbox:

- resin scraper, funnels, filters, wash baskets
- contaminated paper towels
- dirty IPA containers

This is less about special equipment and more about avoiding the "I think this screwdriver is clean…" problem. A few cheap tools permanently assigned to resin work is the fix.

### Dirty IPA is still waste

UV curing doesn't make contaminated IPA harmless. Curing and settling can help separate resin solids from solvent, but disposal still follows local rules. The EPA lists solvents among materials that may need household hazardous-waste handling and says to check with local waste authorities rather than pour them down drains, onto the ground, or into storm sewers.

**My rule: no resin and no resin-contaminated solvent goes down the drain.**

## Gloves and skin

Resin is a skin irritant and sensitizer, and nitrile isn't a permanent barrier. Resin and IPA can get through thin gloves over time. I'm changing gloves often, especially when they're wet with either, and keeping resin off bare skin.

I'm not a safety professional, and this is what I'm doing, not a guarantee. Read the safety data sheet for whatever resin and solvent you use.

## Setting up the Saturn 4 Ultra itself

The machine uses automatic leveling and runs its own startup self-check, so there's no traditional manual bed-leveling ritual. Before any resin goes in the vat, I'm checking:

- shipping material fully removed
- build plate installed correctly
- vat installed correctly
- release film clean and undamaged
- no cured resin or debris in the vat
- printer level and stable
- LCD and exposure system working
- Wi-Fi antenna installed
- firmware and settings checked
- resin mixed per its instructions

There's little upside to discovering a setup problem with a vat full of liquid resin.

## What I used

This is my actual setup, which isn't the same as a shopping list:

- **Printer:** [Elegoo Saturn 4 Ultra 12K](https://us.elegoo.com/products/saturn-4-ultra-12k-10inch-monochrome-lcd-resin-3d-printer)
- **Enclosure:** [AC Infinity 5 × 5 grow tent](https://acinfinity.com/cloudlab-866-advance-grow-tent-5x5-thickest-poles-and-canvas-60-x-60-x-80/)
- **Floor protection:** two layers of roughly 3.5 mil plastic
- **Main work surface:** a standing desk of about 58 inches
- **Wet zone:** a smooth, wipeable, replaceable surface (silicone mat or rigid tray)

You don't need a 5 × 5 grow tent to use a Saturn 4 Ultra. I'm using one because I have the room and want printing and post-processing contained together. The desk, floor covering, containers, and eventual exhaust are examples of how I'm solving the problem, not a shopping list. If I find something I genuinely think is a particularly good solution, I'll call it out separately.

I haven't recorded the resin, firmware, or slicer versions for this guide yet. I'll add them when I start printing.

## What I'm not upgrading yet

Almost nothing, on purpose. I don't want this to turn into "congratulations on your new printer, here are 37 more things you apparently need to buy." There are printable mods I want to try eventually, but I don't know what I need until I've used the machine.

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

If I add anything around this printer, it's workflow before mods, roughly in this order:

1. Containment
2. Washing
3. Curing
4. Ventilation
5. Storage and organization
6. Printer mods that fix an actual problem

A shiny mod doesn't help if I still don't know where to put a dripping build plate.

## One thing I already got wrong

When moving my resin equipment, I left it in my truck on a warm day before getting it into the garage. Nothing bad happened, but it was a reminder to treat resin and anything that's touched it as temperature-sensitive and contaminated. Residue can hide in vats, seams, holes, and build plates even when something looks mostly clean.

I've also had cured resin end up in places I didn't want it on another resin machine. That's why this setup has a defined dirty zone from day one.

## What I'd do differently

This will change as I use the setup. So far the lesson is: **design the resin workflow before filling the printer.** I started with "where does the printer go?" The better question is "where does everything go after the print finishes?"

## What's next

- my actual dirty-wash and clean-wash setup
- curing workflow
- the exhaust build
- first-print experience
- which Saturn 4 Ultra mods are worth it, and which accessories turned out unnecessary

When one of these gets big enough, I'll split it into its own guide and link it here.
