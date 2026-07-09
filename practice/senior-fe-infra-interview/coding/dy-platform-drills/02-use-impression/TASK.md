# Drill 2 — `useImpression` (IntersectionObserver) ★★☆

**Why DY:** an "impression" should only count when a recommendation is **actually seen**
(scrolled into view), not merely rendered. `IntersectionObserver` is the right,
performant tool (no scroll-event thrashing). This pairs with Drill 1: impression fires →
`tracker.track(...)`.

## Contract

```ts
export interface UseImpressionOptions {
  threshold?: number; // visibility ratio to count as seen (default 0.5)
  once?: boolean;     // fire only the first time it becomes visible (default true)
}

// returns a ref callback you attach to the element you want to observe
export function useImpression<T extends Element>(
  onImpression: () => void,
  options?: UseImpressionOptions,
): (node: T | null) => void;
```

Usage:

```tsx
const ref = useImpression(() => tracker.track({ type: "impression", id }));
return <li ref={ref}>...</li>;
```

## Requirements (what the tests check)

1. When the ref is attached to a node, it **observes** that node.
2. `onImpression` fires when the element **becomes intersecting**.
3. It does **not** fire while the element is not intersecting.
4. With `once` (default `true`), it fires **exactly once** and then **disconnects**.
5. With `once: false`, it fires **every time** the element re-enters view.

## Design notes

- Use a **ref callback** (not `useRef` + `useEffect`): create the observer when the node
  is attached, `disconnect()` when it's `null` (React calls your callback with `null` on
  unmount / when the node changes). This keeps observe/cleanup co-located.
- Keep the latest `onImpression` in a ref if you want to avoid re-creating the observer
  when the callback identity changes (the stable-callback footgun again).
- Pass `{ threshold }` to the `IntersectionObserver` constructor.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/02-use-impression
```

The test provides a **mock `IntersectionObserver`** (the real one doesn't exist in the
test DOM) — read it; it shows exactly how observers are driven.
