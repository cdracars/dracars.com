## Build Log backlog

These are possible logs, not commitments to publish every project. A project can be unfinished and still make a useful log: record what happened, when it happened, what changed, and its current state. Mark plans as plans. Before publishing older work, check the photos, dates, project name, and details against the actual build.

### Current and recent projects

- [ ] **SV06 Plus: Klipper, TPU, and the 3MS MMU**
  - **Why it may be a log:** This printer has evolved into a development machine for TPU printing and multi-material work. The MMU work has enough tuning and troubleshooting to support a series of dated entries.
  - **Known threads:** Adding Klipper; developing a two-gate 3MS setup with Happy Hare v3.3.0 and a virtual selector; changing gate parking distance from 682 mm to 672 mm; tuning unloading; considering an inline sensor, cutter, and toolhead changes.
  - **Writing approach:** Start with the printer’s original role and what prompted the Klipper/MMU work. Then document each real configuration change and its result. Keep the cutter, inline sensor, and uncompleted toolhead options in a “Next steps” section until installed and tested.
  - **Confirm before writing:** Which changes are already installed and working, what the printer’s current configuration is, and which photos or configuration notes are available.

- [ ] **SV08: toolhead changes and CAN troubleshooting**
  - **Why it may be a log:** The toolhead has gone through a substantial configuration, and the problems encountered are useful context for other SV08 owners.
  - **Known threads:** Anthead, Trianglelab CHC/CHBVZ, Orbiter 2, and EBB36 v1.2; thermistor errors; H36 failures; and CAN “No buffer space available” errors. The SFS 2.0 sensor setup is a separate future thread unless it has since been installed.
  - **Writing approach:** Treat the toolhead setup and the troubleshooting as dated updates in one SV08 log. For each issue, record the symptom, what you checked, what you changed, and whether the fix held.
  - **Confirm before writing:** Current toolhead configuration, which faults are resolved, what remains unreliable, and whether the sensor changes are still planned.

- [ ] **Box Turtle: “Operation: Gray Shell”**
  - **Why it may be a log:** It already has a project name and a first post. Continuing the log can show the real build sequence rather than presenting the finished machine without its context.
  - **Known threads:** Box Turtle 1.1 build with Longboi 1.0.
  - **Writing approach:** Keep updates chronological. Include parts and versions, assembly decisions, fit issues, changes made during the build, and what you would do differently. Link the first post and later updates together.
  - **Confirm before writing:** Which stages are complete, the current build state, and which photos belong to which stage.

- [ ] **Resin workspace: the garage grow-tent setup**
  - **Scope:** The shared workspace for the Photon P1 and Saturn 4 Ultra: layout, floor protection, spill response, ventilation, and wash/cleanup workflow.
  - **Log structure:** This is the parent workspace log. Once the direct P1 and Saturn logs are published, link to them where a decision concerns one machine specifically, and link back from both printer logs. Keep the workspace log focused on shared setup and workflow.
  - **Current state:** The tent is assembled, but the workspace and workflows are still being developed. The Saturn is not ready to print: it came with two boxes of parts, and the vat has not been found among the items checked so far; it may still be in one of those boxes. Record installed and tested setup separately from plans.
  - **Guide boundary:** Keep the Saturn setup guide marked Coming Soon until the printer is complete and the workspace and workflows have been used and tested.

- [ ] **Anycubic Photon P1: setup**
  - **Scope:** The P1's setup, configuration, and use.
  - **Log structure:** Record P1-specific milestones chronologically. Link to the [resin workspace log](content/build-logs/resin-grow-tent-setup.md) for shared setup and workflow decisions, and to the Anycubic Wash & Cure 3 Max repair log when its condition affects the P1 workflow.
  - **Confirm before writing:** P1 setup, current configuration, and use so far.

- [ ] **Anycubic Wash & Cure 3 Max: diagnosis and repair**
  - **Scope:** The Wash & Cure 3 Max picked up for the P1/Saturn resin setup.
  - **Known state:** It powers on and the display lights up, but its function has not been confirmed. Cured resin is in the lines.
  - **Writing approach:** Record its initial condition, inspection, repair attempts, parts, and outcome as dated updates. Keep the cause and repair result open until confirmed.
  - **Cross-links:** Link to this log from the resin workspace, Photon P1, and Saturn 4 Ultra logs wherever the unit affects setup or workflow. Keep the repair details in this dedicated log.

