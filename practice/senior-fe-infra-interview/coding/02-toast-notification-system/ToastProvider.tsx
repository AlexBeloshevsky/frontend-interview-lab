/**
 * Exercise 02 — ToastProvider
 *
 * Implement the provider: hold the active toasts, expose the imperative API via
 * context, render them in one accessible region, and auto-dismiss with timers you
 * clean up. See TASK.md. This stub just keeps things compiling.
 */

import type { ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  // TODO: implement (see TASK.md)
  // - create a context with the ToastContextValue
  // - manage Toast[] state + a ref of id -> timeoutId
  // - render a <ToastRegion> with role="status" / aria-live
  return <>{children}</>;
}
