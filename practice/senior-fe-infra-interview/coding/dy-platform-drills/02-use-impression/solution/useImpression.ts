/**
 * Reference solution — Drill 2.
 *
 * Ref-callback pattern: React calls us with the node (or null on unmount).
 * We create/disconnect the observer right there — no separate useEffect needed.
 */

import { useCallback, useRef } from "react";

export interface UseImpressionOptions {
  threshold?: number;
  once?: boolean;
}

export function useImpression<T extends Element>(
  onImpression: () => void,
  options?: UseImpressionOptions,
): (node: T | null) => void {
  const { threshold = 0.5, once = true } = options ?? {};

  // Keep latest callback without re-creating the observer on every render
  const onImpressionRef = useRef(onImpression);
  onImpressionRef.current = onImpression;

  const observerRef = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (node: T | null) => {
      // Detach from previous node (or cleanup on unmount when node === null)
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            onImpressionRef.current();

            if (once) {
              observer.disconnect();
            }
          }
        },
        { threshold },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [threshold, once],
  );
}
