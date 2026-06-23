/**
 * 33. implement Promise.allSettled() — medium
 * https://bigfrontend.dev/problem/implement-Promise-allSettled
 *
 * Reference solution. See NOTES.md for the idea.
 */

type SettledResult<T> =
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: unknown };

export function allSettled<T>(
  items: Array<T | Promise<T>>,
): Promise<SettledResult<T>[]> {
  return new Promise((resolve) => {
    const results: SettledResult<T>[] = [];
    let settledCount = 0;
    if (items.length === 0) {
      resolve([]);
      return;
    }
    items.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (value) => {
            results[index] = { status: "fulfilled", value };
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
          },
        )
        .finally(() => {
          settledCount++;
          if (settledCount === items.length) {
            resolve(results);
          }
        });
    });
  });
}
