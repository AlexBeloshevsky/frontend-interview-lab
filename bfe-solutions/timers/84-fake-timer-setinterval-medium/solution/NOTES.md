# 84. fake timer (setInterval) — the idea

**Plain-English approach:**

> Follow-up to #36. Same virtual clock, but tasks **repeat**. A task records its
> `interval`. `tick()` runs the earliest task, then — if the callback didn't
> `clearInterval` itself — reschedules it at `time + interval`. Loop until the task
> list is empty (i.e. every interval has been cleared).

## Difference from setTimeout fake timer

- A task is **not removed** after running; instead its `time` advances by `interval`.
- It only leaves the list when `clearInterval` is called.

## Avoiding the infinite loop

`tick()` runs until `tasks` is empty. An interval that never clears itself runs
forever — so the callback **must** eventually call `clearInterval`. After running a
callback, check whether the task still exists (it won't if the callback cleared it)
before rescheduling.

## Trace: interval 100, clears when count > 1

- run @100 (count 0 → log, count 1) → reschedule @200
- run @200 (count 1 → log, count 2) → reschedule @300
- run @300 (count 2 → clearInterval) → task gone, not rescheduled
- list empty → `logs === [100, 200]`
