# Week 01 Progress

## Theme

Started the frontend interview lab and created the first interview-prep artifacts.

## Completed

### Day 1: Debounce

- Built `bfe-solutions/debounce/`
- Practiced closures, timers, `setTimeout`, `clearTimeout`
- Added tests and README
- Future improvements: preserve `this`, add `cancel`, add `flush`

### Day 2: Autocomplete

- Built `react-components/autocomplete/`
- Added controlled input, local filtering, empty state, selection, and dropdown close
- Added Vitest + React Testing Library tests
- Practiced derived data vs state:
  - `filteredOptions` is derived from `options + inputValue`
  - `isOpen` is separate because the input can have a value while the dropdown is closed

## Setup

- Added React/Vite
- Added Vitest + React Testing Library
- Switched from `jsdom` to `happy-dom`
- Added cleanup in `test/setup.ts`

## Remaining This Week

Since there is only one day left this week, keep it light:

- Add `browser-notes/event-loop.md`
- Add `architecture-opinions/use-effect-vs-custom-hook-vs-swr.md`
