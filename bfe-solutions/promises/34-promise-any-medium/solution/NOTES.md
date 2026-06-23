# 34. Promise.any() — the idea

**Plain-English approach:**

> The mirror image of `all`. Resolve as soon as **any** input fulfills. Only reject
> if **every** input rejects — and then reject with an `AggregateError` carrying all
> the individual errors (in input order).

## Key points

- Forward every fulfillment straight to `resolve` — first one wins, the rest are
  ignored (promise already settled).
- Track rejections: store each error by index and count them. When the count hits the
  input length, *all* failed → reject with `new AggregateError(errors, message)`.
- **Empty input** rejects immediately with an `AggregateError` (no promise can fulfill).

## Contrast

- `all` counts *fulfillments* and rejects on the first rejection.
- `any` counts *rejections* and resolves on the first fulfillment.
  They're structurally symmetric.
