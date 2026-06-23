import { useCallback, useState } from "react";

export type Priority = "High" | "Medium" | "Low";

// Category is a string so new categories (DDoS, etc.) can appear at runtime.
// Tighten to a union if the set is fixed and known.
export type Category = string;

export interface Alert {
  id: number | string;
  priority: Priority;
  timestamp: string;
  message: string;
  category: Category;
}

// State shape: a map keyed by category (matches the starter's useState({})).
// Trade-off: O(1) reads by category, but priority queries flatten across categories.
export type AlertsByCategory = Record<Category, Alert[]>;

export interface UseSecurityAlerts {
  alerts: AlertsByCategory;
  addAlert: (category: Category, alert: Alert) => void;
  removeAlert: (category: Category, alertId: Alert["id"]) => void;
  getAlertsByCategory: (category: Category) => Alert[];
  getAlertsByPriority: (priority: Priority) => Alert[];
}

export function useSecurityAlerts(): UseSecurityAlerts {
  const [alerts, setAlerts] = useState<AlertsByCategory>({});

  const addAlert = useCallback((category: Category, alert: Alert) => {
    setAlerts((prev) => {
      const existing = prev[category] ?? [];
      // Dedupe by id so the same alert isn't added twice.
      if (existing.some((a) => a.id === alert.id)) return prev;
      return { ...prev, [category]: [...existing, alert] };
    });
  }, []);

  const removeAlert = useCallback((category: Category, alertId: Alert["id"]) => {
    setAlerts((prev) => {
      const existing = prev[category];
      if (!existing) return prev; // missing category -> no-op (same ref, no re-render)

      const next = existing.filter((a) => a.id !== alertId);
      if (next.length === existing.length) return prev; // id not found -> no-op

      const copy = { ...prev };
      if (next.length === 0) {
        delete copy[category]; // drop empty categories so they don't linger
      } else {
        copy[category] = next;
      }
      return copy;
    });
  }, []);

  // Derived reads. Depend on `alerts` so callers can list them as effect deps safely.
  const getAlertsByCategory = useCallback(
    (category: Category): Alert[] => alerts[category] ?? [],
    [alerts],
  );

  const getAlertsByPriority = useCallback(
    (priority: Priority): Alert[] =>
      Object.values(alerts)
        .flat()
        .filter((a) => a.priority === priority),
    [alerts],
  );

  return {
    alerts,
    addAlert,
    removeAlert,
    getAlertsByCategory,
    getAlertsByPriority,
  };
}
