# Coding 04 — Personalized Recommendations Widget (DY-flavored)

**Company context:** Dynamic Yield renders **personalized product recommendations** into
customer sites via an embedded script, runs **A/B experiments**, and **tracks
impressions/clicks**. This exercise mirrors that: a resilient, injectable, testable
recommendations widget you grow in three passes.

**How to run this:** build everything from **blank files**. Ship a working thing first,
then refactor toward clean/scalable in deliberate passes, narrating the "why" out loud —
that progressive-refinement + narration is exactly the signal the interviewer wants.

---

## The contract (keep stable across all iterations)

**You author `./types.ts`** — designing the data model is part of what's graded. The only
hard requirement from the tests: `./types` must `export` a `Recommendation` type. Suggested
shape (adjust as you like, but the widget renders title + price + image):

```ts
export interface Recommendation {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}
export type FetchRecommendations = (userId: string) => Promise<Recommendation[]>;
```

**Component:** `RecommendationsWidget`

```tsx
interface RecommendationsWidgetProps {
  userId: string;
  fetchRecommendations?: FetchRecommendations; // optional; hardcoded default in iter 1
  onSelect?: (rec: Recommendation) => void;     // click tracking (the DY muscle)
}
```

**Render states (the tests assert these — match them):**

| State | Requirement |
|---|---|
| Loading | while the fetch is pending, render text matching `/loading/i` |
| Success | render a `<ul>` of `<li>` items; each shows the **title as its own text node** + price |
| Empty | fetcher resolves `[]` → render text matching `/no recommendations/i` |
| Error | fetcher rejects → render text **`Couldn't load recommendations`** and **do NOT throw** (a widget must never crash the host page) |
| Click | clicking an item calls `onSelect(rec)` with that recommendation |

> The `fetchRecommendations` prop is a **seam**: a sane hardcoded default so
> `<RecommendationsWidget userId="..." />` just works, but overridable so tests (and
> other host sites) can inject their own. That default-plus-injection pattern is the
> senior move — call it out.

---

## Iteration 1 — make it work (single file, hardcoded API)

**File:** `RecommendationsWidget.tsx` — everything inline (state + fetch + view in one
component). Hardcode a default fetcher inside the file.

Acceptance: all cases in `RecommendationsWidget.test.tsx` pass. Cover loading → success,
empty, error (no throw), and click → `onSelect`.

Narrate: the 4-state machine, why error must degrade gracefully, cleanup on unmount
(don't `setState` after unmount / abort the in-flight request).

**Tests: I wrote these for you** (`RecommendationsWidget.test.tsx`).

```bash
npx vitest practice/senior-fe-infra-interview/coding/04-recommendations-widget/RecommendationsWidget
```

---

## Iteration 2 — make it clean (extract the hook) — **you write the tests**

**File:** `useRecommendations.ts`

```ts
function useRecommendations(userId: string, fetchRecommendations: FetchRecommendations): {
  status: "loading" | "success" | "error";
  data: Recommendation[];
  error?: Error;
};
```

Move all data/state logic out of the component into this hook. **Take the fetcher as an
argument** (don't hardcode `fetch` inside the hook) — that injection is the whole point:
testable, reusable, host-agnostic. The component becomes thin: call the hook, switch on
`status`, render.

**Your job: write `useRecommendations.test.ts`.** A checklist of what to cover — this is
the "prove the extraction was worth it" step:

- [ ] starts in `loading`
- [ ] transitions to `success` with the resolved data (use `waitFor`/`findBy`)
- [ ] transitions to `error` when the fetcher rejects
- [ ] refetches when `userId` changes, and shows the **latest** result (race: resolve an
      old call after a new one — the stale result must be ignored)
- [ ] does not update state after unmount (no act/leak warnings)

Pattern reminder: `renderHook(({ id }) => useRecommendations(id, fakeFetcher), { initialProps: { id: "u1" } })`, then `rerender`, and control resolution with a deferred promise so you can order the races. (This is the same race lesson from `useAsync` — you've seen it.)

---

## Iteration 3 — make it smart (add `useExperiment`)

**File:** `useExperiment.ts`

```ts
interface Experiment<V extends string> { name: string; variants: readonly V[]; }

function useExperiment<V extends string>(
  experiment: Experiment<V>,
  userId: string,
  onExposure?: (info: { experiment: string; variant: V; userId: string }) => void,
): V;
```

Behavior:

- **Deterministic + sticky:** the same `(experiment.name, userId)` must always map to the
  same variant. Hash `` `${experiment.name}:${userId}` `` to an index into `variants`
  (any small deterministic string hash → `hash % variants.length`). No `Math.random()`.
- **Reasonably uniform:** across many users, all variants should appear.
- **Exposure:** fire `onExposure` **once per mount** with the assigned variant (this is
  the "log that the user saw the experiment" event — don't re-fire on every render).

Then wire it into the widget: e.g. `variant === "treatment"` swaps layout (grid vs list)
or CTA copy. Keep the integration light.

**Tests: I wrote these for you** (`useExperiment.test.ts`).

```bash
npx vitest practice/senior-fe-infra-interview/coding/04-recommendations-widget/useExperiment
```

---

## Talking points to bank (say these in the room)

- **Resilience:** embedded in customers' sites → never throw, always render a safe
  fallback; consider an error boundary at the widget root.
- **Injection/testability:** fetcher + experiment config passed in, not hardcoded.
- **Separation:** data (hook) vs presentation (component) vs decisioning (experiment).
- **Tracking:** impressions on mount, clicks via `onSelect` — DY's core loop.
- **Performance (mention):** widget should be lazy/non-blocking so it never slows the
  host page's critical render.
