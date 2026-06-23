/**
 * 35. implement Promise.race() — easy
 * https://bigfrontend.dev/problem/implement-Promise-race
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function race<T>(promises: Array<T | Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    for (const item of promises) {
      Promise.resolve(item).then(resolve, reject);
    }
  });
}
