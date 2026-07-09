# System design — Dynamic Yield (Day 2: tomorrow)

## SD 3 — Design a personalized newsfeed (DY gotchas edition)

> "Design a **personalized newsfeed / activity feed** for a large e-commerce site. Dynamic Yield
> will inject promoted items and run experiments on layout, ranking, and CTAs."

Set **40 min**. This is the "product surface" prompt with **infra/platform gotchas** layered in.

### DY-specific gotchas to surface (that's the point)

| Gotcha | Why it matters |
|--------|----------------|
| **Promoted slots vs organic** | Feed must support fixed ad/promo positions without breaking infinite scroll |
| **Impression counting** | Only count items actually scrolled into view (IntersectionObserver), not rendered |
| **Stale recs on scroll-back** | User scrolls away and back — re-impression rules? dedupe? |
| **Experiment on layout** | Grid vs list variant — anti-flicker on first paint; sticky variant per user |
| **SPA pagination** | New pages append via JS — MutationObserver or list ref callback to track new nodes |
| **Race on fast scroll** | Request for page 3 returns before page 2 — latest-wins / ignore stale |
| **Event loss on nav** | `sendBeacon` flush when user leaves mid-scroll |
| **Host page isolation** | Injected promo cards must not break host CSS or a11y tree |
| **Consent** | No tracking/impression until marketing consent granted |
| **Failure** | API down → show organic feed only; never empty shell |

### Clarifying questions

- Infinite scroll vs "Load more"?
- Real-time updates (websocket) or pull-only?
- Personalization: ranking only, or also injected sponsored tiles?
- Read/unread state — client or server?

### Architecture sketch

```
[Feed container]
  ├── useInfiniteQuery(pages)     ← dedupe, stale-while-revalidate
  ├── Promo slot resolver         ← DY decision API per slot index
  ├── Impression tracker          ← IO + batched events
  ├── ExperimentProvider          ← layout variant
  └── Error boundary              ← degrade to organic
```

### Must-hit (standard feed SD)

- Pagination/cursor model
- Optimistic UI for like/save actions
- Virtualization for long lists (react-window) — **and** how IO works with virtualized rows
- Cache invalidation when user follows someone new

### DY soundbite to close

> "The feed is both a UX surface and an experimentation surface — I'd separate organic data
> fetching from promo injection, make impressions first-class via IntersectionObserver, and
> ensure the DY script re-binds when SPA routes append new feed pages."

---

## Prep tonight (optional, 10 min)

Skim [`../coding/dy-platform-drills/TALKING-POINTS.md`](../coding/dy-platform-drills/TALKING-POINTS.md)
and your completed tracker + recommendations widget — you'll reference them in this drill.
