# 1. curry() — the idea

**Plain-English approach (re-derive from this, don't memorize the code):**

> Collect arguments. If I have at least as many as the original function declares
> (`fn.length`), call it. Otherwise return a function that, when called, appends
> the next batch of args and tries again.

## Key primitives

- **Closures** — the returned function remembers the args collected so far.
- **`fn.length`** — number of declared parameters; the "do I have enough yet?" signal.
- **Recursion** — a named inner function (`curried`) that calls itself with a longer arg list.
- **Rest/spread** — `...args` to gather, `fn(...args)` / `curried(...args, ...next)` to forward.

## Trace: `curriedJoin(1)(2, 3)` where `join` has length 3

1. `curried(1)` → `args=[1]`, `1 >= 3` false → return `(...next) => curried(1, ...next)`
2. call with `(2,3)` → `curried(1, 2, 3)`
3. `args=[1,2,3]`, `3 >= 3` true → `join(1,2,3)` → `'1_2_3'`

## Gaps to be aware of

- **`this` binding** is lost (`fn(...args)` instead of `fn.apply(this, args)`). The full
  version uses `fn.apply(this, args)` + a regular `function` continuation.
- **`fn.length` ignores default/rest params** (`(a, b = 1) => {}` has length 1), so such
  functions fire earlier than expected.
