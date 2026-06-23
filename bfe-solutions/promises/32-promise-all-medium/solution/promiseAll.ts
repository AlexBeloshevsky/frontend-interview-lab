/**
 * 32. implement Promise.all() — medium
 * https://bigfrontend.dev/problem/implement-Promise-all
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function promiseAll<T>(items: Array<T | Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let resolvedCount = 0;
    if (items.length === 0) {
      resolve([]);
      return;
    }
    items.forEach((element, index) => {
      Promise.resolve(element)
        .then((el) => {
          results[index] = el;
          resolvedCount++;
          if (items.length === resolvedCount) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
