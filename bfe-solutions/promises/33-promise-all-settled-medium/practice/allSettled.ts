/**
 * 33. implement Promise.allSettled() — medium
 * https://bigfrontend.dev/problem/implement-Promise-allSettled
 *
 * `Promise.allSettled()` resolves after every input has settled, with an array of
 * descriptors — one per input, in order:
 *   { status: 'fulfilled', value }   or   { status: 'rejected', reason }
 *
 * Unlike `all`, it never rejects. Do not use the native Promise.allSettled().
 */

type SettledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: unknown };

export function allSettled<T>(
  items: Array<T | Promise<T>>,
): Promise<SettledResult<T>[]> {
  // TODO: implement
  throw new Error("Not implemented");
}
