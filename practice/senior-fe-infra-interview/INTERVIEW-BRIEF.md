# Interview brief — decode the signals + in-room playbook

## What the recruiter actually told you

> "ensuring that you understand the question, breaking it down to smaller pieces,
> and writing clear & scalable code"

That sentence **is the rubric.** They're not (only) testing whether you reach a
working answer — they're testing your **process**. A senior who clarifies, decomposes,
and narrates beats a mid-level who silently speed-runs to a working blob. Optimize for
the process they named.

Decoded into four graded behaviors:

1. **Understand the question** → clarify before coding.
2. **Break it down** → decompose into named pieces before writing them.
3. **Clear code** → readable, well-named, typed, small functions, obvious states.
4. **Scalable code** → an API/structure that survives new requirements.

## "Infra team" — what changes

Front-end infra/platform teams build the things *other* engineers build on:
component libraries, data-fetching/state layers, design systems, tooling, perf
primitives. So they care disproportionately about:

- **API design** — is the interface you expose clean, minimal, hard to misuse?
- **Reusability / generics** — does it work for cases beyond the one in front of you?
- **Edge cases & correctness** — loading/error/empty, race conditions, cleanup,
  unmount, double-invocation.
- **Backwards-compatible extensibility** — "if we later need X, does your design bend
  or break?"
- **Accessibility & cross-cutting concerns** — infra sets the defaults everyone
  inherits.

When you talk, frame decisions in terms of *the consumer of your code* ("a teammate
using this hook would expect…"). That's the infra mindset.

## The in-room playbook (run this every coding question)

### 0. Understand (2–4 min, no code)
- Restate the problem in your own words; get a "yes that's right."
- Ask clarifying questions. Always ask about:
  - **Inputs & API shape** — what props/args, what does it return?
  - **States** — loading, error, empty, success. Do they want them handled?
  - **Scale** — how many items? remote or local data? how often does it change?
  - **Constraints** — controlled vs uncontrolled? accessibility? styling expected?
  - **Done = ?** — what's the minimum bar vs nice-to-have?
- State 1–2 assumptions explicitly and move on. ("I'll assume options are unique by id —
  ok?")

### 1. Break it down (2–3 min, out loud)
- List the pieces before writing them: data layer, state, render, events, edge cases.
- Sketch the component/module boundaries and the public API/types first.
- Announce your plan and the order you'll build in. Get buy-in.

### 2. Build the skeleton, then fill in
- Types/interfaces first → then the happy path → then states/edge cases.
- Keep functions small and named. Extract pure logic so it's testable.
- Narrate continuously: what you're doing and *why*, including tradeoffs.

### 3. Verify (don't skip — this is a senior tell)
- Walk one example through your code by hand, out loud.
- Name the edge cases and show they're handled (or say you're deferring them, and why).
- If time: write or describe a test that would catch a wrong implementation.

### 4. Communicate throughout
- Treat interviewer hints as collaboration, not correction.
- Summarize at the end: what you built, key decisions, tradeoffs, "with more time I'd…".

## Clarifying questions cheat-sheet (memorize)

- "What should happen while data is loading / on error / when empty?"
- "Is this controlled or uncontrolled — does the parent own the state?"
- "How large can the input get? Do I need to worry about performance/virtualization?"
- "Local data or a remote API? Can requests fail or race?"
- "Do you want accessibility handled now, or should I note it and move on?"
- "What's the minimum you'd like to see working first?"

## Anti-patterns that read as "not senior"

- Coding in silence; jumping straight to implementation without clarifying.
- One giant component/function; no separation of concerns.
- `any` everywhere; ignoring loading/error/empty.
- Optimizing (sprinkling `useMemo`) before there's a reason. Say "profile first."
- Uncleared timers/subscriptions; ignoring unmount and race conditions.
- Getting defensive when the interviewer nudges you.
