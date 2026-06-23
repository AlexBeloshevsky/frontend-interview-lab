/**
 * 1. implement curry() — easy
 * https://bigfrontend.dev/problem/implement-curry
 *
 * Currying is a useful technique used in JavaScript applications.
 *
 * Implement a `curry()` function, which accepts a function and returns
 * a curried one.
 *
 *   const join = (a, b, c) => `${a}_${b}_${c}`
 *   const curriedJoin = curry(join)
 *
 *   curriedJoin(1, 2, 3)   // '1_2_3'
 *   curriedJoin(1)(2, 3)   // '1_2_3'
 *   curriedJoin(1, 2)(3)   // '1_2_3'
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry(fn: (...args: any[]) => any): (...args: any[]) => any {
  // TODO: implement
  throw new Error("Not implemented");
}
