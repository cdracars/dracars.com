---
title: SV08 Reliability Lab
slug: sv08-reliability-lab
launchGroup: active
launchOrder: 40
description: Troubleshooting the SV08 as a changing system, with the hardware, wiring, and fault history kept together.
purpose: Track reliability work and troubleshooting on the SV08 over time.
status: troubleshooting
phase: Fault finding and reliability work
updatedAt: 2026-10-13
statusNote: Launch scope and status supplied October 12, 2026; exact configuration and active faults need a fresh check.
nextAction: Recheck whether the monitored Z, gantry, and bed-positioning issues persist, then record the next reproducible fault or fix.
equipment:
  - Sovol SV08 350 mm CoreXY with mainline Klipper, Mainsail, Moonraker, stock SV08 control board, Raspberry Pi, and stock planetary direct-drive extruder.
  - Full acrylic enclosure with printed tophat, Klipper Expander, INKBIRD SSR-40 DA bed relay, and Crowsnest camera.
  - Stock inductive probe; input shaping and adaptive bed mesh are configured. The Bambu TZ3.0 hotend is documented as an alternate, not the primary installed hotend.
problems:
  - Z1 had a TMC reset during QGL; a related Z-offset issue was attributed to possible 24 V rail instability. Monitor and check the connector/harness and rail if it recurs.
  - The gantry had overnight sag after loose Z-belt tension; belts were retensioned in April 2026 and the sag was to be monitored.
  - The custom PEI bed sheet can shift because it has no positional locator.
  - Per-material ABS/ASA pressure advance and batch profiles remain unfinished; a Cartographer probe and bed-tension modification are planned, not installed.
focus:
  - Anthead and Orbiter configuration
  - EBB36, thermistor, CAN, and H36 issues
  - Filament sensor plans
  - Camera and wiring concerns
---

Hoss's 3DBrain record, last updated October 12, 2026, describes an SV08 350 running mainline Klipper, with its enclosure, camera, adaptive bed mesh, QGL, and input shaping in place. A read-only check that day found Klipper and Moonraker active and captured the live configuration. That confirms the services were running at the time of the check; it does not establish that every print workflow was tested.

The records separate resolved setup faults from issues to monitor. Earlier fixes include a bad hotend thermistor setting that caused brittle prints, probe points that could drive the nozzle into the bed, and a startup macro that referenced a chamber sensor not present in the live configuration. Z1 resets, possible 24 V rail instability, overnight gantry sag, and a shifting PEI sheet remain documented monitor items. The notes do not say whether those symptoms have recurred since their last entries, so this page tracks them as checks rather than current failures.
