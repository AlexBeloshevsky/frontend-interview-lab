# Planted issues (answer key) — do NOT read before your attempt

Score how many you found and fixed using `../refactor-rubric.md`. The point isn't to
fix all of them in 45 min — it's to find the high-impact ones first and say so.

## Correctness / security (fix first)

1. **XSS via `dangerouslySetInnerHTML`** on `description_html` (table + modal). Attacker-
   controlled alert text rendered as HTML. In a security product this is the headline bug.
   Fix: render as text, or sanitize (e.g. DOMPurify) if HTML is truly required.
2. **`setInterval` never cleared** — memory leak + stacking polls. Needs cleanup in the
   effect return, ideally with abort on unmount.
3. **State mutation in `acknowledge`** — mutates `alerts[i]` then `setAlerts(alerts)` with
   the same reference. React won't re-render reliably. Fix: immutable update (map).
4. **`detected_at` may be an epoch number or ISO string**; `new Date(number)` vs
   `new Date(isoString)` both work but the raw mixed type should be normalized at the
   data boundary, not trusted in the view.
5. **Refetch on every keystroke** — `search`/`severityFilter`/`sortDir` in the fetch
   effect deps. Filtering/sorting are client-side; they must not trigger network calls.
6. **No error handling** — the API rejects ~10% of the time; the promise has no `.catch`,
   so failures vanish and loading state can get stuck.

## Performance (hot path)

7. **Filter + sort run on every render**, including unrelated state changes (e.g. opening
   the modal). Should be derived with `useMemo` keyed on inputs.
8. **`.sort()` mutates** the filtered array (acceptable here since filter returns a new
   array, but call it out — sorting source data is a classic bug).
9. **Unstable keys**: `key={i}` (array index) on a list that re-sorts/filters → broken
   reconciliation, wrong row state. Use `a.id`.
10. **Inline object literals** (`style={{...}}`) recreated each render; rows not memoized.
    Minor at 200 rows, major at 10k (see the perf variant).
11. **`rank()` redefined every render** — fine functionally, but move it to module scope.

## Architecture / separation of concerns

12. **One component does everything**: fetching, polling, transform, filter, sort, render,
    modal. Extract `useAlerts()` (data), `useAlertFilters()` (derive), `<AlertsTable>`,
    `<AlertDetails>`.
13. **Data fetching inside the component** — no seam. This is the same lesson as the
    data-layer drill: isolate transport so REST↔GraphQL is a localized change.

## Types

14. **`props: any`**, **`useState<any[]>`**, **`selected: any`** — no model. Define an
    `Alert` domain type + a `Severity` union, and normalize `RawAlert → Alert` at the edge.
15. **`==` instead of `===`** throughout.

## Accessibility

16. **Clickable `<span>`s** for sort/details — not focusable, no keyboard, no role. Use
    `<button>`.
17. **Modal has no focus trap, no `role="dialog"`, no Escape-to-close, no label.**
18. **Color-only severity signal** (red background) — needs text/icon too.
19. **`<input>`/`<select>` have no associated `<label>`.**

## Testing / robustness

20. No tests. A good rep adds one for the normalization (epoch vs ISO) and one for the
    filter/sort logic once extracted into a pure function.
