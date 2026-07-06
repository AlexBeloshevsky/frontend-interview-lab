import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("defaults to 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("uses the provided initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increments and decrements", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it("handles rapid increments correctly", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
  });

  it("resets to the initial value", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => result.current.increment());
    act(() => result.current.reset());

    expect(result.current.count).toBe(10);
  });

  it("sets an explicit value", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => result.current.set(42));
    expect(result.current.count).toBe(42);
  });
});
