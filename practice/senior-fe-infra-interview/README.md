# Senior Front End Engineer (Infra team) — interview prep

Targeted prep for the upcoming loop. Recruiter signal:

> "Expect a system design question — usually discussed verbally. Also 1–2 React
> coding questions. They expect **coding best practices**: ensuring you understand
> the question, breaking it down into smaller pieces, and writing **clear & scalable
> code**."

## What this folder contains

```
senior-fe-infra-interview/
├── INTERVIEW-BRIEF.md      ← decode the signals + the in-room playbook (read first)
├── coding-rubric.md        ← self-score after each rep
├── coding/
│   ├── warmups/                      ← START HERE — small, confidence-building reps
│   │   ├── 01-use-counter/              ★☆☆ trivial hook (functional updates, useCallback)
│   │   ├── 02-use-debounced-value/      ★★☆ easy hook (effects + cleanup; reuses debounce)
│   │   └── 03-filterable-list/          ★★☆ easy component (derived state, empty state, a11y)
│   ├── 01-use-async-data-hook/      ★★★ data layer: reusable async hook (race conditions)
│   ├── 02-toast-notification-system/ ★★★ cross-cutting service + clean imperative API
│   ├── 03-tabs-compound-component/   ★★★ composable, accessible component API
│   └── 04-recommendations-widget/   ★★☆ DY-flavored: recs widget → hook → useExperiment (3 iterations)
└── system-design/
    └── PROMPTS.md          ← 3 infra-flavored verbal SD prompts + how to run a drill
```

> **Difficulty ramp.** The `warmups/` are deliberately small — do them first to rebuild
> momentum and muscle memory. The top-level `01/02/03` are **interview-grade and hard**
> (`useAsync` in particular is the hardest thing here — race conditions and refs trip up
> senior engineers). Don't measure yourself against those until the warm-ups feel easy.

## Why these exercises (infra lens)

Infra/platform FE work is judged less on "can you center a div" and more on **API
design, reusability, correctness under edge cases, and scalability**. The three
coding drills each target one infra muscle:

1. **`useAsync`** — owning the data-fetching layer: states, race conditions,
   cancellation, cleanup. The thing every app re-invents badly.
2. **Toast system** — building a cross-cutting service with a clean imperative API
   (provider + hook + queue + timers). API design + lifecycle.
3. **Headless Tabs** — a composable, accessible, controlled/uncontrolled component
   API. The design-system bread and butter.

## How to use it (the few days before)

- **Day 0 (warm-ups):** Do all three `warmups/` back-to-back. They're meant to be
  finished and green in a single sitting — that's the point. Each green test is a real
  rep of the exact muscles the hard ones need (state, effects, cleanup, derived data).
- **Day 1:** Read `INTERVIEW-BRIEF.md`. Do exercise **01** timed (45 min), then score
  with `coding-rubric.md` and log a line in `../../mistake-log.md`.
- **Day 2:** Exercise **02** timed. Then one SD prompt from `system-design/PROMPTS.md`
  out loud (record yourself or whiteboard it).
- **Day 3:** Exercise **03** timed. Second SD prompt.
- **Day before:** Re-derive a warm-up from a blank file (spaced repetition). Re-read
  the in-room playbook. Light only — don't cram.

Run code with the repo's tooling:

```bash
npx vitest practice/senior-fe-infra-interview/coding/warmups
npm run typecheck
```
