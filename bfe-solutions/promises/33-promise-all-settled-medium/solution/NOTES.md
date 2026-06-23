# 33. Promise.allSettled() — the idea

**Plain-English approach:**

> Like `all`, but it **never rejects**. Each input maps to a descriptor:
> `{ status: 'fulfilled', value }` or `{ status: 'rejected', reason }`. Store each at
> its index, count settlements, and resolve once every input has settled.

## Key difference from all

- Handle *both* outcomes of each promise (use `.then(onFulfilled, onRejected)`), and
  record the outcome instead of bailing out.
- The wrapping promise only ever **resolves** — with the array of descriptors.

## Details

- `.finally()` is a clean place to bump the counter, since it runs after either
  branch.
- Same "write by index, count separately" trick as `all` to preserve order.
- Empty input → resolves to `[]`.
