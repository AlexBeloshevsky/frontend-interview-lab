/**
 * Exercise 01 — useAsync
 *
 * Implement a reusable hook that runs an async function and exposes its state.
 * See TASK.md for the full spec. The stub below just keeps things compiling and
 * the tests red until you implement it.
 */
import { useState, useCallback, useRef, useEffect } from "react";

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface UseAsyncState<T> {
  status: AsyncStatus;
  data: T | undefined;
  error: Error | undefined;
}

export interface UseAsyncResult<T> extends UseAsyncState<T> {
  run: () => Promise<void>;
  reset: () => void;
}

export interface UseAsyncOptions {
  immediate?: boolean;
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncOptions = {},
): UseAsyncResult<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    status: "idle",
    data: undefined,
    error: undefined,
  });
  const runIdRef = useRef(0);
  const mountedRef = useRef(true);
  const asyncFnRef = useRef(asyncFn);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = useCallback(async () => {
    const runId = ++runIdRef.current;
    setState((state) => ({ ...state, status: "loading", error: undefined }));
    try {
      const data = await asyncFnRef.current();
      if (mountedRef.current && runId === runIdRef.current) {
        setState({ status: "success", data, error: undefined });
      }
    } catch (err) {
      if (mountedRef.current && runId === runIdRef.current) {
        setState({
          status: "error",
          data: undefined,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      }
    }
  }, []);

  const reset = useCallback(() => {
    ++runIdRef.current;
    setState({
      status: "idle",
      data: undefined,
      error: undefined,
    });
  }, []);

  useEffect(() => {
    if (options.immediate) void run();
  }, [options.immediate, run]);

  return {
    ...state,
    run,
    reset,
  };
}
