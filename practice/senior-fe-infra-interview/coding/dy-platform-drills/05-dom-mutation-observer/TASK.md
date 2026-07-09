# Drill 5 — DOM mutation observer (SPA personalization) ★★☆

**Why DY:** their SPA integration blog explicitly uses **`MutationObserver`** to detect
when the host page's DOM changes (React route transitions, lazy-loaded content) so
personalization can **re-apply** at the right moment. This is one of the most credible
DY-specific frontend topics you can build.

## Contract

```ts
export interface ObserveDomOptions {
  debounceMs?: number;  // default 100 — coalesce rapid mutations
  subtree?: boolean;    // default true
  childList?: boolean;  // default true
}

/** Watch `target` for DOM changes; call `onChange` (debounced). Returns disconnect. */
export function observeDomChanges(
  target: Node,
  onChange: () => void,
  options?: ObserveDomOptions,
): () => void;
```

## Requirements (what the tests check)

1. Calls `observer.observe(target, { subtree, childList })`.
2. Invokes `onChange` when mutations fire (after debounce).
3. **Debounces** rapid mutation bursts into one callback.
4. Returned **disconnect** stops further callbacks (and clears pending debounce).

## Design notes (say out loud)

- DY uses this because SPAs don't full-page-reload — new product cards appear via JS,
  and the script must notice and inject recommendations / run experiments.
- Debounce prevents thrashing when React renders many nodes at once.
- In production you'd also track **which nodes** changed and only re-run relevant campaigns.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/05-dom-mutation-observer
```

See `solution/` for reference implementation.
