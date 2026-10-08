---
title: "SafeSync: a small backup helper that outgrew its first job"
slug: safesync
description: "A build log for a small Git-backed helper first made to protect OrcaSlicer profiles."
publishedAt: 2026-10-08
updatedAt: 2026-10-08
indexImage: /images/build-logs/safesync/01-app-interface.png
author: Dracars
category: tools-software
status: current
projectState: in-use
statusNote: Kept as a generic configuration-backup helper
tags: [backup, git, orcaslicer, configuration]
testedWith:
  - Important application configuration folders
  - Git-backed backups with SafeSync
affiliateLinksPresent: false
---

:::tldr The build in brief
- SafeSync started as a way to back up OrcaSlicer profiles.
- That specific need is less urgent now, but the small Git-based helper remains useful for other configuration folders.
- It is deliberately a helper, not a full backup product.
:::

## The first job was protecting slicer profiles

SafeSync began as a way to keep OrcaSlicer profiles backed up. Losing configuration that took time to tune is annoying, and a small Git-backed helper was enough for the job.

!photo 01-app-interface.png | SafeSync backup.sh dry run on a disposable example profile folder, showing one detected untracked file and the planned backup. No remote was configured. Captured October 8, 2026.

That original use is not as necessary for me anymore, but the idea held up: there are plenty of important configuration folders that benefit from a simple, inspectable backup history.

## Keep the helper small

SafeSync is a generic Git-based configuration backup helper. It is not meant to compete with a broad backup product. The value is a lightweight way to keep a folder under versioned backup when that is the right level of protection.

## Try it

[View SafeSync on GitHub](https://github.com/cdracars/SafeSync).
