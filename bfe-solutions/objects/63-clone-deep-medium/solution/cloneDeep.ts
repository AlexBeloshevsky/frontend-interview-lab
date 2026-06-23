/**
 * 63. create _.cloneDeep() — medium
 * https://bigfrontend.dev/problem/create-_.cloneDeep
 *
 * Reference solution. See NOTES.md for the idea.
 *
 * Handles primitives, arrays, plain objects, and circular references.
 */

export function cloneDeep<T>(data: T): T {
  return clone(data, new WeakMap());
}

function clone<T>(data: T, seen: WeakMap<object, unknown>): T {
  if (data === null || typeof data !== "object") {
    return data;
  }

  const source = data as object;
  if (seen.has(source)) {
    return seen.get(source) as T;
  }

  if (Array.isArray(data)) {
    const copy: unknown[] = [];
    seen.set(source, copy);
    for (let i = 0; i < data.length; i++) {
      copy[i] = clone(data[i], seen);
    }
    return copy as T;
  }

  const copy: Record<string, unknown> = {};
  seen.set(source, copy);
  for (const key of Object.keys(source)) {
    copy[key] = clone((source as Record<string, unknown>)[key], seen);
  }
  return copy as T;
}
