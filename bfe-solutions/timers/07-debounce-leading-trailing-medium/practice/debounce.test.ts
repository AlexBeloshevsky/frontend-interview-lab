import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";

describe("debounce() with leading & trailing", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("default = { leading: false, trailing: true }: trailing only", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3);
    debounced("A");
    debounced("B");
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("B");
  });

  it("{ leading: true, trailing: true }: fires on both edges of a burst", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3, { leading: true, trailing: true });
    debounced("A");
    debounced("B");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("A");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("B");
  });

  it("{ leading: true, trailing: false }: leading only, no trailing replay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3, { leading: true, trailing: false });
    debounced("A");
    debounced("B");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("A");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("a single leading call does not double-fire on the trailing edge", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3, { leading: true, trailing: true });
    debounced("only");
    vi.advanceTimersByTime(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("{ leading: false, trailing: false }: never fires", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 3, { leading: false, trailing: false });
    debounced("A");
    vi.advanceTimersByTime(10);
    expect(fn).not.toHaveBeenCalled();
  });
});
