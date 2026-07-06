# System design — verbal prompts (infra flavor)

The recruiter said the SD round is **discussed verbally**. So practice *talking*:
whiteboard or narrate out loud, don't write code. Use the repeatable flow in
[`../../../system-design/_template-frontend-sd.md`](../../../system-design/_template-frontend-sd.md)
(Clarify → Architecture → Data/Transport → State → Render/Perf → Cross-cutting →
Tradeoffs). Spend the first few minutes clarifying — that's half the score.

How to drill: pick one prompt, set 30–40 min, talk through the whole flow as if to an
interviewer. Record yourself or write bullets after. Score breadth with section 5 of
the SD template (the senior signal).

---

## Prompt 1 — Design a client-side data-fetching & caching layer

> "Our app makes hundreds of API calls across pages. Design a reusable data-fetching
> layer (think: what React Query / SWR give you) that teams build on."

Why infra: this is literally platform work, and it extends your `useAsync` exercise.

Hit these:
- **API surface:** `useQuery(key, fetcher, opts)`, `useMutation`, cache access.
- **Cache:** keyed store, normalization vs document cache, staleness (`staleTime` /
  `cacheTime`), invalidation.
- **Dedupe:** in-flight request sharing for the same key (you implemented "merge
  identical API calls" territory).
- **Race conditions / cancellation:** latest-wins, `AbortController`.
- **Refetch triggers:** focus, reconnect, interval, manual.
- **Consistency:** optimistic updates + rollback; background refetch.
- Cross-cutting: SSR/hydration, retry/backoff, error boundaries, devtools/observability.
- Tradeoffs: normalized vs simple cache; memory vs freshness.

## Prompt 2 — Design a reusable component library / design system

> "We're standing up a design system used by many product teams. Design it."

Why infra: API design + scalability + a11y + DX — the core of FE platform work.

Hit these:
- **Component API principles:** controlled/uncontrolled, composition (compound
  components — your Tabs exercise), polymorphic `as` prop, sensible defaults, "hard to
  misuse."
- **Theming/tokens:** design tokens, CSS variables, dark mode, density.
- **Accessibility as a default:** headless primitives, focus management, ARIA baked in.
- **Distribution:** versioning (semver), tree-shaking, bundle size, codemods for breaking
  changes, monorepo + per-component packages.
- **DX:** docs (Storybook), types, testing strategy, visual regression.
- Tradeoffs: flexibility vs consistency; headless vs styled; one package vs many.

## Prompt 3 — Design a feature-flag / experimentation system (frontend)

> "Design the client side of a feature-flag and A/B experimentation platform."

Why infra: classic platform service touching every app; lots of tradeoffs.

Hit these:
- **Evaluation:** server-evaluated vs client-evaluated flags; bootstrapping flags on
  load to avoid flicker (FOUC) and layout shift.
- **API:** `useFlag('key')` / `<Flag>`; provider with the flag set; typed flag keys.
- **Targeting:** user/segment context; sticky bucketing (consistent hashing).
- **Performance:** no blocking render; cache; streaming/SSR injection.
- **Consistency & analytics:** exposure logging, metrics pipeline, guardrails.
- **Safety:** kill switch, default values, graceful degradation when the service is down.
- Tradeoffs: freshness vs flicker; client vs server eval; bundle of all flags vs lazy.

---

## Already in this repo (reuse for practice)

You also have a worked real-time example:
[`../../../system-design/cortex-realtime-soc-dashboard.md`](../../../system-design/cortex-realtime-soc-dashboard.md)
— good for a "high-frequency streaming data" prompt. The `architecture-opinions/`
folder has crisp takes (server vs client state, context vs external store) — skim them;
they're great soundbites for the cross-cutting part of any SD answer.
