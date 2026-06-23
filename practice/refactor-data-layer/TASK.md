# Drill: Decouple the data layer (REST → GraphQL seam)

The gradeable senior skill here is **the seam**, not the migration. If transport is
isolated behind a hook/service, swapping REST for GraphQL is a localized change. If
`fetch()` is sprinkled across components, it's a rewrite. Show the interviewer you build
the seam by default.

## Part 1 — Live, codeable in ~30–40 min (the part that's actually graded)

`LeakyComponents.tsx` has three components that each call `fetch()` inline with
different ad-hoc shapes, no shared types, no error/loading conventions, no cancellation.

Refactor to a clean data-access layer:

1. Define domain types once (`Alert`, `Incident`) — not per-component `any`.
2. Create a transport-agnostic boundary: `alertsRepository` (a plain object/module with
   `getAlerts()`, `getIncident(id)`) OR a set of hooks (`useAlerts()`, `useIncident(id)`).
3. Components consume the hook/repo and never touch `fetch` or URLs.
4. Centralize: base URL, headers/auth, JSON parsing, error normalization, abort on unmount.
5. (If using React Query/SWR) wrap the repo calls; key by query; get caching + retry for free.

Acceptance: I can change the *implementation* of `alertsRepository.getAlerts` from `fetch`
to anything else **without touching a single component**.

## Part 2 — Spoken architecture answer (rehearse, don't code under time pressure)

"Now migrate this to GraphQL." Talk through it:

- Swap only the repository implementation: `fetch('/api/alerts')` →
  `client.query(AlertsDocument)`. Components unchanged — that's the payoff of Part 1.
- Client choice: **Apollo** (normalized cache, rich devtools, heavier) vs **urql**
  (lighter, flexible exchanges) vs **graphql-request + React Query** (you keep RQ's cache,
  GraphQL is just the transport). Pick one and justify for a data-dense SOC app.
- **Codegen** (`graphql-codegen`) → typed documents and hooks; no hand-written response
  types, no `any`. This is the TypeScript win that makes GraphQL worth it here.
- **Normalized cache** benefits: an alert updated in one view updates everywhere; fewer
  refetches. Tradeoff: cache config complexity, cache-vs-network policies.
- **Overfetching**: REST endpoints returned everything; GraphQL lets each view request
  only the fields it renders — meaningful for wide alert tables.
- **Real-time**: GraphQL **subscriptions** over WebSocket for live alerts vs REST polling.
  Tie this back to the system-design answer (keep stream data out of React, batch updates).
- **Migration strategy**: strangler pattern — introduce the client, migrate one repo
  method at a time behind the same interface; REST and GraphQL coexist during rollout.
- **Risks**: caching bugs are subtler than REST; N+1 on the server; bundle size; team
  ramp-up. Say what you'd measure before/after.

## Why no live GraphQL implementation

2-hour on-site, no take-home: standing up a schema + client + codegen burns the clock
for little signal. The seam (Part 1) + a crisp spoken migration (Part 2) demonstrates
the same senior judgment without the scaffolding tax.
