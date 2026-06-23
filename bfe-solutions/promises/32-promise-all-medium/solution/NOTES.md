# 32. Promise.all() — the idea

**Plain-English approach:**

> Return a new promise. Track a results array and a resolved counter. As each input
> settles, store its value **at its original index** and bump the counter. When the
> counter equals the input length, resolve with the results. If any input rejects,
> reject immediately with that reason.

## Key points

- **Order is by index, not by completion** — write `results[index]`, never `push`.
  This is why out-of-order resolution still yields input order.
- **Count, don't rely on array length** — `results` is sparse while pending, so use a
  separate `resolvedCount`.
- **Fail fast** — the first rejection rejects the whole thing; later settles are
  ignored (the promise is already settled).
- **Empty input** resolves to `[]` immediately.
- `Promise.resolve(element)` normalizes plain values into promises.

## Family

- **all**: all must fulfill; rejects on first rejection.
- **allSettled**: waits for all, never rejects.
- **any**: first fulfill wins; rejects only if all reject.
- **race**: first settle (either way) wins.
