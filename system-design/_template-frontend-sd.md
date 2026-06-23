# Frontend System Design — reusable structure

A repeatable flow for any frontend SD prompt. Spend the first minutes clarifying; don't
jump to components. Drive the conversation; state tradeoffs out loud.

## 0. Clarify & scope (3–5 min) — do not skip
- Who are the users, what are the top jobs-to-be-done?
- Scale: users, data volume, update frequency, # screens, peak bursts.
- Real-time? How fresh must data be (per-event vs per-second)?
- Platforms (web/mobile/responsive), offline, i18n, accessibility, security/tenancy?
- Define 2–3 functional requirements + 2–3 non-functional (perf, a11y, reliability).
- State assumptions explicitly and move on.

## 1. High-level architecture
- Draw the data flow: source → transport → state → render.
- Identify the **planes**: push (streaming) vs pull (request/response).
- Component tree at a high level; where state lives.

## 2. Data & transport
- REST vs GraphQL vs WebSocket/SSE vs gRPC-web — pick per use case, justify.
- Pagination (cursor) / infinite scroll; caching (React Query/Apollo); optimistic updates.
- Normalize at the boundary; define the domain model.

## 3. State management
- Server state (React Query/SWR) vs client/UI state (local/context/external store).
- High-frequency data → external store + `useSyncExternalStore`, batched, selectors.
- Avoid putting streams in component state.

## 4. Rendering & performance
- Virtualization for large lists; memoized rows; stable keys/callbacks.
- `useMemo` for derived data; Web Workers for heavy compute; `useTransition`/
  `useDeferredValue` to keep input responsive.
- Canvas vs SVG vs DOM for visualizations by density.
- Bundle: code-splitting, lazy routes, prefetch.
- Rule: **profile before optimizing.** Say it.

## 5. Cross-cutting (the senior breadth signal)
- Accessibility: keyboard, ARIA, focus management, live regions, color-independent signals.
- Security: XSS/sanitization, RBAC, tenant isolation, authn/z.
- i18n: `Intl` formatting, externalized strings, RTL.
- Reliability: reconnection/backoff, catch-up, error/empty/loading states, offline.
- Observability: client metrics (frame drops, lag, error rate), logging, feature flags.

## 6. Tradeoffs & "if I had more time"
- Volunteer 2–3 tradeoffs of your chosen design.
- Name the next things you'd build/measure.

## Mnemonic
Clarify → Architecture → Data/Transport → State → Render/Perf → Cross-cutting → Tradeoffs.
("CADSRCT" — or just remember: understand, draw the data flow, then optimize, then breadth.)
