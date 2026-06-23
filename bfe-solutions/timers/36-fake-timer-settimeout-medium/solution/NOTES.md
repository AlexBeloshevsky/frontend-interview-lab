# 36. fake timer (setTimeout) — the idea

**Plain-English approach:**

> Replace `setTimeout`/`clearTimeout`/`Date.now` with synchronous fakes backed by a
> virtual clock. `setTimeout` just records `{ id, callback, time: now + delay }`.
> `tick()` repeatedly runs the earliest task: jump the clock to its `time`, then run
> it. `Date.now()` returns the virtual `now`.

## Key primitives

- A **virtual clock** (`now`) you control, instead of wall-clock time.
- A **task list** of `{ id, callback, time }`.
- **Monkey-patching** globals on `install`, restoring them on `uninstall`.

## tick() details

- Always pick the **earliest** task (tie-break by id = insertion order).
- Set `now = task.time` *before* running it, so `Date.now()` inside the callback
  reads the correct time.
- Tasks scheduled *during* a callback are picked up because the loop re-scans until
  the list is empty.

## Why it matters

Real `setTimeout` timing is non-deterministic (event loop). A fake timer makes
time-dependent code (throttle/debounce/polling) testable and instant.
