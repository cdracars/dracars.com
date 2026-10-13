---
title: SV06 Plus: TPU and 3MS
slug: sv06-plus-tpu-3ms
launchGroup: active
launchOrder: 50
description: Sam is a fully operational SV06 Plus workhorse; the 3MS project is on hold while AFC compatibility is explored.
featuredImage: /images/sam-sv06-plus.jpg
featuredImageAlt: Sam, an open-frame Sovol SV06 Plus with its nameplate visible.
purpose: Keep the SV06 Plus firmware, TPU workflow, MMU behavior, and toolhead experiments together.
status: experimental
phase: Working / experimental
updatedAt: 2026-10-13
statusNote: Launch scope and status supplied October 12, 2026; configuration and current behavior need a fresh check.
nextAction: Explore whether the 3MS can work with AFC, then document the compatibility path before resuming the project.
equipment:
  - Standard Sovol SV06 Plus (not the ACE), running Klipper with a BTT Pi V1.2, Mainsail, and Moonraker.
  - ADXL345 accelerometer connected through an RP2040; the recorded input-shaper values predate the Pi and camera mounted on the moving gantry.
  - Direct-drive extruder, stock inductive probe, 300 × 300 mm textured PEI bed, and a TH3D 5015 part-cooling blower.
  - The 3MS material system is on hold while AFC compatibility is explored; Happy Hare is no longer the planned integration direction.
problems:
  - Input-shaper calibration is stale after adding moving mass to the Z gantry; a new Shake&Tune run is needed.
  - A March 2025 tall-print test had a layer shift; the cause was not confirmed. The frame is unbraced and tall-Z flex remains a concern.
  - The mainboard cooling fan is electrically tied to the part-cooling fan; separating them requires a hardware change.
focus:
  - Klipper setup and TPU workflow
  - 3MS MMU, on hold while exploring AFC compatibility instead of Happy Hare
  - Gate distances and unloading behavior from the earlier integration work
  - Future cutter and inline sensor work
  - Toolhead experiments
---

Sam's 3DBrain record, last updated October 12, 2026, describes the printer as fully operational and used for large-format and batch work. It records Klipper on a BTT Pi V1.2, Mainsail and Moonraker, and a Logitech C270 mounted on the Z gantry. Cody confirmed on October 13 that the 3MS work is on hold while he explores making it compatible with AFC instead of Happy Hare. The 3MS is not presented as an active, working integration.

The notes also record a resolved January 2025 jam caused by a loose nozzle mounting screw and loose toolhead-board cables, and a March 2025 test print with a layer shift high in the print. The latter's cause remains uncertain. Input shaping is marked stale after the Pi and camera were added to the moving gantry, and the frame-bracing work is still a plan. The project page tracks those machine constraints alongside the TPU and multi-material workflow.
