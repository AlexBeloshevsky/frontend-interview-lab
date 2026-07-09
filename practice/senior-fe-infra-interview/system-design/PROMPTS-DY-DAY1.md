# System design — Dynamic Yield (Day 1: today)

Two verbal SD prompts tailored to **Senior FE Infra @ DY**. Set a **35–40 min timer** each.
Talk out loud; use the flow in [`../../system-design/_template-frontend-sd.md`](../../system-design/_template-frontend-sd.md).

Tomorrow: **newsfeed SD** with DY-specific gotchas → [`PROMPTS-DY-DAY2.md`](./PROMPTS-DY-DAY2.md)

---

## SD 1 — Design the embeddable personalization script (★★★ core DY)

> "Dynamic Yield runs as a **third-party script** on retailer sites. Design the **client-side
> architecture** of that script: how it loads, fetches decisions, applies personalization,
> tracks events, and fails safely."

This is the single most on-brand prompt for infra at DY.

### Clarifying questions (ask first)

- SPA vs MPA? (MutationObserver vs simpler DOM ready)
- Sync vs async script tag? Blocking budget?
- What decisions come from server (variants, recs, HTML snippets)?
- Consent / GDPR requirements?
- Multi-tenant: one script tag, many site IDs?

### Architecture to draw

```
[Host page]
    ↓ loads async
[DY bootstrap IIFE] ──→ anti-flicker hide
    ↓
[Init: siteId, userId, consent]
    ↓
[Decision API] ──→ campaigns + variants + rec payloads
    ↓
[Applier layer] ──→ DOM inject / replace / CSS
    ↓
[Event tracker] ──→ batch ──→ sendBeacon on pagehide
    ↓
[MutationObserver] ──→ re-apply on SPA nav
```

### Must-hit topics

| Area | What to say |
|------|-------------|
| **Load** | Small bootstrap; lazy-load heavy modules; `async`/`defer`; SRI/versioned CDN URL |
| **Anti-flicker** | Hide until decisions OR timeout; reveal on error |
| **Identity** | Stable `userId` (cookie/localStorage/first-party); sticky experiments |
| **Applier** | Idempotent inject (data-dy-id markers); don't double-insert on re-run |
| **Events** | Batched tracker; impressions via IntersectionObserver; clicks delegated |
| **Resilience** | Never crash host; error boundary; kill switch flag from API |
| **Isolation** | Scoped CSS; Shadow DOM optional; no global `$` pollution |
| **Perf** | Debounced mutation handling; minimal main-thread work |

### Tradeoffs to volunteer

- Client-side eval (flexible, flicker risk) vs edge SSR injection (complex, faster correct render)
- One bundle vs module federation per feature
- Aggressive anti-flicker (blank) vs accept minor flicker on slow networks

### Stretch (if time)

- Versioning / backward compat for script API
- Debug mode for customer devs (`?dy_debug=1`)
- RUM: script load time, decision latency, apply failures

---

## SD 2 — Design the frontend experimentation & flag platform (★★☆)

> "Design the **client-side** of DY's experimentation system: feature flags, A/B tests,
> exposure logging, and how product teams consume variants in React apps."

Connects to your `useExperiment` hook — escalate to platform scale.

### Clarifying questions

- Who owns flag definitions? (server vs client config)
- Real-time updates or boot-time only?
- How many concurrent experiments? Mutual exclusion?
- SSR / hydration concerns?

### API surface (propose this)

```ts
<ExperimentProvider config={bootstrapFromServer}>
  <App />
</ExperimentProvider>

const variant = useExperiment('checkout-cta', { variants: ['A','B'] });
// or
const enabled = useFlag('new-reco-algo', { default: false });
```

### Must-hit topics

| Area | What to say |
|------|-------------|
| **Bootstrap** | Flags/decisions in initial HTML or `/bootstrap` JSON to avoid flicker |
| **Assignment** | Deterministic hash(userId, experimentId); sticky across sessions |
| **Exposure** | Fire once when user actually sees variant (not on assignment) |
| **Analytics** | Exposure + conversion events → same pipeline as tracker |
| **Caching** | In-memory for session; TTL; invalidation on user segment change |
| **Safety** | Default to control on API failure; kill switch |
| **DX** | Typed experiment keys; dev override via query param |

### Tradeoffs

- Server-evaluated (consistent, slower first paint) vs client-evaluated (fast, leak risk)
- Bundle all flags vs fetch per experiment (latency vs payload)
- Holdout groups / mutual exclusion complexity

### Connect to your code

> "I implemented sticky assignment with djb2 hash and exposure in a `useEffect` — at platform
> scale I'd bootstrap decisions from the server and centralize exposure through the event tracker."

---

## After each drill (5 min)

Write 3 bullets: what went well, what you forgot, one tradeoff you'd lead with next time.

Log in [`../../../mistake-log.md`](../../../mistake-log.md) if useful.
