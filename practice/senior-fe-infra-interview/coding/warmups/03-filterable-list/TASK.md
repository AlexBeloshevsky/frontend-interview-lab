# Warm-up 03 — `FilterableList` (★★☆ easy)

**Goal:** a small interactive component with the states interviewers always check. You
already did a version of this in `react-components/productListRender` — this time keep
it tight and clean. ~20 min.

## Prompt

"Render a list of items with a search box that filters them as the user types."

## Requirements

```tsx
<FilterableList items={["Apple", "Banana", "Cherry"]} />
```

1. Renders all `items` initially.
2. A text input filters the list as you type, **case-insensitive**, matching substrings.
3. Shows an **empty state** ("No results") when nothing matches.

## Hints

- One piece of state: the query string. The filtered list is **derived** — compute it
  during render, don't store it in a second `useState` (storing derived state is a
  classic smell interviewers look for).
- Controlled input: `value={query}` + `onChange`.
- A label or `aria-label` on the input is a cheap a11y win — mention it.

## Break it down (say this out loud)

- State: `query`.
- Derived: `filtered = items.filter(...)`.
- Render: input, then either the `<ul>` or the empty state.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/warmups/03-filterable-list
```
