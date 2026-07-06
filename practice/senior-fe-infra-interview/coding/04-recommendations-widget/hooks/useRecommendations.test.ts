import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useRecommendations } from "./useRecommendations";
import { Product } from "../types";

function makeDeferred() {
  let resolve!: (v: Product[]) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<Product[]>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("useRecommendations", () => {
  it("should return the recommendations", async () => {
    const { result } = renderHook(() =>
      useRecommendations({
        fetchRecommendations: vi.fn().mockResolvedValue([]),
      }),
    );
    expect(result.current.products).toEqual([]);
    expect(result.current.status).toBe("loading");
    expect(result.current.error).toBeNull();
    await waitFor(() => {
      expect(result.current.products).toBeDefined();
      expect(result.current.status).toBe("success");
      expect(result.current.error).toBeNull();
    });
  });

  it("should return the error if the fetch recommendations fails", async () => {
    const { result } = renderHook(() =>
      useRecommendations({
        fetchRecommendations: vi
          .fn()
          .mockRejectedValue(new Error("Failed to fetch recommendations")),
      }),
    );
    expect(result.current.products).toEqual([]);
    expect(result.current.status).toBe("loading");
    expect(result.current.error).toBeNull();
    await waitFor(() => {
      expect(result.current.products).toBeDefined();
      expect(result.current.status).toBe("error");
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(
        "Failed to fetch recommendations",
      );
    });
  });

  it("keeps the latest result when prodNum changes mid-flight", async () => {
    const d10 = makeDeferred();
    const d5 = makeDeferred();

    // return a different pending promise per prodNum
    const fetchRecommendations = vi.fn((prodNum: number) =>
      prodNum === 10 ? d10.promise : d5.promise,
    );

    const { result, rerender } = renderHook(
      ({ prodNum }) => useRecommendations({ fetchRecommendations, prodNum }),
      { initialProps: { prodNum: 10 } },
    );

    // switch before the first request resolves
    rerender({ prodNum: 5 });

    const ten = [{ id: "10", title: "Ten", price: 10, image: "x" }];
    const five = [{ id: "5", title: "Five", price: 5, image: "x" }];

    expect(fetchRecommendations).toHaveBeenCalledTimes(2);
    expect(fetchRecommendations).toHaveBeenLastCalledWith(
      5,
      expect.any(AbortSignal),
    );

    // resolve the NEW request, then the STALE one
    d5.resolve(five);
    d10.resolve(ten); // must be ignored

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.products).toEqual(five); // latest wins, not `ten`
  });

  it("does not update state after unmount", async () => {
    const d = makeDeferred();
    const fetchRecommendations = vi.fn(() => d.promise);
    const { result, unmount } = renderHook(() =>
      useRecommendations({ fetchRecommendations }),
    );

    unmount();
    d.resolve([{ id: "1", title: "A", price: 1, image: "x" }]);
    await Promise.resolve(); // let the .then microtask run

    expect(result.current.status).toBe("loading"); // never advanced
  });

  it("passes the correct prodNum to the fetch recommendations", async () => {
    const fetchRecommendations = vi.fn(() => Promise.resolve([]));
    const { result } = renderHook(() =>
      useRecommendations({ fetchRecommendations, prodNum: 7 }),
    );

    await waitFor(() => expect(result.current.status).toBe("success"));

    expect(fetchRecommendations).toHaveBeenCalledWith(
      7,
      expect.any(AbortSignal),
    );
    expect(result.current.error).toBeNull();
  });

  it("aborts the previous request when prodNum changes", () => {
    let firstSignal: AbortSignal | undefined;
    const fetchRecommendations = vi.fn((_p: number, signal?: AbortSignal) => {
      firstSignal ??= signal;
      return new Promise<Product[]>(() => {}); // never resolves
    });
    const { rerender } = renderHook(
      ({ prodNum }) => useRecommendations({ fetchRecommendations, prodNum }),
      { initialProps: { prodNum: 10 } },
    );
    rerender({ prodNum: 5 });
    expect(firstSignal?.aborted).toBe(true);
  });
});
