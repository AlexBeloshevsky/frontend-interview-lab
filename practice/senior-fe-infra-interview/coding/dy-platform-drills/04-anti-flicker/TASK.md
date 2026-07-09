# Drill 4 — Anti-flicker (hide-until-ready + timeout fallback) ★★☆

**Why DY:** the signature personalization-vendor problem. If you fetch a variant/decision
async and *then* swap the DOM, the user sees the **original** content first, then it
flickers to the personalized version (FOUC + layout shift). The fix: **hide the content
up front, reveal it once decisions resolve** — but with a **timeout fallback** so a slow/
failed decision can never leave the page hidden forever. Being able to discuss this
tradeoff (flicker vs. a brief blank) is a strong signal.

## Contract

```ts
export interface AntiFlickerOptions {
  timeoutMs?: number;      // reveal no matter what after this (default 3000)
  root?: HTMLElement;      // element to hide/reveal (default document.documentElement)
}

// hides `root`, then reveals it when `ready` settles OR the timeout fires — whichever first
export function hidePageUntil(ready: Promise<unknown>, opts?: AntiFlickerOptions): void;
```

## Requirements (what the tests check)

1. **Hides `root` immediately** (set `style.opacity = "0"` — simple + testable).
2. **Reveals when `ready` resolves** (restore opacity).
3. **Reveals after `timeoutMs`** even if `ready` never settles (the safety net).
4. Whichever fires first wins, and it **doesn't re-hide** afterward. (Also: clear the
   timer when the promise wins, and reveal on reject too — never strand the page hidden.)

## Design notes

- Reveal exactly once — guard with a `revealed` flag or clear the timeout in the promise
  handler and vice-versa.
- `ready.finally(reveal)` handles both resolve and reject (a failed decision must still
  reveal — showing default content beats a blank page).
- In production you set opacity via a class the anti-flicker snippet injects *before*
  first paint; opacity here keeps it observable in a test.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/04-anti-flicker
```
