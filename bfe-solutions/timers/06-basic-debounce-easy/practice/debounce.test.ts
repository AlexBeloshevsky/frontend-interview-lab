import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce()", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not invoke immediately", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });

  it("invokes once after the wait elapses", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced();
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("coalesces a burst into a single trailing call with the latest args", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced("A");
    debounced("B");
    debounced("C");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("C");
  });

  it("resets the timer when called again before it fires", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced("first");
    vi.advanceTimersByTime(2);
    debounced("second");
    vi.advanceTimersByTime(2);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });

  it("allows a new invocation after a quiet period", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced(1);
    vi.advanceTimersByTime(3);
    debounced(2);
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });
});
