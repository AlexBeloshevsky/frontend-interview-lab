# 4. basic throttle() — the idea

**Plain-English approach:**

> Fire immediately, then enter a cooldown of `wait` ms. Calls during the cooldown
> are swallowed, but the **last** one is remembered. When the cooldown ends, if a
> call was waiting, fire it (with the latest args) and start another cooldown.

## State

- `timer` — non-null means "in cooldown".
- `pendingArgs` — the last swallowed call, replayed when cooldown ends.

## Trace: `A@0 B@2 C@3`, wait 3 → `A@0, C@3`

- `A@0`: no cooldown → fire A, start cooldown (ends at 3).
- `B@2`: in cooldown → remember B.
- `C@3`: the queued input call runs just before the cooldown timer → remember C
  (overwrites B). Then the cooldown fires → replay C at t=3. → `A@0, C@3`.

## Mental model

Throttle = "act at a steady max rate." Think a scroll/resize handler that should run
at most once per frame, no matter how many events fire.

## Contrast with debounce

- **Throttle**: leading fire + steady rate during continuous input.
- **Debounce**: nothing until the input goes quiet, then one trailing fire.
