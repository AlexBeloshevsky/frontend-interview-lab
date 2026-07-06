import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAsync } from "./useAsync";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("useAsync", () => {
  it("is idle until run() is called", () => {
    const d = deferred<string>();
    const { result } = renderHook(() => useAsync(() => d.promise));

    expect(result.current.status).toBe("idle");

    act(() => {
      void result.current.run();
    });

    expect(result.current.status).toBe("loading");
  });

  it("runs immediately when immediate is true and resolves with data", async () => {
    const d = deferred<string>();
    const { result } = renderHook(() =>
      useAsync(() => d.promise, { immediate: true }),
    );

    expect(result.current.status).toBe("loading");

    await act(async () => {
      d.resolve("ok");
    });

    expect(result.current.status).toBe("success");
    expect(result.current.data).toBe("ok");
    expect(result.current.error).toBeUndefined();
  });

  it("captures errors", async () => {
    const d = deferred<string>();
    const { result } = renderHook(() =>
      useAsync(() => d.promise, { immediate: true }),
    );

    await act(async () => {
      d.reject(new Error("boom"));
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("boom");
  });

  it("ignores a stale resolution when a newer run has started", async () => {
    const first = deferred<string>();
    const second = deferred<string>();
    let calls = 0;
    const fn = () => (++calls === 1 ? first.promise : second.promise);

    const { result } = renderHook(() => useAsync(fn));

    act(() => {
      void result.current.run();
    });
    act(() => {
      void result.current.run();
    });

    await act(async () => {
      second.resolve("second");
      first.resolve("first"); // stale: should be ignored
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(result.current.data).toBe("second");
  });

  it("reset() returns to idle", async () => {
    const d = deferred<string>();
    const { result } = renderHook(() =>
      useAsync(() => d.promise, { immediate: true }),
    );

    await act(async () => {
      d.resolve("ok");
    });
    expect(result.current.status).toBe("success");

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toBeUndefined();
  });
});
