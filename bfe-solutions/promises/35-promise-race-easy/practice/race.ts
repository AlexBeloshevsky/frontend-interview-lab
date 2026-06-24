/**
 * 35. implement Promise.race() — easy
 * https://bigfrontend.dev/problem/implement-Promise-race
 *
 * `Promise.race()` returns a promise that fulfills or rejects as soon as one of
 * the input promises fulfills or rejects, with that promise's value or reason.
 *
 * Implement your own `race()` that works the same way.
 */

export function race<T>(promises: Array<T | Promise<T>>): Promise<T> {
  return new Promise((resolve, reject) => {
    for (const item of promises) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
}
