/**
 * Reference solution — Drill 5.
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
  const { debounceMs = 100, subtree = true, childList = true } = options ?? {};

  let timer: ReturnType<typeof setTimeout> | null = null;

  const schedule = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onChange();
    }, debounceMs);
  };

  const observer = new MutationObserver(schedule);
  observer.observe(target, { subtree, childList });

  return () => {
    if (timer) clearTimeout(timer);
    observer.disconnect();
  };
}
