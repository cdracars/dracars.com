---
title: Voron V0.2 Recovery and Conversion
slug: voron-v02-recovery
launchGroup: established
launchOrder: 60
description: Pinkie is an LDO Voron 0.1 being converted to 0.2; the machine record documents its configuration, recovery work, and unfinished enclosure and calibration tasks.
featuredImage: /images/pinkie-voron-v0.jpg
featuredImageAlt: Pinkie's enclosed black Voron V0 with magenta printed parts, clear panels, and the illuminated interior visible.
purpose: Keep Pinkie's current configuration, dated recovery and conversion work, and unresolved next steps together.
status: operational
statusLabel: Stable
phase: Stable during V0.2 conversion
updatedAt: 2026-10-13
statusNote: Cody confirmed Pinkie is stable and operational on October 13, 2026; enclosure and calibration work remain tracked as follow-up.
nextAction: Complete the enclosure, rerun input shaping, and confirm the current physical conversion state.
focus:
  - V0.1 to V0.2 conversion: reuse electronics, motion, and wiring while reprinting the printed parts
  - Mini Stealthburner, Bondtech LGX Lite, and Dragon BMO current toolhead configuration
  - Kalico, Katapult, Raspberry Pi host changes, and print calibration
  - Enclosure completion and current physical configuration
equipment:
  - LDO Voron 0 kit, currently recorded as a V0.1 to V0.2 conversion in progress; build volume 120 × 120 × 120 mm.
  - BTT SKR Mini E3 V2, Raspberry Pi 4B, Katapult bootloader, and Kalico.
  - Mini Stealthburner, Bondtech LGX Lite, Dragon BMO hotend, hard endstops, no probe, and PEI bed in the October 12 machine record.
problems:
  - Bed heat-up once stalled near 102.6 °C at full PWM; a later check reached 110.01 °C, but the cause remains unknown. Keep heater safety limits in place.
  - Extruder rotation distance is approximate (~5.7) and needs final calibration.
  - Enclosure completion and a post-enclosure input-shaper run remain active tasks; the latest physical state needs confirmation.
---

Pinkie's 3DBrain record describes an LDO V0.1 being converted to V0.2 by reusing electronics, motion parts, and wiring while reprinting the printed parts. It lists a Mini Stealthburner, LGX Lite, Dragon BMO, hard endstops, and a PEI bed as the October 12 configuration. The notes do not establish which of those parts were present at pickup, when each conversion step happened, or why the conversion began; the linked Build Log keeps those gaps visible.

The dated record also covers Kalico and input-shaper setup, PLA calibration, a Raspberry Pi 3B-to-4B move, and fixes for intermittent Pi power, a missing `exclude_object` configuration, and a misplaced display ribbon. A bed-heating stall near 102.6 °C later reached 110.01 °C, but its cause was not found. As of the October 12 record, the printer was described as operational during the conversion, with enclosure completion, final extruder calibration, and another input-shaper run still planned. Check the live state before treating that as current.
