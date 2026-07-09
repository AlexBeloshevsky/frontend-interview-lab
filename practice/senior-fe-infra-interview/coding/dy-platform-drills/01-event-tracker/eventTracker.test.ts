import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createEventTracker } from "./eventTracker";

describe("createEventTracker", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not flush until batchSize is reached", () => {
    const transport = vi.fn();
    const t = createEventTracker({ endpoint: "/e", batchSize: 3, transport });

    t.track({ a: 1 });
    t.track({ a: 2 });

    expect(transport).not.toHaveBeenCalled();
  });

  it("auto-flushes when batchSize is reached, sending all queued events at once", () => {
    const transport = vi.fn();
    const t = createEventTracker({ endpoint: "/e", batchSize: 3, transport });

    t.track(1);
    t.track(2);
    t.track(3);

    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith("/e", [1, 2, 3]);
  });

  it("flush() sends queued events and clears the queue", () => {
    const transport = vi.fn();
    const t = createEventTracker({ endpoint: "/e", batchSize: 100, transport });

    t.track(1);
    t.track(2);
    t.flush();
    expect(transport).toHaveBeenCalledWith("/e", [1, 2]);

    transport.mockClear();
    t.flush(); // queue is empty now
    expect(transport).not.toHaveBeenCalled();
  });

  it("flushes automatically on the interval", () => {
    const transport = vi.fn();
    const t = createEventTracker({
      endpoint: "/e",
      batchSize: 100,
      flushIntervalMs: 5000,
      transport,
    });

    t.track(1);
    vi.advanceTimersByTime(5000);

    expect(transport).toHaveBeenCalledWith("/e", [1]);
  });

  it("flushes on pagehide", () => {
    const transport = vi.fn();
    const t = createEventTracker({ endpoint: "/e", batchSize: 100, transport });

    t.track(1);
    window.dispatchEvent(new Event("pagehide"));

    expect(transport).toHaveBeenCalledWith("/e", [1]);
  });

  it("stop() halts interval flushing and removes listeners", () => {
    const transport = vi.fn();
    const t = createEventTracker({
      endpoint: "/e",
      batchSize: 100,
      flushIntervalMs: 5000,
      transport,
    });

    t.track(1);
    t.stop();

    vi.advanceTimersByTime(10000);
    window.dispatchEvent(new Event("pagehide"));

    expect(transport).not.toHaveBeenCalled();
  });
});
