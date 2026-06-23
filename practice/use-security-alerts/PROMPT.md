# useSecurityAlerts (custom hook design)

Not on bfe.dev — looks company-specific (Cortex/XSIAM-flavored). Tests custom-hook API
design, data modeling (state shape), and immutable updates.

## Problem

Build a React hook to manage security alerts. Categorize alerts (Phishing, Malware,
DDoS, ...) and:

- Store alerts in categories.
- Add a new alert to a given category.
- Remove a specific alert.
- Get alerts by category.
- Get alerts by priority, **across all categories**.

## The key decision (say this out loud)

State shape drives everything:

- `Record<Category, Alert[]>` (a map) → `getAlertsByCategory` is O(1), but
  `getAlertsByPriority` must flatten across categories. Matches the given `useState({})`.
- Flat `Alert[]` → priority filter is trivial, but category grouping is derived each time.

Either is defensible; pick one and justify. The given starter seeds a map, so the
reference solution uses the map and pays the flatten cost in `getAlertsByPriority`.

## Edge cases to cover

- Add to a brand-new category (no array yet).
- Remove from a missing category / missing id → no-op, return same state.
- Immutability: never `push` into `prev[category]`.
- Optional: dedupe by id; drop a category when it becomes empty.
