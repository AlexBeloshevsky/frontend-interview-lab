# Week 02 Progress

## Theme

Focused on async JavaScript, STAR interview practice, and TypeScript/API modeling.

## Completed

### STAR: Ownership story

- Drafted a STAR story about owning the RTP unpaid bills experiment.
- Practiced framing a product experiment that was technically successful but did not produce net business lift.
- Key themes:
  - ownership
  - architecture
  - cross-team coordination
  - API call tradeoffs
  - feature flags
  - experiment monitoring
  - learning from data

### Promise.all

- Built `bfe-solutions/promise-all/`
- Implemented a simplified `Promise.all`
- Added tests for:
  - empty array
  - plain values
  - promises
  - mixed values/promises
  - preserving input order
  - rejection handling

### TypeScript API response modeling

- Practiced modeling API responses with discriminated unions.
- Discussed the difference between HTTP success and application success.
- Noted that GraphQL can return HTTP 200 with application-level errors.
- Preferred normalizing raw API responses into a UI-facing union:

```ts
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };
```

## Interview notes

### Promise.all explanation

`promiseAll` returns an outer promise. Each item is normalized with `Promise.resolve`, so the implementation can handle both plain values and promises. Results are stored by index because promises may resolve out of order, but the final result must preserve input order. If any item rejects, the outer promise rejects.

### API response modeling

A 200 HTTP response does not always mean the operation succeeded. In GraphQL, a response can include an `errors` array even when the transport succeeded. I prefer normalizing raw responses into a discriminated union so React components can render success and error states safely.
