# Warm-up 01 — `useCounter` (★☆☆ easy)

**Goal:** shake off the rust. A tiny custom hook. ~10–15 min. You should breeze this.

## Prompt

"Write a `useCounter` hook for a counter with a few controls."

## Requirements

```ts
const { count, increment, decrement, reset, set } = useCounter(initialValue = 0);
```

1. `count` starts at `initialValue` (default `0`).
2. `increment()` adds 1, `decrement()` subtracts 1.
3. `reset()` returns to the initial value.
4. `set(n)` sets an explicit value.

## Hints

- One `useState`. That's it.
- Use the **functional updater** form (`setCount(c => c + 1)`) so rapid calls are
  correct — that's the one "best practice" worth saying out loud here.
- Wrap the handlers in `useCallback` so they're stable (nice habit; mention why).

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/warmups/01-use-counter
```

Make it green, feel good, move to 02.
