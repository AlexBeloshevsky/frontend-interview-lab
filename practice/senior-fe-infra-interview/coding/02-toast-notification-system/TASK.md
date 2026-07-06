# Exercise 02 — Toast notification system

**Infra muscle:** building a cross-cutting *platform service* with a clean imperative
API that the whole app calls into. Provider + hook + lifecycle (timers) + cleanup.
(Bonus: you just drilled timers — auto-dismiss reuses that mental model.)

- **Timebox:** 45 min. Narrate. Run the playbook in `../../INTERVIEW-BRIEF.md`.

## Prompt

"Build a toast/notification system. Anywhere in the app, a developer should be able to
call something like `toast('Saved!')` and see a notification appear and auto-dismiss.
Design the API and implement it."

## Step 0 — clarify first

- Imperative API (`toast('msg')`) vs declarative (`<Toast/>`)? (They want imperative —
  that's the interesting infra question.)
- Variants? (info / success / error)
- Auto-dismiss after a duration? Configurable? Can a toast be sticky?
- Can the user dismiss manually? Dismiss all?
- Stacking limit / queueing when too many?
- Where do toasts render? (a single portal/region at the app root)
- Accessibility — screen readers should announce toasts.

## Suggested API (refine it; the design IS the exercise)

```tsx
<ToastProvider>
  <App />
</ToastProvider>

// anywhere inside:
const { toast, dismiss, clear } = useToast();
const id = toast("Saved!", { variant: "success", duration: 4000 });
dismiss(id);
```

## Requirements

1. `ToastProvider` holds the list of active toasts and renders them in one region.
2. `useToast()` exposes the imperative API: `toast(message, options) => id`,
   `dismiss(id)`, `clear()`.
3. Each toast gets a **unique id**.
4. **Auto-dismiss** after `duration` (default e.g. 4000ms). `duration: 0`/`Infinity` =
   sticky.
5. Manual dismiss removes a specific toast; `clear()` removes all.
6. **Cleanup:** clearing/unmounting must clear pending timers (no setState after
   unmount).
7. `useToast()` outside a `ToastProvider` should throw a clear error.

## Break it down

- `types.ts` — the public types (start here; it forces the API decisions).
- Context + provider state (`Toast[]`), reducer or `useState`.
- `toast()` — generate id, add to state, schedule auto-dismiss.
- Timer bookkeeping — a ref mapping `id -> timeoutId`, cleared on dismiss/unmount.
- A presentational `ToastRegion` / `ToastItem` (kept dumb).

## What "good" looks like

- Clean separation: provider owns state + timers; items are presentational.
- Stable API functions (`useCallback`) so consumers can depend on them.
- Timers tracked and cleared (tie-in to `clearAllTimeout`); no leaks on unmount.
- A11y: region with `role="status"` / `aria-live="polite"` (or `assertive` for errors).
- Sensible defaults; hard to misuse; `useToast` errors loudly outside the provider.

## Stretch

- Max visible + queue overflow (FIFO) — uses the same "pending queue" idea as throttle.
- Pause-on-hover (clear + restart the dismiss timer).
- De-dupe identical messages.

## Tests worth writing (verification is graded)

- `toast()` adds a toast and returns an id; it appears in the region.
- auto-dismiss removes it after `duration` (use `vi.useFakeTimers()`).
- `dismiss(id)` removes only that toast; `clear()` removes all.
- sticky toast (`duration: 0`) is not auto-removed.
- `useToast()` outside provider throws.

## Self-check

Score with `../../coding-rubric.md`; log a line in `../../../mistake-log.md`.
