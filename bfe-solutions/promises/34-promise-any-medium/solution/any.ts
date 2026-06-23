/**
 * 34. implement Promise.any() — medium
 * https://bigfrontend.dev/problem/implement-Promise-any
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function any<T>(items: Array<T | Promise<T>>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const errors: unknown[] = [];
    let rejectedCount = 0;
    if (items.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }
    items.forEach((item, index) => {
      Promise.resolve(item).then(resolve, (error) => {
        errors[index] = error;
        rejectedCount++;
        if (rejectedCount === items.length) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
}
