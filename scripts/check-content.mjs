#!/usr/bin/env node
// Content checks for published Workshop projects, Build Logs, and Guides.
// Run: node scripts/check-content.mjs [base-ref]   (e.g. origin/main)
//
// Always checked:
//   - Internal-note phrasing that should not reach readers ("Cody confirmed", "3DBrain", ...).
//   - updatedAt dates in the future.
// With a base ref (pull requests):
//   - A project's status fields changed while updatedAt is older than the commit -> error.
//   - Any other published content change in the same situation -> warning (typo fixes are fine).
//   A same-day update to a page already dated today passes.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["content/projects", "content/build-logs", "content/guides"];
// Frontmatter keys that record a project's current state; changing them is a dated update.
const STATE_KEYS = ["status", "statusLabel", "statusNote", "phase", "nextAction", "equipment", "problems", "workstreams", "phases"];
const INTERNAL_PHRASES = [
  [/\bCody (?:confirmed|reports|reported|identified|says|said)\b/, "third-person note about Cody; write it in first person or as a dated fact"],
  [/\b3DBrain\b/, "internal notes system name; say \"my machine notes\""],
  [/launch inventory/i, "internal planning phrase"],
  [/user-supplied/i, "internal provenance phrase"],
];

const errors = [];
const warnings = [];
const inActions = !!process.env.GITHUB_ACTIONS;
const report = (list, level, file, message) => {
  list.push(`${file}: ${message}`);
  if (inActions) console.log(`::${level} file=${file}::${message}`);
};

// Split "---" frontmatter into top-level keys, each with its raw text (including indented lines).
function frontmatter(text) {
  const match = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { keys: {}, body: text };
  const keys = {};
  let current = null;
  for (const line of match[1].split("\n")) {
    const key = line.match(/^([A-Za-z][\w-]*):/);
    if (key) { current = key[1]; keys[current] = line.slice(key[0].length).trim(); }
    else if (current) keys[current] += "\n" + line;
  }
  return { keys, body: match[2] };
}

const today = new Date().toISOString().slice(0, 10);
const files = DIRS.flatMap((dir) => existsSync(join(ROOT, dir)) ? readdirSync(join(ROOT, dir)).filter((f) => f.endsWith(".md")).map((f) => `${dir}/${f}`) : []);

for (const file of files) {
  const text = readFileSync(join(ROOT, file), "utf8");
  const { keys } = frontmatter(text);
  if (keys.draft === "true") continue;
  for (const [pattern, why] of INTERNAL_PHRASES) {
    const hit = text.match(pattern);
    if (hit) report(errors, "error", file, `"${hit[0]}" — ${why}`);
  }
  if (keys.updatedAt && keys.updatedAt > today) report(errors, "error", file, `updatedAt ${keys.updatedAt} is in the future`);
}

const base = process.argv[2];
if (base) {
  const changed = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`, "--", ...DIRS], { cwd: ROOT, encoding: "utf8" })
    .split("\n").filter((f) => f.endsWith(".md") && existsSync(join(ROOT, f)));
  for (const file of changed) {
    let before;
    try { before = execFileSync("git", ["show", `${base}:${file}`], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); }
    catch { continue; } // new file
    const old = frontmatter(before);
    const now = frontmatter(readFileSync(join(ROOT, file), "utf8"));
    if (now.keys.draft === "true") continue;
    // Date of the latest commit touching this file; updatedAt on or after it is current.
    const changedOn = execFileSync("git", ["log", "-1", "--format=%cs", "HEAD", "--", file], { cwd: ROOT, encoding: "utf8" }).trim() || today;
    if ((now.keys.updatedAt ?? "") >= changedOn) continue;
    const stateChanged = file.startsWith("content/projects/") ? STATE_KEYS.filter((k) => (old.keys[k] ?? "") !== (now.keys[k] ?? "")) : [];
    if (stateChanged.length) {
      report(errors, "error", file, `changed ${stateChanged.join(", ")} on ${changedOn} but updatedAt is ${now.keys.updatedAt}; move it to the date of the new facts`);
    } else if (before !== readFileSync(join(ROOT, file), "utf8")) {
      report(warnings, "warning", file, `content changed on ${changedOn} but updatedAt is ${now.keys.updatedAt}; fine for a typo fix, move it for new facts`);
    }
  }
}

for (const w of warnings) console.log(`WARN ${w}`);
for (const e of errors) console.log(`FAIL ${e}`);
console.log(`check-content: ${files.length} files, ${errors.length} error(s), ${warnings.length} warning(s)${base ? ` against ${base}` : ""}`);
if (errors.length) process.exit(1);
