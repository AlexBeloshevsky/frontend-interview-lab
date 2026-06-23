# 7. debounce() with leading & trailing — the idea

**Plain-English approach:**

> Same "wait until quiet" timer as basic debounce, but:
> - **leading**: if NOT currently waiting, fire immediately on the first call.
> - **trailing**: when the timer finally fires, run with the latest pending args.
>
> The subtlety: a single isolated call must not fire twice. So when `leading`
> already fired this call, don't also record it as a pending trailing call.

## State

- `timer` — are we currently in a wait window?
- `pendingArgs` — the latest call to (maybe) replay on the trailing edge.

## Defaults

- basic debounce (#6) == `{ leading: false, trailing: true }`.

## The 4 combinations (for `A@0 B@2 C@3`, wait 3)

- `{false, true}`  → `C@6`   (trailing only)
- `{true, true}`   → `A@0, C@6`
- `{true, false}`  → `A@0`   (leading only)
- `{false, false}` → nothing

## Gotcha

If `leading` fired on this call, leave `pendingArgs` null so a lone call doesn't
double-fire on the trailing edge.
