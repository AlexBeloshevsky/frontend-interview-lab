# 35. Promise.race() — the idea

**Plain-English approach:**

> Return a new promise. Attach `.then(resolve, reject)` to *every* input. The very
> first one to settle wins, because a promise can only settle once — later
> `resolve`/`reject` calls are no-ops.

## Key insight

A promise **locks in on first settle**. So you don't need to track "who's first" —
just forward every input's outcome to the same `resolve`/`reject`, and the runtime
ignores all but the first.

## Details

- Wrap each item in `Promise.resolve(item)` so plain values work too.
- Empty input → the returned promise never settles (this matches native `race`).

## Family

- **race**: first to settle (resolve OR reject) wins.
- **any**: first to *fulfill* wins; rejects only if all reject.
- **all**: all must fulfill; rejects on first rejection.
- **allSettled**: waits for all, never rejects.
