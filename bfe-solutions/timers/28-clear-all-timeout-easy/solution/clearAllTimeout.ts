/**
 * 28. implement clearAllTimeout() — easy
 * https://bigfrontend.dev/problem/implement-clearAllTimeout
 *
 * Reference solution. See NOTES.md for the idea.
 *
 * BFE asks you to override `window.setTimeout` / `window.clearTimeout`. Here we
 * export tracked wrappers (same interface) so the behaviour is easy to test.
 */

type TimeoutId = ReturnType<typeof globalThis.setTimeout>;

const nativeSet = globalThis.setTimeout.bind(globalThis);
const nativeClear = globalThis.clearTimeout.bind(globalThis);

const pending = new Set<TimeoutId>();

export function setTimeout(
  handler: (...args: unknown[]) => void,
  timeout?: number,
  ...args: unknown[]
): TimeoutId {
  const id = nativeSet(() => {
    pending.delete(id);
    handler(...args);
  }, timeout);
  pending.add(id);
  return id;
}

export function clearTimeout(id: TimeoutId): void {
  nativeClear(id);
  pending.delete(id);
}

export function clearAllTimeout(): void {
  pending.forEach((id) => nativeClear(id));
  pending.clear();
}
