# 63. cloneDeep() — the idea

**Plain-English approach:**

> Recurse. If the value is a primitive (or null), return it as-is. Otherwise create a
> fresh container (array or object), then deep-clone each element/property into it.
> Track already-cloned objects in a `WeakMap` so **circular references** terminate and
> shared references stay shared.

## Key primitives

- **Recursion** over the structure.
- **Base case**: `typeof data !== 'object' || data === null` → return as-is.
- **`WeakMap` of seen → clone**: the circular-reference guard. Register the clone
  *before* recursing into children, so a self-reference resolves to the in-progress
  clone instead of looping forever.

## The ordering trap

You must `seen.set(source, copy)` **before** cloning the children. If you populate the
copy first and set `seen` after, a cycle (`obj.self = obj`) recurses infinitely.

## Scope (basic version)

- Covered: primitives, arrays, plain objects, cycles.
- Not covered: `Map`/`Set`/`Date`/`RegExp`, functions, symbols, prototypes. The full
  lodash `cloneDeep` handles these by branching on the value's type tag.
