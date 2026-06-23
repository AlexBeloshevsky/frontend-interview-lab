# 6. basic debounce() — the idea

**Plain-English approach:**

> Every call cancels the previously scheduled invocation and schedules a new one
> `wait` ms in the future. The function only actually runs once the calls go quiet
> for `wait` ms. Always fire with the **latest** args.

## Key primitives

- **Closure over `timer`** — one shared timer id across calls.
- **`clearTimeout` + `setTimeout`** — cancel the pending run, reschedule.
- Capture **latest args** in the closure each call.

## Mental model

Debounce = "wait until the noise stops, then act once." Think search-as-you-type:
only query the API after the user pauses typing.

## Contrast with throttle

- **Debounce**: fires after a quiet gap. Bursty input → one trailing call.
- **Throttle**: fires at a steady max rate during continuous input.
