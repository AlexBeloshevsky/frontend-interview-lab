/**
 * Warm-up 01 — useCounter
 *
 * Implement a small counter hook. See TASK.md. Stub keeps things compiling.
 */

export interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export function useCounter(initialValue = 0): UseCounterResult {
  // TODO: implement (see TASK.md)
  return {
    count: 0,
    increment: () => {},
    decrement: () => {},
    reset: () => {},
    set: () => {},
  };
}
