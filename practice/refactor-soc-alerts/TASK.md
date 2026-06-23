# Drill: Improve the SOC Alerts Dashboard (core improve-code rep)

This simulates the Palo Alto Networks Cortex/XSIAM round-2 "improve existing code"
task: you are dropped into an unfamiliar React + TypeScript codebase and asked to
make it better. It is deliberately bad. Your job is NOT to rewrite it from scratch.

## The scenario (read this out loud as if to an interviewer)

`AlertsDashboard.tsx` is a SOC analyst view that lists security alerts streaming in
from a detection backend. Analysts filter by severity, search, and triage alerts.
Product says it "feels slow and buggy." Make it better.

## Rules (mirror the real round)

- Timebox: **45 minutes.** Set a timer. Stop when it rings.
- Narrate everything. The interviewer grades your reasoning, not just the diff.
- You will NOT fix everything. Triage. State what you are deliberately skipping and why.
- If AI is allowed: use it, but read every line, and write a test that would catch a
  wrong implementation before you accept AI output. See `../ai-usage-playbook.md`.
- Fill in `DECISIONS.template.md` (copy to `DECISIONS.md`) as you go — 1 line per change.

## Suggested flow (don't skip step 0)

0. **Triage first (5 min, no code).** Read the file, list the issues out loud, and
   rank them: correctness/security > perf in the hot path > architecture/SoC >
   types > a11y > tests. Announce your top 3 and that you'll start there.
1. Fix the highest-impact correctness/security bug.
2. Establish the seam: pull data fetching out of the component into a hook.
3. Fix the re-render / perf issues in the hot path.
4. Tighten types (kill `any`), add loading/error/empty states.
5. A11y + tests if time remains.

## Self-check: planted issues (look AFTER your attempt, not before)

See `ISSUES.md`. Score yourself with `../refactor-rubric.md`.

## How to run

This is a standalone snippet for reading/refactoring. It imports React only and a
fake API in the same folder. You can wire it into `src/App.tsx` if you want it live,
but reading + refactoring in place is enough for the drill.
