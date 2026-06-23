/**
 * 64. auto-retry Promise on rejection — medium
 * https://bigfrontend.dev/problem/auto-retry-Promise-on-rejection
 *
 * Implement `fetchWithAutoRetry(fetcher, maximumRetryCount)`.
 *   - `fetcher` is a function that returns a Promise.
 *   - If it resolves, resolve with that value.
 *   - If it rejects, retry by calling `fetcher` again, up to `maximumRetryCount`
 *     times. If it still fails, reject with the last error.
 */

export function fetchWithAutoRetry<T>(
  fetcher: () => Promise<T>,
  maximumRetryCount: number,
): Promise<T> {
  // TODO: implement
  throw new Error("Not implemented");
}
