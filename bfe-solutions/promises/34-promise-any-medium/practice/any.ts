/**
 * 34. implement Promise.any() — medium
 * https://bigfrontend.dev/problem/implement-Promise-any
 *
 * `Promise.any()` resolves as soon as any input fulfills, with that value. If all
 * inputs reject, it rejects with an AggregateError holding all the reasons:
 *
 *   new AggregateError(errors, 'All promises were rejected')
 *
 * Implement your own `any()`.
 */

export function any<T>(items: Array<T | Promise<T>>): Promise<T> {
  // TODO: implement
  throw new Error("Not implemented");
}
