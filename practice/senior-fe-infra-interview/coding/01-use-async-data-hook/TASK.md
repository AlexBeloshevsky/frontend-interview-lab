# Exercise 01 — `useAsync` data-fetching hook

**Infra muscle:** owning the data layer. Every app re-implements this badly. A clean,
correct version is a strong senior/infra signal.

- **Timebox:** 45 min. Set a timer.
- **Narrate everything.** Run the in-room playbook from `../../INTERVIEW-BRIEF.md`.
- Run tests: `npx vitest practice/senior-fe-infra-interview/coding/01-use-async-data-hook`

## Prompt (as an interviewer would give it)

"Build a reusable React hook, `useAsync`, that runs an async function and exposes its
state to a component. We use it everywhere, so it needs to be correct and pleasant to
use."

## Step 0 — clarify first (do this out loud before coding)

Questions worth asking (then state assumptions and move on):

- What states do we expose? (idle / loading / success / error)
- Should it run on mount, or only when triggered? (→ `immediate` option)
- Can it be re-run (refetch)? Do args change?
- **Race conditions:** if it's triggered again before the first finishes, which result
  wins? (the latest)
- **Unmount:** must not set state after the component unmounts.

## Requirements

A hook with roughly this shape (refine it as part of the exercise):

```ts
const { status, data, error, run, reset } = useAsync(asyncFn, { immediate?: boolean });
```

1. `status`: `'idle' | 'loading' | 'success' | 'error'`.
2. `data` / `error` populated on success / failure.
3. `run()` triggers (or re-triggers) the async function and resolves when done.
4. `immediate: true` runs once on mount.
5. **Only the latest run wins** — a stale resolution/rejection from an earlier run must
   be ignored.
6. **No state updates after unmount.**
7. `reset()` returns to the idle state.

## Break it down (suggested pieces)

- The state shape (one object, or `useReducer` — defend your choice).
- A "run id" / ref to detect stale responses.
- A `mounted`/`active` ref for unmount safety.
- `useCallback` for `run` so consumers can put it in deps safely.
- `useEffect` for the `immediate` behavior.

## What "good" looks like (check after your attempt)

- Status modeled as a union, not booleans (`isLoading && isError` can't both be true).
- Stale-response guard via an incrementing id captured per run, compared before
  committing state.
- Cleanup ref flipped in a `useEffect` cleanup.
- `run` is stable (`useCallback`) and returns a promise.
- No `any`; the hook is generic over the resolved type `T`.

## Stretch (mention even if you don't build)

- `AbortController` wired into the fetcher for true cancellation.
- Retry with backoff (you've implemented `fetchWithAutoRetry` already — compose it).
- A tiny cache keyed by a `key` arg (this is the seed of React Query / SWR).

## Self-check

Make the tests pass, then score with `../../coding-rubric.md` and log a line in
`../../../mistake-log.md`.
