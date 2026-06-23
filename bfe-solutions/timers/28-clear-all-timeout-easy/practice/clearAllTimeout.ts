/**
 * 28. implement clearAllTimeout() — easy
 * https://bigfrontend.dev/problem/implement-clearAllTimeout
 *
 * Implement `clearAllTimeout()` to cancel every pending timeout. Keep the
 * interface of `setTimeout` / `clearTimeout` the same, but track scheduled ids
 * so they can all be cancelled at once (useful before a page transition).
 *
 *   setTimeout(func1, 10000)
 *   setTimeout(func2, 10000)
 *   setTimeout(func3, 10000)
 *   clearAllTimeout()   // all three are cancelled
 *
 * Note: BFE has you override window.setTimeout/clearTimeout. Here, implement and
 * export tracked `setTimeout`, `clearTimeout`, and `clearAllTimeout` wrappers.
 */

type TimeoutId = ReturnType<typeof globalThis.setTimeout>;

export function setTimeout(
  handler: (...args: unknown[]) => void,
  timeout?: number,
  ...args: unknown[]
): TimeoutId {
  // TODO: implement
  throw new Error("Not implemented");
}

export function clearTimeout(id: TimeoutId): void {
  // TODO: implement
  throw new Error("Not implemented");
}

export function clearAllTimeout(): void {
  // TODO: implement
  throw new Error("Not implemented");
}
