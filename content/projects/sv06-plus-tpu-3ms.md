---
title: SV06 Plus: TPU and 3MS
slug: sv06-plus-tpu-3ms
launchGroup: active
launchOrder: 50
description: Sam is a fully operational SV06 Plus workhorse in the machine record; this Workshop page follows the separate TPU and 3MS experiments, whose current setup still needs a live check.
purpose: Keep the SV06 Plus firmware, TPU workflow, MMU behavior, and toolhead experiments together.
status: experimental
phase: Working / experimental
updatedAt: 2026-10-13
statusNote: Launch scope and status supplied October 12, 2026; configuration and current behavior need a fresh check.
nextAction: Verify the live 3MS and Happy Hare setup, then refresh Sam's stale input-shaper calibration.
equipment:
  - Standard Sovol SV06 Plus (not the ACE), running Klipper with a BTT Pi V1.2, Mainsail, and Moonraker.
  - ADXL345 accelerometer connected through an RP2040; the recorded input-shaper values predate the Pi and camera mounted on the moving gantry.
  - Direct-drive extruder, stock inductive probe, 300 × 300 mm textured PEI bed, and a TH3D 5015 part-cooling blower.
  - The project notes describe a 3MS material system and Happy Hare workflow, but the 2026-10-12 machine record does not verify their current configuration.
problems:
  - Input-shaper calibration is stale after adding moving mass to the Z gantry; a new Shake&Tune run is needed.
  - A March 2025 tall-print test had a layer shift; the cause was not confirmed. The frame is unbraced and tall-Z flex remains a concern.
  - The mainboard cooling fan is electrically tied to the part-cooling fan; separating them requires a hardware change.
focus:
  - Klipper setup and TPU workflow
  - 3MS MMU, Happy Hare, gate distances, and unloading behavior
  - Future cutter and inline sensor work
  - Toolhead experiments
---

Sam's 3DBrain record, last updated October 12, 2026, describes the printer as fully operational and used for large-format and batch work. It records Klipper on a BTT Pi V1.2, Mainsail and Moonraker, and a Logitech C270 mounted on the Z gantry. The machine record is detailed about Sam's hardware and calibration history, but it does not confirm the current 3MS or Happy Hare setup. This page keeps those material-handling experiments in view without treating their latest state as verified.

The notes also record a resolved January 2025 jam caused by a loose nozzle mounting screw and loose toolhead-board cables, and a March 2025 test print with a layer shift high in the print. The latter's cause remains uncertain. Input shaping is marked stale after the Pi and camera were added to the moving gantry, and the frame-bracing work is still a plan. The project page tracks those machine constraints alongside the TPU and multi-material workflow.
