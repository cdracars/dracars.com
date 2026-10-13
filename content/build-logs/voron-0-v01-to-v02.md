---
title: "Voron 0: From v0.1 to v0.2"
slug: voron-0-v01-to-v02
description: "The documented recovery, conversion plan, and ongoing work on Pinkie, an LDO Voron 0.1 being converted to 0.2."
publishedAt: 2026-10-08
updatedAt: 2026-10-13
author: Dracars
category: projects-builds
status: current
projectState: building
statusNote: Draft — pickup condition, conversion trigger, and completion status need confirmation
featured: false
tags: [voron-0, 3d-printing, upgrades]
testedWith:
  - Pinkie, LDO Voron 0.1 → 0.2 conversion notes in 3DBrain, last updated 2026-10-12
affiliateLinksPresent: false
draft: true
---

:::tldr The documented story so far
- Pinkie is an LDO Voron 0.1 kit printer that was bought used from a clarinet machine shop for $290. The records do not yet describe its condition at pickup or confirm which listed parts were included then.
- The conversion plan is to reuse the electronics, motion system, and wiring, and reprint the Voron 0.2 parts. The notes call the printer operational during the conversion, but do not record what prompted the conversion or when the mechanical work happened.
- Dated records cover firmware and tuning work, a Raspberry Pi upgrade, and several fixes. They also document an unresolved bed-heating incident and unfinished enclosure and calibration work.
- A 2026-10-12 live-config check found Klipper and Moonraker active. The next recorded build step is to complete the enclosure and rerun input shaping; confirm the printer's present state before publishing this as current.
:::

## Pinkie when I picked it up

I bought Pinkie used for $290 through Facebook Marketplace from a clarinet machine shop. The shop had used the printer for quick prototypes, including clarinet reeds, and was moving that work to A1 Minis.

The notes identify it as an LDO Voron 0.1 kit. They do not say what condition it was in at pickup, what it could print then, or which of its now-documented parts were already installed. I have left that inventory open rather than treating today's configuration as the original one.

## Why a v0.1 → v0.2 conversion

The project record describes a conversion from 0.1 to 0.2: reuse the electronics, motion parts, and wiring, while reprinting the printed parts. The reason I chose to do that, and the date I started, are not in the notes I have so far. The conversion remained in progress in the latest project record, with the printer described as operational during the work.

## What changed and what stayed

The documented conversion approach keeps the electronics, motion system, and wiring and replaces the printed parts with the 0.2 parts. Pinkie's current record lists a Mini Stealthburner toolhead, Bondtech LGX Lite extruder, Dragon BMO hotend, hard endstops, and no probe. It does not establish which of those items came with the used printer and which were installed during the conversion, so this is a current configuration snapshot, not a before-and-after parts list.

Other dated changes and repairs are recorded alongside the conversion:

- **March 2026:** The V0.1 was assembled and printing. The notes record Klipper, Mainsail, Moonraker, Katapult, an ADXL345, a chamber thermistor, a Siboor RGB LED stick, and a Daygreen 24-to-5 V supply for the Pi.
- **April 16, 2026:** Kalico was flashed through Katapult. The notes say Kalico was chosen for sensorless-homing support and 0.2 compatibility. Sensorless homing and input shaping were tuned.
- **April 22, 2026:** PLA calibration recorded a 220 °C nozzle temperature, 60 °C bed temperature, 0.03 pressure advance, 0.97 flow ratio, and a conservative 4.0 mm³/s maximum volumetric speed with a 0.2 mm nozzle. A print detached during testing; washing the PEI sheet with IPA fixed the adhesion issue.
- **May 1, 2026:** The host moved from a Raspberry Pi 3B to a Pi 4B. The Klipper MCU service had to be rebuilt for the new host. The Pi's intermittent power problem was addressed first with a GPIO feed and later with a Daygreen-powered micro-USB pigtail.
- **August 2026:** A display ribbon was moved from the camera DSI connector to the display DSI connector, restoring the 800×480 display according to the project notes. A bed heat-up stalled near 102.6 °C at full PWM on one occasion; a later check reached 110.01 °C. The cause was not established, so the notes say to retain Klipper's heater safety limits.

These dated entries show printer setup, calibration, and recovery work. They do not yet give a dated sequence for the physical 0.1-to-0.2 rebuild itself.

## What worked, failed, and remains uncertain

The records describe successful calibration and a fix for the dirty-bed adhesion problem. They also document a loose GPIO power connection that caused Pi crashes during Klipper restarts; the later micro-USB pigtail supplied a stable 5.03 V in the recorded check. The display worked again after its ribbon was moved to the correct DSI port.

The bed-heating event is unresolved: one heat-up stalled near 102.6 °C, while a later check reached 110.01 °C. The cause is unknown. An August note also reports MCU communication retries and restart transients, with no recurring cause established. The current notes flag the extruder rotation distance (about 5.7) for final calibration.

Several conversion details still need a first-hand check: the initial pickup condition and inventory, why the conversion began, which parts were physically reprinted or transferred and when, whether the enclosure is now complete, and Pinkie's exact current operational state. A servo-brush idea was shelved because it conflicted with planned V0 modifications, but the notes I reviewed do not identify those modifications or the brush's intended use.

## Current state and next step

The latest Pinkie record, updated October 12, 2026, describes the printer as mid-conversion and operational. A read-only live-config check that day found Klipper and Moonraker active. The record lists completion of the enclosure, final extruder rotation-distance calibration, and a new input-shaper run after the enclosure as active tasks. It also lists a second LED stick, a camera, electronics-bay cable management, and a runout sensor as future work.

The next planned build step in the notes is to finish the enclosure and rerun input shaping. Before this log is published as a current account, I need to confirm what has changed since October 12 and add the missing pickup and conversion details. Photos can be added after the written sequence and captions are checked.