- [ ] **Elegoo Saturn 4 Ultra 12K: unpacking and completing setup**
  - **Scope:** Inventorying the printer and included parts, resolving what is missing, and getting it to a ready-to-print state.
  - **Current state:** Two boxes of parts came with the printer. The vat has not been found among the items checked so far and may be in one of those boxes. The printer is not ready to print.
  - **Log structure:** Start with the as-received condition and box inventory. Add dated updates as parts are found, the vat is installed, and setup checks are completed. Link to the resin workspace log for shared workspace decisions and the Wash & Cure 3 Max log where its condition affects workflow.
  - **Next step:** Check both boxes and confirm the vat and other required parts before documenting print tests.

### Earlier printer builds and conversions

- [ ] **Voron V0: buying and bringing home the used LDO kit**
  - **Why it may be a log:** This is the story before the existing V0.1 → V0.2 conversion draft: how the used printer arrived and what you found when you assessed it.
  - **Known details to check:** Bought used for $290 on Facebook Marketplace from a clarinet machine shop. The shop had used it to quickly prototype parts, including clarinet reeds, and was moving its prototyping work to A1 Minis. The machine is described as an LDO V0.1, with Mini SB and LGX Lite; Kirigami bed; LDO Batch 6 plates; SKR Mini E3 V2; single Neopixel; Dragon BMO hotend, with a Voron Revo available as a spare.
  - **Writing approach:** Record what was included, the condition on arrival, what worked, what needed attention, and which parts you kept or changed. Avoid implying all listed parts were present at purchase unless the original inventory confirms that.
  - **Confirm before writing:** Purchase date, as-received condition, initial photos, and which components were original versus later additions.

- [ ] **Voron V0.1 → V0.2 conversion**
  - **Why it may be a log:** The conversion already has a working draft and a distinct before-and-after story.
  - **Known threads:** LDO V0.1 converted to V0.2; later toolhead work included Dragonburner, Dragonfly, and LGX Lite. The machine has also run a 0.2 mm nozzle without a probe or mesh. A servo-brush idea was shelved after realizing it would not work with planned future V0 mods; identify those conflicting mods before writing the explanation.
  - **Writing approach:** Keep the conversion separate from the acquisition story, or make the acquisition the first dated entry in a larger V0 log. Explain the reason for each change and note what was reused.
  - **Confirm before writing:** Original photos still need to be transferred from iCloud on the home PC; verify the conversion steps, dates, and final configuration against the build.

- [ ] **Voron V0: host recovery after SD-card failure**
  - **Why it may be a log:** This could be a short, practical entry within the V0 log about recovering the printer host.
  - **Known thread:** The Pi 3B’s SD card failed; a USB 3.2 nano flash drive was used as the replacement boot device.
  - **Writing approach:** Capture the failure symptom, recovery steps, and whether the printer returned to service. Keep it concise unless the recovery involved more troubleshooting.
  - **Confirm before writing:** Exact recovery steps, dates, and whether any configuration or data had to be restored.

- [ ] **Voron 2.4 350: the original Formbot build**
  - **Why it may be a log:** The roadmap mentions later wiring and upgrades, but the original build and commissioning may be missing from the site.
  - **Known thread:** Formbot kit, 350 mm machine. Later work and questions include the Dragon Ace with a Volcano extender, Orbiter 2.5, MMU/AFC options, and the Goose Belt Purger.
  - **Writing approach:** If the original build is documented, make it the main V2.4 log. Add later modifications as dated updates rather than combining every change into one retrospective.
  - **Confirm before writing:** Whether an initial build log or photo set exists, original kit configuration, commissioning problems, and which upgrades were actually installed.

### Other projects to verify

- [ ] **Ender 3 V2: making a dependable printer for your nephew**
  - **Why it may be a log:** The repair and setup work can be useful even if the printer never becomes a major conversion project.
  - **Known threads:** Homing direction was corrected; thermal-runaway protection was enabled; the printer has a 4.2.2 STM32F103 board and BLTouch; the Z lead screw is out of round. MGN12H X-rail work and a direct-drive setup have also been considered.
  - **Writing approach:** Focus on what was checked and fixed, then give the printer’s current state. Keep future rail and direct-drive plans separate from completed work.
  - **Confirm before writing:** Which fixes are complete, whether BLTouch is enabled and working, and whether the X-rail or direct-drive changes happened.

