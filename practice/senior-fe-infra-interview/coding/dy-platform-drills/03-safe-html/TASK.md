# Drill 3 — `sanitizeHtml` (XSS-safe content injection) ★★★

**Why DY:** you inject personalized content/HTML into customers' pages. Any HTML that
originates from data (product names, campaign copy, CMS) is an **XSS vector** the moment
it hits the DOM. Before you'd ever `innerHTML`/`dangerouslySetInnerHTML` it, you sanitize
against an **allowlist**. (In production you'd reach for DOMPurify — this drill is to show
you understand *what it does and why*.)

> Real talk: hand-rolled sanitizers are hard to get fully right — that's the point of the
> exercise. Aim to defend the common vectors below, and say "in prod I'd use DOMPurify."

## Contract

```ts
export interface SanitizeOptions {
  allowedTags?: string[];  // default: a, b, i, em, strong, p, ul, ol, li, span, br
  allowedAttrs?: string[]; // default: href, title
}

export function sanitizeHtml(dirty: string, opts?: SanitizeOptions): string;
```

## Requirements (what the tests check)

1. **Keeps** allowed tags and their text (`<p>`, `<strong>`, …).
2. **Removes `<script>`** entirely.
3. **Strips inline event handlers** — any `on*` attribute (`onerror`, `onclick`, …).
4. **Blocks `javascript:` URLs** in `href`, but keeps safe ones (`https:`, relative).
5. **Unwraps disallowed tags** but keeps their text content (e.g. a `<div>` becomes its
   inner text/children when `div` isn't allowed).

## Design notes

- Parse into a detached tree: `const tpl = document.createElement("template"); tpl.innerHTML = dirty;`
  then walk `tpl.content`. Parsing in a `<template>` is inert (scripts don't execute).
- For each element: if the tag isn't allowed → replace it with its children (unwrap). If
  allowed → drop every attribute not in `allowedAttrs`, drop anything starting with `on`,
  and for `href`/`src` reject non-safe protocols.
- Walk children **before** removing/unwrapping the parent, or iterate over a static copy —
  mutating a live NodeList while iterating is a classic bug.
- Return `tpl.innerHTML`.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/03-safe-html
```
