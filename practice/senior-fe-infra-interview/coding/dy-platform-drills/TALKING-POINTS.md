# DY platform drills — verbal talking points

Use these when you **don't** need to implement from scratch (drills 3 & 4, or cross-cutting
topics in SD). Aim for 2–3 sentences each — enough to show you understand tradeoffs.

---

## Drill 3 — Safe HTML / XSS (study `03-safe-html/solution/`)

**Problem:** DY injects personalized HTML into customer sites. Untrusted strings → XSS if
you use `innerHTML` / `dangerouslySetInnerHTML` blindly.

**Approach:** Allowlist tags + attrs; strip `on*` handlers; block `javascript:` URLs;
drop `<script>`/`<style>` entirely; unwrap disallowed wrappers but keep text.

**Production:** "I'd use **DOMPurify** — battle-tested. Hand-rolling is for understanding,
not shipping."

**Interview line:** "Sanitize at the trust boundary before any DOM write; never trust CMS /
product feed HTML."

---

## Drill 4 — Anti-flicker (study `04-anti-flicker/solution/`)

**Problem:** Async personalization → user sees default content, then it swaps (FOUC/CLS).
Bad UX and bad for experiments (user saw wrong variant).

**Approach:** Hide (`opacity: 0`) immediately → reveal when decision promise settles OR
timeout (whichever first) → reveal on error too (default content beats blank page).

**Tradeoff:** Brief blank vs visible flicker. Vendors pick blank-with-timeout.

**Interview line:** "Anti-flicker snippet runs before first paint; timeout fallback so a
slow API never leaves the page hidden forever."

---

## Event tracker — `sendBeacon` + `keepalive` (you built this)

**Problem:** Final event batch on navigation — normal `fetch` gets cancelled on unload.

**Approach:** Batch in memory; flush on size/interval/`pagehide`; **`sendBeacon` first**,
`fetch({ keepalive: true })` fallback.

**Why `pagehide` not `unload`:** More reliable on mobile, bfcache-friendly.

---

## Style isolation (your recommendations widget)

**Problem:** Widget CSS on host page → collisions both ways.

**Approach:** CSS Modules / Shadow DOM; scoped class names; avoid global selectors.

---

## Embeddable script — don't crash the host

**Problem:** Your exception becomes their outage.

**Approach:** Error boundary around widget root; try/catch on init; graceful empty states;
never throw into host's global handlers uncaught.

---

## Impression vs render (Drill 2)

**Render ≠ seen.** Use **IntersectionObserver** + threshold; fire once (`once: true`) for
experiment exposure; pair with event tracker.

---

## SPA + MutationObserver (Drill 5)

**Problem:** No full page reload — new DOM nodes appear via React router / lazy load.

**Approach:** `MutationObserver` on root (subtree) + **debounce** → re-run campaign
matching / re-inject widgets. DY blog names this explicitly.

**Tradeoff:** Debounce delays re-apply slightly vs thrashing on large DOM diffs.

---

## Experimentation (your `useExperiment`)

**Sticky bucketing:** hash `(experimentName, userId)` → variant. Deterministic, no storage.

**Exposure:** log once per mount (effect, not render). Separate from assignment.

**Server vs client eval:** Client = possible flicker; server/edge = faster correct variant
but harder integration.

---

## Performance (sound bites)

- Image dimensions → prevent CLS
- `loading="lazy"` on below-fold recs
- Lazy-load the script itself (`async`/`defer`)
- Don't block main thread on large DOM walks

---

## Privacy / consent (mention if asked)

- Respect consent banners before tracking
- Avoid PII in event payloads
- First-party cookies / IDs where possible (third-party cookie deprecation)
