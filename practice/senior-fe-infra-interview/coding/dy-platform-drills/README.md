# DY platform drills

Small, build-focused drills targeting the **infra/platform** concerns specific to a
personalization + experimentation vendor like Dynamic Yield — the stuff beyond "render a
component." Same format as the other exercises: read `TASK.md`, build from the stub, drive
the provided tests to green.

| # | Drill | Muscle | Likely as |
|---|-------|--------|-----------|
| 01 | `event-tracker` | batching + `sendBeacon` + lifecycle teardown | **coding question** |
| 02 | `use-impression` | `IntersectionObserver`, "seen" vs "rendered" | coding question |
| 03 | `safe-html` | XSS allowlist sanitization before DOM injection | coding + verbal |
| 04 | `anti-flicker` | hide-until-ready + timeout fallback (FOUC) | **verbal / SD** |
| 05 | `dom-mutation-observer` | MutationObserver + debounce (DY SPA blog) | coding + verbal |

Suggested order: **01 → 02 → 05** (compose: impression → tracker; mutations → re-apply).
Study **03/04** via `solution/` + [`TALKING-POINTS.md`](./TALKING-POINTS.md) — no need to build from scratch.

Run one:

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/01-event-tracker
```

Run all:

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills
```

Each drill's `TASK.md` ends with "say these out loud" notes — the point isn't just green
tests, it's being able to **explain the tradeoff** (why `sendBeacon`, why unwrap vs strip,
why a timeout on the anti-flicker). That's what the interview is actually scoring.
