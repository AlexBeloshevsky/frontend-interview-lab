/**
 * Exercise 02 — Toast system: suggested public types.
 *
 * These are a starting point — refine them as part of designing the API.
 */

export type ToastVariant = "info" | "success" | "error";

export interface ToastOptions {
  variant?: ToastVariant;
  /** ms before auto-dismiss. 0 or Infinity = sticky. */
  duration?: number;
}

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastContextValue {
  toasts: Toast[];
  /** Show a toast; returns its id. */
  toast: (message: string, options?: ToastOptions) => string;
  /** Dismiss a single toast by id. */
  dismiss: (id: string) => void;
  /** Dismiss all toasts. */
  clear: () => void;
}
