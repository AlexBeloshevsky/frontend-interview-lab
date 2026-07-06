# Exercise 03 — Tabs (compound, accessible component)

**Infra muscle:** designing a composable, accessible component API — the heart of a
design system. This question rewards clean API design and a11y, both explicitly called
out by the recruiter ("clear & scalable code", "break it into pieces").

- **Timebox:** 45 min. Narrate. Run the playbook in `../../INTERVIEW-BRIEF.md`.

## Prompt

"Build a reusable `Tabs` component. A consumer should be able to declare a set of tabs
and panels and have the right panel show for the selected tab. Make the API clean and
accessible."

## Step 0 — clarify first

- API style: a single config-prop component, or a **compound** component
  (`<Tabs><TabList><Tab/></TabList><TabPanel/></Tabs>`)? (Compound is the
  design-system answer — more flexible composition.)
- **Controlled vs uncontrolled?** Support both: `value`/`onChange` (controlled) and
  `defaultValue` (uncontrolled).
- Accessibility expectations? (roles, keyboard arrow navigation, focus management)
- Lazy-render panels or render all and hide?

## Suggested API

```tsx
<Tabs defaultValue="overview" onChange={(v) => ...}>
  <TabList aria-label="Account">
    <Tab value="overview">Overview</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>
  <TabPanel value="overview">…</TabPanel>
  <TabPanel value="billing">…</TabPanel>
</Tabs>
```

## Requirements

1. Compound components sharing state via **context** (no prop-drilling the active id).
2. **Controlled and uncontrolled** modes (`value`+`onChange`, or `defaultValue`).
3. Clicking a `Tab` activates it and shows the matching `TabPanel`.
4. **Accessibility:**
   - `TabList` has `role="tablist"`, each `Tab` `role="tab"` with `aria-selected`,
     each `TabPanel` `role="tabpanel"`.
   - Wire `aria-controls` / `id` between tab and panel.
   - **Keyboard:** Arrow keys move between tabs (roving `tabIndex`), Home/End jump to
     first/last.
5. No `any`; precise prop types.

## Break it down

- `TabsContext` — `{ activeValue, setActiveValue, registerTab? }`.
- `Tabs` — owns state (controlled/uncontrolled merge), provides context.
- `TabList` — `role="tablist"`, handles arrow-key navigation across its tabs.
- `Tab` — reads context, renders a `<button role="tab">`, sets `aria-selected`.
- `TabPanel` — renders children only when its `value` is active (or always, hidden).

## What "good" looks like

- The controlled/uncontrolled merge done cleanly (one source of truth; `value ??
  internalValue`).
- Context keeps the API flat for consumers; pieces compose freely.
- Real keyboard a11y (roving tabindex), not just click handlers.
- Buttons are `<button>`, not clickable `<div>`s.
- Scales: adding a tab is just adding `<Tab>` + `<TabPanel>`, no wiring.

## Stretch

- Expose as a namespace (`Tabs.List`, `Tabs.Tab`, `Tabs.Panel`).
- `orientation="vertical"` (arrow key axis changes).
- Lazy-mount panels; keep-alive option.

## Tests worth writing

- Renders only the active panel; clicking a tab switches panels.
- Uncontrolled uses `defaultValue`; controlled respects `value` + calls `onChange`.
- Arrow keys move selection; `aria-selected` tracks the active tab.

## Self-check

Score with `../../coding-rubric.md`; log a line in `../../../mistake-log.md`.
