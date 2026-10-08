---
title: "Stitch Shaper: from dice and crochet math to a usable tool"
slug: stitch-shaper
description: "A build log for a crochet shaping tool whose math was distilled by the person who needed it."
publishedAt: 2026-10-08
updatedAt: 2026-10-08
indexImage: /images/build-logs/stitch-shaper/01-app-interface.png
author: Dracars
category: tools-software
status: current
projectState: in-use
statusNote: Live browser tool
tags: [crochet, math, maker-tool, browser-tool]
testedWith:
  - Stitch-shaping calculations for rows and rounds
affiliateLinksPresent: false
---

:::tldr The build in brief
- Stitch Shaper began with my wife working through shaping decisions with dice.
- She worked with Claude to distill the crochet math into a fillable spreadsheet-style table.
- I made that work easier to use as a browser tool; the shaping logic is hers.
:::

## The math came first

My wife was rolling dice while working through crochet shaping. She then worked with Claude to distill the underlying math and build out a fillable, spreadsheet-style table.

That was the hard part. The useful logic did not come from me deciding what crochet math should be. My job was making the work she had already done easier to use.

!photo 01-app-interface.png | Stitch Shaper in By Count mode, showing an increase example with 30 current stitches and 6 changes. Captured October 8, 2026.

## Making the table less like a table

Stitch Shaper calculates evenly spaced increases and decreases for a row or round. The browser tool keeps the practical outcome of the fillable table while making it faster to reach during a project.

It is a good example of a tool that started with someone doing real domain work, then needed a friendlier interface—not a software idea hunting for a problem.

## Credit where it belongs

The shaping method and the effort to distill it belong to my wife. I built the interface around it so the result could be used without rebuilding the worksheet every time.

## Try it

[Open Stitch Shaper](https://stitch-shaper.dracars.com/).
