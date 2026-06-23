import { describe, expect, it, vi } from "vitest";
import { curry } from "./curry";

describe("curry()", () => {
  const join = (a: number, b: number, c: number) => `${a}_${b}_${c}`;

  it("works when all args are passed at once", () => {
    const curriedJoin = curry(join);
    expect(curriedJoin(1, 2, 3)).toBe("1_2_3");
  });

  it("works when args are passed one at a time", () => {
    const curriedJoin = curry(join);
    expect(curriedJoin(1)(2)(3)).toBe("1_2_3");
  });

  it("works when args are split across calls", () => {
    const curriedJoin = curry(join);
    expect(curriedJoin(1)(2, 3)).toBe("1_2_3");
    expect(curriedJoin(1, 2)(3)).toBe("1_2_3");
  });

  it("returns a function until enough args are collected", () => {
    const curriedJoin = curry(join);
    expect(typeof curriedJoin(1)).toBe("function");
    expect(typeof curriedJoin(1)(2)).toBe("function");
  });

  it("does not call the original function early", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const curried = curry(fn);

    curried(1);
    expect(fn).not.toHaveBeenCalled();

    expect(curried(1)(2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("supports a function with no arguments", () => {
    const fn = vi.fn(() => 42);
    const curried = curry(fn);
    expect(curried()).toBe(42);
  });

  it("creates independent curried chains from the same curried fn", () => {
    const curriedJoin = curry(join);
    const partial = curriedJoin(1);
    expect(partial(2, 3)).toBe("1_2_3");
    expect(partial(9, 8)).toBe("1_9_8");
  });
});
