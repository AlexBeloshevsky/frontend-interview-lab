# Self-scoring rubric (improve-code + AI round)

Synthesized from public writeups (Meta, Canva, Shopify, Rippling) — PAN's exact rubric
isn't public. Score each 0–3 after a timed rep. Target 2+ everywhere; 3 on Judgment,
Verification, and Communication, which is where senior candidates separate.

Scale: 0 = absent · 1 = weak · 2 = solid · 3 = strong/senior

## 1. Triage & prioritization (judgment)
- [ ] Read before coding; identified the highest-impact issues first
- [ ] Found the security/correctness bug (XSS, uncleared interval, state mutation)
- [ ] Explicitly said what to skip and why
Score: __/3

## 2. Correctness of the fix
- [ ] Fixes actually solve the problem (verified, not assumed)
- [ ] No regressions introduced; edge cases handled (epoch vs ISO, empty, error)
Score: __/3

## 3. Architecture & separation of concerns
- [ ] Built a seam: data fetching pulled into a hook/repo
- [ ] Component decomposed (table, row, details, filters) with sensible props
- [ ] Pure logic (filter/sort/normalize) extracted and testable
Score: __/3

## 4. React performance (esp. perf variant)
- [ ] Profiled / reasoned before optimizing (didn't sprinkle useMemo blindly)
- [ ] Stable keys, derived state with useMemo, memoized rows + stable callbacks
- [ ] Stream kept out of render path; updates batched; virtualization for large lists
Score: __/3

## 5. TypeScript quality
- [ ] Killed `any`; defined domain types + severity union
- [ ] Normalized at the boundary; no unsafe casts
Score: __/3

## 6. Accessibility & states
- [ ] Buttons not clickable spans; labels on inputs; modal role/focus/Escape
- [ ] Loading / error / empty states present
Score: __/3

## 7. AI usage (if allowed)
- [ ] Decomposed before prompting
- [ ] Delegated well-defined chunks, kept architecture decisions
- [ ] Read every line; wrote a test that would catch a wrong impl
- [ ] Caught at least one AI mistake; can defend every line
Score: __/3

## 8. Communication
- [ ] Narrated continuously; clear reasoning
- [ ] DECISIONS.md / spoken summary of what + why + tradeoffs
- [ ] Handled interviewer hints as a collaborator, not defensively
Score: __/3

---

Total: __/24

Reflection (put 2 lines in `../mistake-log.md`):
- Biggest time sink:
- One thing to do faster/earlier next rep:
