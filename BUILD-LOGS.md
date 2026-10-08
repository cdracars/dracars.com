# Build Logs

Build Logs are honest project journals for hardware and software work. They
record why a project happened, the decisions and constraints that shaped it,
and what remains uncertain. They are not portfolio case studies or launch
announcements.

## The story to tell

Start with a real trigger: a task, annoyance, failed workflow, question, or
conversation that led to the project. Preserve the human wording when it adds
specificity, but edit it lightly enough to keep the writing clear.

For software, the most useful narrative seams are usually:

- the small job that made the tool worth building;
- a constraint that materially shaped it, such as privacy, static hosting, or
  browser compatibility;
- a tradeoff or edge case that required a real decision;
- what changed after the initial build, if anything; and
- the tool's modest place in the world, including an existing alternative when
  that context matters.

Do not manufacture an origin story, user demand, test result, deployment
health claim, or personal lesson. Repository history, source code, and project
documentation can support technical claims. Confirm first-person context,
personal use, browser or device testing, and real outcomes with Cody.

## Evidence and voice

Write directly and calmly. A little unvarnished language is welcome when it is
real; it should make the journal feel lived-in, not performative.

- State what the project demonstrably does.
- Name limitations and dependencies plainly.
- Frame opinions as decisions or preferences, not facts.
- Keep an app's claim of usefulness modest. It can be a convenient independent
  option without needing to displace an existing official solution.
- When a claim comes from a commit rather than a release record, say the work
  was committed or built—not necessarily publicly launched.

## Project state

Every build log uses `projectState` independently of `status`. `projectState`
describes the work's lifecycle; `status` describes how recently the log was
reviewed. Use:

- `in-use` when the project is usable and mostly settled for now. This does not
  mean it is permanently finished; it may be revisited later.
- `testing` when the build exists but is still being validated before regular
  use.
- `building` while active construction or implementation remains underway.

## Images

For software logs, lead with a real app screenshot whenever practical. Caption
it as the interface at the time the log was updated; it is evidence, not a
timeless product mockup.

Generated or editorial art is optional and belongs later in the story. Keep it
only when it clarifies a constraint or gives the reader useful context that the
interface cannot. Do not use generated art as proof of a feature or workflow.

For hardware logs, use real build photos where available. Captions should say
what is visible and avoid claiming a result the photo does not establish.

## Living-log workflow

Treat each log as a durable journal, not a one-time retrospective. Add a dated
update when a material change, failure, discovery, or limitation is known. If
nothing changed, do not invent a release-note section.

1. Draft the source in `content/build-logs/<slug>.md` with the required
   frontmatter and a top-level `:::tldr` block.
2. Put log images in `public/images/build-logs/<slug>/` and reference them with
   `!photo filename | factual caption`.
3. Run `node scripts/build-guides.mjs` from the repository root.
4. Review the generated page, its image captions, and the Build Logs index.
5. Include the generated `public/build-logs/` output and `public/sitemap.xml`
   with the source change.

See `README.md` for the build and deployment workflow, and `PRODUCT.md` for
the site's voice and factual-claim constraints.
