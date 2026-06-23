import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { throttle } from "./throttle";

describe("throttle() with leading & trailing", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("{ leading: true, trailing: true } fires leading then trailing", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3, { leading: true, trailing: true });
    throttled("A");
    throttled("B");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("A");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("B");
  });

  it("{ leading: false, trailing: true } swallows the leading call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3, { leading: false, trailing: true });
    throttled("A");
    throttled("B");
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("B");
  });

  it("{ leading: true, trailing: false } fires leading only", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3, { leading: true, trailing: false });
    throttled("A");
    throttled("B");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("a single call with trailing does not double-fire", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3, { leading: true, trailing: true });
    throttled("only");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("{ leading: false, trailing: false } never fires", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3, { leading: false, trailing: false });
    throttled("A");
    vi.advanceTimersByTime(10);
    expect(fn).not.toHaveBeenCalled();
  });
});