- [ ] **Geeetech A10: learning the machine through incremental fixes**
  - **Why it may be a log:** This can show the real progression from a stock bed-slinger toward later modifications, including what you learned along the way.
  - **Known threads:** Stock A10 with glass bed and 3D Touch; homing and LCD relocation work; dual-Z links have been researched. A possible Switchwire/CoreXZ path is a future idea.
  - **Writing approach:** Start with the as-received machine and add entries only for work actually performed. Keep researched upgrades and conversion paths in a future-work section.
  - **Confirm before writing:** Which changes are installed, exact dates, and whether there are photos or notes from the early troubleshooting.

- [ ] **Geeetech M1: project history and surprises**
  - **Why it may be a log:** It is already named as a photo-archive candidate, but the project story and current state need to be reconstructed before deciding whether it deserves a public log.
  - **Writing approach:** Look for the original problem or goal, major changes, failures, and what happened to the machine. A short postmortem is fine if the project stopped early.
  - **Confirm before writing:** Exact project timeline, work completed, current status, and available photos.

- [ ] **Magpie: the 3D-printed printer build**
  - **Why it may be a log:** A printer built largely from printed parts could make a distinctive project story.
  - **Writing approach:** Document the design and source, printed-part choices, assembly, tuning, and how it performed. Be clear about which parts were printed and which were purchased.
  - **Confirm before writing:** Exact project name, printer design/version, build details, outcome, and whether the photos match this machine.

- [ ] **SV08 power-supply upgrade**
  - **Why it may be a log:** It is already on the candidate list and can stand alone from the SV08 toolhead work if the upgrade involved meaningful decisions or troubleshooting.
  - **Writing approach:** Record the reason for the change, compatibility checks, installation, and the result. Include the original and replacement specifications only after verifying them.
  - **Confirm before writing:** Whether the upgrade was completed, the exact parts used, and any before-and-after photos.

- [ ] **BT enclosure build**
  - **Why it may be a log:** It may be a substantial physical build, but the name alone is not enough to define its scope.
  - **Writing approach:** First establish what “BT” refers to and what the enclosure was meant to solve. If the build happened, capture the design constraints, materials, assembly, and result.
  - **Confirm before writing:** Full project name, purpose, printer or equipment involved, work completed, and photo set.

- [ ] **Prusa M3-to-4 upgrade work**
  - **Why it may be a log:** It is on the archive list, but the exact model and version naming need to be confirmed before it can be described accurately.
  - **Writing approach:** Treat it as a conversion log only if the upgrade work actually happened. Record the starting machine, upgrade path, parts reused or replaced, and final result.
  - **Confirm before writing:** Exact Prusa model/version, what “M3-to-4” means in this project, work completed, and the machine’s current disposition.

### Related tool and maker-project logs

- [ ] **TunePrint: building and improving a calibration tool**
  - **Why it may be a log:** TunePrint is live, but the roadmap currently captures its existence more than the work behind it. A development log could explain the real calibration problem it addresses and how the tool changed.
  - **Writing approach:** Record the original need, first useful version, changes made from actual calibration use, and current limitations. Keep future features clearly labeled as ideas until built.
  - **Confirm before writing:** Which features are live, what was learned from use, and whether there are screenshots or example calibration runs.

- [ ] **Sculpfun S9: setup and projects**
  - **Why it may be a log:** The S9 is part of the maker inventory, but there is not enough recorded project detail here to know whether it has a build or use story yet.
  - **Writing approach:** Add only if there was a setup, modification, material test, or finished project worth documenting. A first-use log is useful if it records real settings and results.
  - **Confirm before writing:** What work has actually been done with the laser and what photos or files exist.

### Archive review leads

These need a photo and project-history check before becoming public log commitments:

- [ ] **Voron 2.4 wiring and Goose Belt Purger** — identify which wiring work and purger changes were completed, and when.
- [ ] **BT enclosure** — confirm the project name, purpose, and build status.
- [ ] **Prusa M3-to-4** — verify the exact model and conversion details.
- [ ] **Geeetech M1** — reconstruct the project and its outcome.
- [ ] **Magpie** — confirm the exact design, name, and build details.
- [ ] **SV08 power-supply upgrade** — verify the installation and parts.
- [ ] **Photos from older projects** — transfer and sort originals before drafting retrospective entries.

Do not turn researched options into build logs unless they were installed or tested. Keep future work—such as the SV06 Plus cutter or inline sensor, SV08 SFS 2.0 setup, and printer conversion ideas—in the relevant project’s next-steps list until there is real progress to record.
