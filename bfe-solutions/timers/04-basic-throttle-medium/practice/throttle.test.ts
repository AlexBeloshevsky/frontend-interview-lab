import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { throttle } from "./throttle";

describe("throttle()", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("invokes immediately on the first call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3);
    throttled("A");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
  });

  it("swallows calls during the cooldown but replays the last one", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3);
    throttled("A");
    throttled("B");
    throttled("C");
    expect(fn).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("C");
  });

  it("does not replay if there were no calls during cooldown", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3);
    throttled("A");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("matches the BFE spec: A@0 B@2 C@3 -> A@0, C@3", () => {
    const calls: string[] = [];
    const fn = (arg: string) => calls.push(`${arg}@${Date.now()}`);
    const start = Date.now();
    const throttled = throttle(fn, 3);

    setTimeout(() => throttled("A"), 0);
    setTimeout(() => throttled("B"), 2);
    setTimeout(() => throttled("C"), 3);

    vi.advanceTimersByTime(20);
    const normalized = calls.map((c) => {
      const [arg, t] = c.split("@");
      return `${arg}@${Number(t) - start}`;
    });
    expect(normalized).toEqual(["A@0", "C@3"]);
  });

  it("allows a fresh leading call after activity stops", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 3);
    throttled(1);
    vi.advanceTimersByTime(3);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });
});
