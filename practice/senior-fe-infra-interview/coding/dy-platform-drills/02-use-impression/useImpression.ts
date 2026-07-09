/**
 * Drill 2 — useImpression. See TASK.md.
 * Stub returns a no-op ref callback so tests fail on behavior, not imports.
 */

export interface UseImpressionOptions {
  threshold?: number;
  once?: boolean;
}

export function useImpression<T extends Element>(
  onImpression: () => void,
  options?: UseImpressionOptions,
): (node: T | null) => void {
  // TODO: implement (see TASK.md)
  return () => {};
}
