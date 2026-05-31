export function promiseAll<T>(items: Array<T | Promise<T>>): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completedCount = 0;
    if (items.length === 0) {
      resolve([]);
      return;
    }
    items.forEach((element, index) => {
      Promise.resolve(element)
        .then((el) => {
          results[index] = el;
          completedCount++;
          if (completedCount === items.length) {
            resolve(results);
            return;
          }
        })
        .catch((error) => reject(error));
    });
  });
}
