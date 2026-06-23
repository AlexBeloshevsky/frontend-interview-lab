/**
 * 64. auto-retry Promise on rejection — medium
 * https://bigfrontend.dev/problem/auto-retry-Promise-on-rejection
 *
 * Reference solution. See NOTES.md for the idea.
 */

export function fetchWithAutoRetry<T>(
  fetcher: () => Promise<T>,
  maximumRetryCount: number,
): Promise<T> {
  return fetcher().catch((error) => {
    if (maximumRetryCount <= 0) {
      throw error;
    }
    return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
  });
}
