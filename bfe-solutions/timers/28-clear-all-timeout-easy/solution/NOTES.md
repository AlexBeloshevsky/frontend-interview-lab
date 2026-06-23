# 28. clearAllTimeout() — the idea

**Plain-English approach:**

> Wrap `setTimeout` so every id is recorded in a registry, and remove an id when
> its timer fires or is cleared. `clearAllTimeout()` just clears every id still in
> the registry.

## Key primitives

- A **registry** (`Set`) of live timeout ids.
- Wrapped `setTimeout` adds the id; the wrapper callback deletes itself before
  running the real handler (so finished timers don't linger).
- Wrapped `clearTimeout` clears + removes from the registry.

## BFE framing

The real problem overrides `window.setTimeout` / `window.clearTimeout` in place so
existing `setTimeout(...)` calls are tracked transparently. We export wrappers
instead purely so it's clean to unit-test (no global mutation leaking across files).

## Watch out

- Forward extra args (`setTimeout(fn, ms, a, b)` passes `a, b` to `fn`).
- Remove the id when the timer fires, or the registry grows unbounded.
