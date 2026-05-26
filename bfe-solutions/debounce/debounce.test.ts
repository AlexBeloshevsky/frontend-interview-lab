import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounced", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the original function immediately", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run();

    expect(fn).not.toHaveBeenCalled();
  });

  it("calls the original function once after the delay", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("forwards the latest arguments", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run("a");
    run("b", 2);
    run("c", 3, 4);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c", 3, 4);
  });

  it("coalesces rapid calls into a single invocation", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run();
    run();
    run();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("resets the delay when called again before it elapses", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run("first");
    vi.advanceTimersByTime(50);

    run("second");
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });

  it("schedules a separate invocation after each quiet period", () => {
    const fn = vi.fn();
    const run = debounce(fn, 100);

    run(1);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1);

    run(2);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });
});
