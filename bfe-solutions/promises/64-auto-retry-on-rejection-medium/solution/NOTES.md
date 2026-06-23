# 64. auto-retry Promise on rejection — the idea

**Plain-English approach:**

> Call the fetcher. If it resolves, you're done. If it rejects and you still have
> retries left, call yourself again with `maximumRetryCount - 1`. If retries are
> exhausted, rethrow the error so the caller sees the failure.

## Key points

- **Recursion on the catch path** — each rejection consumes one retry and re-invokes.
- **Base case** — `maximumRetryCount <= 0` rethrows instead of retrying.
- Total attempts = `maximumRetryCount + 1` (the initial call plus N retries).

## Variations you might be asked

- Add a delay between retries (`setTimeout` wrapped in a promise).
- Exponential backoff (`delay * 2 ** attempt`).
- Only retry on certain error types.
