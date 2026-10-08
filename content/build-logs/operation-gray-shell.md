---
title: "Operation: Gray Shell: a Box Turtle 1.1 beta build"
slug: operation-gray-shell
description: "A running build log for a Box Turtle 1.1 beta with an early Longboi 1.0 prototype, Smol v2 lanes, and a few lessons from reprinting parts."
publishedAt: 2026-09-20
updatedAt: 2026-10-08
indexImage: /images/build-logs/operation-gray-shell/07-finished-box-turtle.jpg
author: Dracars
category: projects-builds
status: current
projectState: building
statusNote: Mechanical build assembled — CAN cable, AFC setup, and serial Turtle still pending
featured: false
tags: [box-turtle, longboi, afc, smol-v2, multi-material, 3d-printing]
testedWith:
  - Box Turtle 1.1 beta hardware
  - An early Longboi 1.0 prototype supplied by Robert Klotz, the Box Turtle project's creator
  - Smol v2 lane design, used here instead of the Apex extruders expected in production kits
  - FDM-printed build parts, including reprints after printer tuning
affiliateLinksPresent: false
---

:::tldr Current state
- I joined the Box Turtle 1.1 beta because I wanted hands-on experience building a beta release.
- This build pairs the beta hardware with an early Longboi 1.0 prototype and the Smol v2 lane design.
- Longboi gives each lane the same wire length, which made clean wiring much easier.
- A few early printed parts had to be redone after I tuned the printer. Better calibration before the build would have saved time.
- The mechanical build is assembled. I still need to make the CAN cable, configure the lanes in AFC, and print the serial Turtle.
:::

## Why I joined the beta

Box Turtle 1.1 was released as a patron beta, and I wanted to be part of a beta build rather than wait for a finished kit. That means this is a record of a real in-progress build, including the choices that made it different from a standard kit.

Robert Klotz, the mind behind the Box Turtle project, got me one of the early Longboi prototypes. The finished system is a Box Turtle 1.1 paired with Longboi 1.0.

## The hardware choices

This build uses the **Smol v2** lane design, an alternative to the Apex extruders expected to ship in production kits. The notable benefit of the Longboi arrangement is wiring: every lane uses wires of the same length. That repeatability made routing the wiring cleanly much easier than measuring and managing a different run for each lane.

!photo 01-side-open-assembly.jpg | An early open-frame view shows the lane hardware and wiring before the covers went on.

!photo 02-internal-lanes.jpg | Inside the frame, the lane assemblies and their wiring are visible together.

I’ll add the final lane configuration and any differences I find in day-to-day use once AFC is set up and the system is commissioned.

## Bringing the lanes together

The early photos show the Longboi and Box Turtle coming together in stages. The lane carriage was fitted across the top of the frame, then I worked through the front lighting and trim details.

!photo 03-lane-carriage-layout.jpg | The lane carriage and printed parts laid across the Box Turtle frame during assembly.

!photo 04-led-panel-detail.jpg | A close look at the front panel detail and its LED strip.

## Why it is called Gray Shell

The gray color started as an accident. I began printing parts with the filament already loaded in the printer, which was gray. Someone joked that it was a mono-color Turtle, and the name **Gray Shell** stuck.

It is a good example of a build picking up its own identity while it is still on the bench. The color was never a planned theme; it became one because I kept going with the material I had loaded.

!photo 05-assembled-spool-side.jpg | The assembled unit with the Longboi spools and front panel in place.

!photo 06-spool-lanes-top.jpg | Looking down at the spool lanes and printed guides on the assembled frame.

!photo 07-finished-box-turtle.jpg | The finished Gray Shell setup with spools loaded and the front lighting on.

## The thing I would change

I would make sure the printer was dialed in before starting the parts run. My early printer tuning was not good enough, so I had to reprint several of the first parts. Nothing about the design caused that delay; it was avoidable setup work.

For a future build, I would print and inspect a small group of fit-critical parts first, correct printer tuning if necessary, and only then commit to the full parts set.

## What is left

The build is physically assembled, but it is not finished. The remaining work is:

- build the CAN cable
- configure the lanes in AFC
- print the serial Turtle

I’ll update this log after those steps are complete, including what commissioning turns up and whether the clean wiring stays as easy to service as it was to assemble.
