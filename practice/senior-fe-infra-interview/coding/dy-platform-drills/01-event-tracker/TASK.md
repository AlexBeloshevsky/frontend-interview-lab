# Drill 1 — Event Tracker (batching + `sendBeacon`) ★★☆

**Why DY:** their collection script fires impression/click events constantly. Sending
one HTTP request per event would hammer the network and lose events on page unload. The
standard answer: **batch in memory, flush on size/interval, and flush on unload with
`navigator.sendBeacon`** (which survives navigation, unlike a normal `fetch`).

This is a classic infra coding question. Build from a blank file.

## Contract

```ts
export interface TrackerOptions {
  endpoint: string;
  batchSize?: number;        // default 10 — flush when the queue reaches this
  flushIntervalMs?: number;  // default 5000 — flush periodically
  transport?: (endpoint: string, events: unknown[]) => void; // injectable (tests)
}

export interface Tracker {
  track(event: unknown): void; // enqueue
  flush(): void;               // send + clear queue now (no-op if empty)
  stop(): void;                // tear down: clear interval + listeners
}

export function createEventTracker(options: TrackerOptions): Tracker;
```

## Requirements (what the tests check)

1. `track` enqueues; **no send** until `batchSize` is reached.
2. Reaching `batchSize` **auto-flushes** all queued events in one call.
3. `flush()` sends the queue then **empties** it; a second `flush()` with an empty queue
   does nothing.
4. Flushes automatically **every `flushIntervalMs`** (use `setInterval`).
5. Flushes on **`pagehide`** (listen on `window`).
6. `stop()` clears the interval and removes the listener (no more flushing after).

## Design notes (say these out loud)

- The **default transport** (when none injected) should prefer
  `navigator.sendBeacon(endpoint, body)` and fall back to
  `fetch(endpoint, { method: "POST", body, keepalive: true })`. `keepalive`/`sendBeacon`
  are what let the final flush survive page unload.
- Prefer `pagehide` / `visibilitychange:hidden` over `unload` (bfcache-friendly, more
  reliable on mobile).
- The injectable `transport` is the testability seam — tests pass a spy so they never
  touch the network.

## Run

```bash
npx vitest practice/senior-fe-infra-interview/coding/dy-platform-drills/01-event-tracker
```
