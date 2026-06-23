# AI Usage Playbook (for the "tested on AI usage" round)

They are not grading whether you can prompt. They are grading whether you stay the
**engineer in charge** while AI accelerates you. Across Meta/Canva/Shopify/Rippling the
rubric is the same: decompose yourself, delegate well-defined chunks, **read and verify
every line**, catch the bug, and defend the code as if you wrote it (you did).

> Internal Meta-style criterion, paraphrased: "Should use AI, but show you understand
> the code. Explain the output. Test before using. Don't prompt your way out of it."

## The 3-phase loop (run it visibly, narrate each phase)

### Phase 1 — Decompose (NO AI yet, ~5 min)
- Restate the problem and constraints in your own words. Ask clarifying questions.
- List the issues / subtasks and rank them by impact. Announce your plan.
- This is where you prove analytical thinking. Reaching for AI before understanding the
  problem is the #1 failure mode.

### Phase 2 — Delegate + implement
- Delegate **well-defined, low-risk** chunks: boilerplate, a pure helper, a test scaffold,
  a mechanical refactor, a type definition.
- Keep for yourself: architecture, prioritization, the tricky integration, the security
  call. Say *why* you're delegating this and keeping that.
- Prompt with context: paste the real types/signatures, state constraints, ask for the
  specific thing. Iterate in small steps — don't ask for a one-shot solution.

### Phase 3 — Verify + defend (the part that scores)
- **Read every generated line out loud.** Never paste-and-move-on.
- **Write a test that distinguishes correct from wrong.** When AI says "this handles the
  partial-record / epoch-vs-ISO / empty case," construct the input that would fail a wrong
  implementation and run it.
- Trace happy path + at least one edge case manually.
- Fix hallucinations, missing null checks, off-by-ones, wrong deps arrays.
- Be ready to answer "why this approach?" for any line — including AI's.

## Verification ritual (say these on every AI block)

1. "Let me read this." (actually read it)
2. "What's the edge case it claims to handle? Let me write/think of an input that proves it."
3. "Does this match our types and constraints?" (check against the real signatures)
4. "What did it get wrong?" (assume something; usually deps, nulls, async cleanup, types)

## Prompting patterns that read as senior

- Give it the types and the constraint, ask for one thing:
  "Here's the `Alert` type and `RawAlert`. Write a pure `normalizeAlert` that handles
  `detected_at` as epoch number OR ISO string and returns a `Date`. No `any`."
- Ask for tests for the claim: "Write a vitest test that fails if epoch input isn't handled."
- Ask it to critique, then judge: "List risks in this `useAlerts` hook." Then you decide
  which are real — don't accept the list wholesale.

## Red flags (auto-fail signals — avoid)

- Pasting code you didn't read; can't explain a line you "wrote."
- One-shot prompting and praying; no iteration.
- Accepting the AI's edge-case claim without a test.
- Letting AI pick the architecture for you.
- Going silent while the AI works — narrate continuously.

## Spoken talk-track (memorize the shape)

> "First, let me make sure I understand the problem and rank the issues before I touch
> the AI. … The top three are X (a security bug), Y (a re-render storm), Z (no error
> handling). I'll start with X. I'll have the assistant draft the sanitization helper
> since it's well-defined, but I'll write the test first so I can verify it. … Okay, it
> generated this — let me read it. It missed the null case here; I'll fix that. Let me run
> the test. … Good. Moving to Y."

## Day-of checklist

- [ ] Tool works, you're logged in, model selected, repo opens, tests/lint run.
- [ ] You can create+run a single test fast (know the command cold).
- [ ] You default to narrating. Silence reads as over-reliance.
- [ ] If AI turns out to be disallowed: same loop, you just write the code — keep the
      decompose-first and verify-with-a-test discipline.
