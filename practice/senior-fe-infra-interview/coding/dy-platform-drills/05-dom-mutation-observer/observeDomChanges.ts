/**
 * Drill 5 — observeDomChanges. See TASK.md.
 */

export interface ObserveDomOptions {
  debounceMs?: number;
  subtree?: boolean;
  childList?: boolean;
}

export function observeDomChanges(
  target: Node,
  onChange: () => void,
  options?: ObserveDomOptions,
): () => void {
  // TODO: implement (see TASK.md)
  return () => {};
}
