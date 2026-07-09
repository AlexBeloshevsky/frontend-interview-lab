# Coding 05 — Personalized Activity Feed (DY-flavored)

**Company context:** Dynamic Yield surfaces **promoted tiles inside organic feeds** on retailer
sites. This exercise is a slice of that newsfeed: fetch personalized items, distinguish promo
vs organic, handle failure safely, then extract a reusable data hook.

**How to run this:** build from **blank/stub files**. Ship a working component first (fetch
inline), then extract the hook — same progressive refinement as the recommendations widget.

---

## The contract (keep stable across iterations)

**You author `./types.ts`** — designing the data model is part of what's graded. Hard
requirement: `./types` must `export` a `FeedItem` type. Suggested shape:

```ts
export type FeedItemKind = "organic" | "promo";

export interface FeedItem {
  id: string;
  headline: string;
  summary: string;
  kind: FeedItemKind;
}

export type FetchActivityFeed = (userId: string) => Promise<FeedItem[]>;
```

**Component:** `ActivityFeed`

```tsx
interface ActivityFeedProps {
  userId: string;
  fetchActivityFeed?: FetchActivityFeed; // optional; hardcoded default in iter 1
  onItemClick?: (item: FeedItem) => void;
}
```

**Render states (tests assert these):**

| State | Requirement |
|---|---|
| Loading | while fetch pending → text matching `/loading/i` |
| Success | `<ul>` of `<li>` items; each shows **headline** as its own text node + **summary** |
| Promo | items with `kind: "promo"` show text matching `/promoted/i` inside that `<li>` |
| Empty | fetcher resolves `[]` → text matching `/nothing in your feed/i` |
| Error | fetcher rejects → text **`Couldn't load activity feed`** and **do NOT throw** |
| Click | clicking an item's headline calls `onItemClick(item)` with that item |

> `fetchActivityFeed` is a **seam** — hardcode a default in iter 1, inject in tests. Same
> pattern as the recommendations widget.

---

## Iteration 1 — make it work (single file, inline fetch)

**File:** `ActivityFeed.tsx` — state + fetch + view in one component. Hardcode a default
fetcher in the file.

Acceptance: all cases in `ActivityFeed.test.tsx` pass.

Narrate: 4-state machine, promo vs organic rendering, abort/cleanup on unmount or `userId`
change.

```bash
npx vitest practice/senior-fe-infra-interview/coding/05-activity-feed/ActivityFeed
```

**Tests: provided** (`ActivityFeed.test.tsx`).

---

## Iteration 2 — make it clean (extract the hook) — **you write the tests**

**File:** `hooks/useActivityFeed.ts`

```ts
function useActivityFeed(
  userId: string,
  fetchActivityFeed: FetchActivityFeed,
): {
  status: "loading" | "success" | "error";
  items: FeedItem[];
  error?: Error;
};
```

Move all data/state logic into the hook. **Take the fetcher as an argument** — no hardcoded
`fetch` inside the hook. Component becomes thin: call hook, switch on `status`, render.

**Your job: write `hooks/useActivityFeed.test.ts`.** Cover at least:

- [ ] starts in `loading`
- [ ] transitions to `success` with resolved items
- [ ] transitions to `error` when fetcher rejects
- [ ] refetches when `userId` changes; **stale response ignored** (race)
- [ ] no state update after unmount

Pattern: `renderHook(({ id }) => useActivityFeed(id, fakeFetcher), { initialProps: { id: "u1" } })`,
deferred promises for race ordering.

```bash
npx vitest practice/senior-fe-infra-interview/coding/05-activity-feed/hooks/useActivityFeed
```

---

## Iteration 3 (optional) — promo impression callback

Add an optional `onPromoImpression?: (item: FeedItem) => void` prop. Fire it **once per promo
item per mount** when that promo row renders (stand-in for IntersectionObserver — full IO is
drill 02). Wire only for `kind: "promo"`.

This mirrors DY's "don't count until seen" muscle without building IO in this exercise.

---

## Talking points (newsfeed SD tie-in)

- **Promo vs organic:** separate rendering paths; promos get a badge + later impression tracking.
- **Resilience:** feed widget never throws — degrade to error UI; host page keeps working.
- **Injection:** fetcher passed in → testable, multi-tenant, mock-friendly.
- **Race guard:** fast `userId` switch or scroll pagination → ignore stale responses (iter 2).
- **Next step in prod:** swap mount-time impression for `IntersectionObserver` + batched tracker.
