# Drill: Make the 10k-row alerts table fast (perf variant)

Same SOC context, but now the table renders **10,000+ alerts that update in real time**.
The UI janks: typing in the filter lags, scrolling drops frames, and a live "tick" that
mutates one row re-renders the whole table.

## Rules

- Timebox: **45 minutes.** Narrate. Triage. Profile before optimizing.
- "Profile before optimizing" is itself a graded signal — say you'd open React Profiler
  / Performance tab and confirm the bottleneck before reaching for `useMemo`.

## What's wrong (this is the lesson, not a hidden answer key)

`SlowTable.tsx` has the classic high-frequency-data failure modes:

1. All 10k rows mounted in the DOM (no virtualization).
2. Live updates pushed straight into component state on every tick → whole-tree re-render.
3. Filter/sort recomputed on every render and every tick.
4. Every row re-renders even when its data didn't change (no `React.memo`, unstable props).
5. Heavy sort/filter on the main thread blocks input.

## Target end-state (what "good" looks like)

- **Virtualize** the list: render only visible rows + overscan (`@tanstack/react-virtual`
  or a hand-rolled windowing hook — be able to do the hand-rolled version, it's a common
  ask: compute `startIndex`/`endIndex` from `scrollTop`, `rowHeight`, `viewportHeight`).
- **Keep the live stream out of React state.** Push ticks into an external store / ref,
  batch with `requestAnimationFrame` or a 50–100ms interval, expose via
  `useSyncExternalStore`. UI updates 4–10x/sec, not on every tick.
- **Memoize rows** (`React.memo`) with stable props + stable callbacks (`useCallback`).
- **Derive** filtered/sorted data with `useMemo`; for heavy sets, move sort/filter to a
  **Web Worker** and use `useTransition`/`useDeferredValue` so typing stays responsive.
- Stable keys (`id`, never index).

## Stretch (spoken or coded)

- `content-visibility: auto` / `contain: paint` on rows.
- Rolling buffer cap (e.g. keep last 5k) so memory/update cost stays bounded.
- Page Visibility API to pause the stream when the tab is hidden.

## Notes

`SlowTable.tsx` is intentionally minimal and self-contained so you can focus on the
perf refactor, not on reading a lot of code. Wire it into `src/App.tsx` to feel the jank.
