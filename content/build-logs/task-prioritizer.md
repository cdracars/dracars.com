---
title: "Task Prioritizer: one decision at a time"
slug: task-prioritizer
description: "A build log for a small tool born from ADHD prioritization overload: compare two tasks and decide what matters more right now."
publishedAt: 2026-10-08
updatedAt: 2026-10-08
indexImage: /images/build-logs/task-prioritizer/01-app-interface.png
author: Dracars
category: tools-software
status: current
projectState: in-use
statusNote: Live browser tool
tags: [adhd, prioritization, productivity, browser-tool]
testedWith:
  - Pairwise task comparisons in Task Prioritizer
  - Importing and exporting organized task lists
affiliateLinksPresent: false
---

:::tldr The build in brief
- Task Prioritizer started with a real prioritization problem at home, not a plan to make another productivity app.
- When there are many tasks, comparing two at a time can be easier than trying to rank everything at once.
- The tool asks which of two tasks matters more, turns those choices into an ordered list, and lets that list move into the LLM-supported workflow used to keep track of it.
:::

## The problem was too many tasks at once

My wife has ADHD and asked for help with prioritization when there are many tasks competing for attention. Looking at a whole list and deciding its complete order was the hard part.

Comparing two tasks was different. Which one is more important? Which one can she do? That is a smaller, more answerable decision. Task Prioritizer was built around that move rather than another scoring formula.

## A small tool for a smaller question

The tool turns a pile of tasks into an ordered list by presenting two choices at a time. It does not promise to know what someone *should* do. It just gives the person a way to express the priorities they can see in the moment.

That constraint is the point. The useful thing was not a complicated productivity system; it was reducing one overwhelming question into a sequence of manageable ones.

!photo 01-app-interface.png | Task Prioritizer’s empty-list interface, showing bulk import and its explanation of local saving and export. Captured October 8, 2026.

## The organized list has to keep moving

Getting a list into order is only part of the job. My wife uses an LLM to help keep track of the list once it has been organized, so Task Prioritizer includes import and export rather than treating its result as a dead end.

That keeps the tool focused on the decision it is good at—sorting a crowded list—while fitting into the process she already uses to maintain it.

## What this is for

Task Prioritizer is a browser tool for getting unstuck when the list is bigger than the available executive function. It is free to use and deliberately narrow.

## Try it

[Open Task Prioritizer](https://task-prioritizer.dracars.com/).
