# 5. throttle() with leading & trailing — the idea

**Plain-English approach:**

> Same cooldown machine as basic throttle, but two switches:
> - **leading**: fire on the very first call (when not in cooldown)?
> - **trailing**: when the cooldown ends, replay the last swallowed call?

## State

- `timer` — non-null means "in cooldown".
- `pendingArgs` — last swallowed call.

## Defaults

- basic throttle (#4) == `{ leading: true, trailing: true }`.

## The 4 combinations (for `A B C D ... E F G`, wait 3)

- `{true, true}`   → `A C D E G`  (leading + trailing)
- `{false, true}`  → `C D G`      (A, E swallowed — no leading)
- `{true, false}`  → `A D E`      (leading only, no trailing replay)
- `{false, false}` → nothing

## Gotcha

When `leading` fires, don't also stash it as a pending trailing call, or a lone
call replays. Only stash calls that arrive *during* the cooldown.
