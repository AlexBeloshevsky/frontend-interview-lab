/**
 * 1. implement curry() — easy
 * https://bigfrontend.dev/problem/implement-curry
 *
 * Reference solution. See NOTES.md for the idea.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry(fn: (...args: any[]) => any): (...args: any[]) => any {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...nextArgs: unknown[]) => curried(...args, ...nextArgs);
  };
}
