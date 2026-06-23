# Drill: Add i18n to an existing component (secondary rep)

Lower probability for Cortex/XSIAM than perf or data-layer, but a clean test of
architecture seams and locale-aware formatting. Do this ONCE, timeboxed to ~30 min.

## Scenario

`HardcodedPanel.tsx` is a SOC summary panel with English strings, dates, numbers, and a
pluralized count baked directly into JSX. Internationalize it using an external library
(react-i18next assumed — name your choice and why).

## Tasks (in priority order)

1. **Extract strings** into a translation resource keyed by namespace
   (`en.json`), replace literals with `t('key')`. No hardcoded user-facing text in JSX.
2. **Pluralization**: "1 alert" vs "5 alerts" via the library's plural rules, not `if`.
3. **Interpolation**: variables inside strings (`t('greeting', { user })`), not string
   concatenation (which breaks word order in other languages).
4. **Number/date/relative-time formatting** via `Intl.NumberFormat` /
   `Intl.DateTimeFormat` / `Intl.RelativeTimeFormat` (the library wraps these). No manual
   `toLocaleString()` scattered around.
5. **Lazy-load locale bundles** (don't ship every language up front) and define a
   **fallback locale** + behavior for missing keys.
6. Mention **RTL** (dir="rtl") and that severity must not be conveyed by English text alone.

## Talking points (the senior signal)

- i18n is an architecture seam: a `t()` boundary + a formatting boundary, same idea as
  isolating the data layer. Retrofitting is mostly mechanical once the seam exists.
- Don't concatenate translated fragments — pass variables into a single keyed string.
- Keys should be semantic (`alerts.empty`) not English-derived (`noAlertsFound`).
- Pseudolocalization in CI catches hardcoded strings and layout-overflow bugs early.

## Acceptance

Switching locale (even to a stub `xx.json`) changes every visible string, number, and
date, with no code changes beyond loading the new bundle.
