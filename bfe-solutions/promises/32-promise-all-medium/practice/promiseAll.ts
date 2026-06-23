/**
 * 32. implement Promise.all() — medium
 * https://bigfrontend.dev/problem/implement-Promise-all
 *
 * `Promise.all()` takes an array of values/promises and returns a promise that:
 *   - resolves with the results in input order once all inputs resolve
 *   - rejects immediately if any input rejects
 *   - resolves to [] for an empty array
 *   - supports plain values as well as promises
 */

export function promiseAll<T>(items: Array<T | Promise<T>>): Promise<T[]> {
  // TODO: implement
  throw new Error("Not implemented");
}
