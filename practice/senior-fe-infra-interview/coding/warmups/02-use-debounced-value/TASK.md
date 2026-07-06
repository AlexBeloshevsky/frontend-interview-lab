# Warm-up 02 — `useDebouncedValue` (★★☆ easy–medium)

**Goal:** a small, very common interview hook. Reuses the debounce idea you already
drilled in the timers theme — just wrapped in React. ~20 min.

## Prompt

"Write a `useDebouncedValue` hook: given a value that changes often (e.g. a search
input), return a version that only updates after it's been stable for `delay` ms."

## Requirements

```ts
const debounced = useDebouncedValue(value, delay);
```

1. Initially returns `value`.
2. When `value` changes, wait `delay` ms before updating the returned value.
3. If `value` changes again before the delay elapses, restart the timer (only the
   latest value is emitted).
4. Clean up the pending timer on change and on unmount.

## Hints

- `useState` for the debounced value + `useEffect` that depends on `[value, delay]`.
- In the effect: `setTimeout` to update state after `delay`; **return a cleanup** that
  `clearTimeout`s it. That cleanup running on every change is exactly the "restart the
  timer" behavior — you get it for free from how effects work.
- This is the React-flavored cousin of your `debounce()` (#6). Same idea, no manual
  timer ref needed because the effect cleanup handles it.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/warmups/02-use-debounced-value
```

The tests use fake timers, like your debounce tests did.
