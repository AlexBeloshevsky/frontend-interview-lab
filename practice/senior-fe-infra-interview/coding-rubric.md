# Self-scoring rubric — React coding (senior, infra)

Score each 0–3 after a timed rep. Target 2+ everywhere; aim for 3 on Clarification,
API design, Edge cases, and Communication — that's where seniors separate from mids.

Scale: 0 = absent · 1 = weak · 2 = solid · 3 = strong/senior

## 1. Understanding & clarification (process)
- [ ] Restated the problem; confirmed understanding before coding
- [ ] Asked about states, scale, controlled/uncontrolled, data source
- [ ] Stated assumptions explicitly and moved on
Score: __/3

## 2. Decomposition (process)
- [ ] Listed the pieces before writing them; defined the public API/types first
- [ ] Sensible module/component boundaries; pure logic separated from UI
- [ ] Announced a build order and followed it
Score: __/3

## 3. API design (infra signal)
- [ ] Minimal, predictable, hard-to-misuse interface
- [ ] Sensible defaults; controlled/uncontrolled handled where relevant
- [ ] Generic/reusable beyond the one example (without over-engineering)
Score: __/3

## 4. Correctness & edge cases
- [ ] Happy path works (verified by hand, not assumed)
- [ ] Loading / error / empty states handled
- [ ] Race conditions, unmount cleanup, stale responses, double-invocation considered
Score: __/3

## 5. Clear code
- [ ] Small, well-named functions/components; no giant blob
- [ ] Readable control flow; derived state instead of duplicated state
- [ ] Comments only where intent isn't obvious
Score: __/3

## 6. TypeScript quality
- [ ] No `any`; precise prop/return types; generics where they add safety
- [ ] Types model the domain and the states (unions for status, etc.)
Score: __/3

## 7. Accessibility & cross-cutting
- [ ] Semantic elements; labels; keyboard support; ARIA/roles where needed
- [ ] Focus management / live regions where relevant
Score: __/3

## 8. Verification & communication
- [ ] Walked an example through by hand; named edge cases handled/deferred
- [ ] Wrote or described a test that catches a wrong implementation
- [ ] Narrated continuously; summarized decisions + tradeoffs at the end
Score: __/3

---

Total: __/24

Reflection (2 lines in `../../mistake-log.md`):
- Biggest time sink:
- One thing to clarify/decompose earlier next rep:
