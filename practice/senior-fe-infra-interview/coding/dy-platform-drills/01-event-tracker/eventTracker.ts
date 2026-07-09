/**
 * Drill 1 — Event Tracker. See TASK.md.
 * Stub compiles and no-ops so the tests fail on behavior, not imports.
 */

export interface TrackerOptions {
  endpoint: string;
  batchSize?: number;
  flushIntervalMs?: number;
  transport?: (endpoint: string, events: unknown[]) => void;
}

export interface Tracker {
  track(event: unknown): void;
  flush(): void;
  stop(): void;
}

/** Prefer sendBeacon (survives page unload); fall back to keepalive fetch. */
function defaultTransport(endpoint: string, events: unknown[]): void {
  const body = JSON.stringify(events);

  if (navigator.sendBeacon?.(endpoint, body)) {
    return;
  }

  fetch(endpoint, {
    method: "POST",
    body,
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  });
}

export function createEventTracker(options: TrackerOptions): Tracker {
  const {
    endpoint,
    batchSize = 10,
    flushIntervalMs = 1000,
    transport = defaultTransport,
  } = options;
  let events: unknown[] = [];
  const track = (event: unknown) => {
    events.push(event);
    if (events.length >= batchSize) {
      flush();
    }
  };
  const flush = () => {
    if (events.length === 0) return;
    transport(endpoint, events);
    events = [];
  };
  const interval = setInterval(flush, flushIntervalMs);
  window.addEventListener("pagehide", flush);
  const stop = () => {
    clearInterval(interval);
    window.removeEventListener("pagehide", flush);
  };
  return {
    track,
    flush,
    stop,
  };
}
